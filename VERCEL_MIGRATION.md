# Vercel / Neon / GitHub Actions Cutover Runbook

Migration of ashwiniyer.com OFF Heroku (app `nextjsportfolio`) onto:

- **Vercel** — hosting the Next.js app (project `nextjsportfolio`, already linked via `.vercel/`)
- **Neon** — Postgres (replaces Heroku Postgres essential-0, PG 16, ~12 MB, 7 tables)
- **GitHub Actions** — scheduled Python data jobs (replaces Heroku Scheduler / the `worker: python final.py` Procfile entry)

**Prerequisites:** `heroku`, `vercel`, and `gh` CLIs logged in; `psql`/`pg_restore` v16+ installed. Run all commands from the repo root (`gh` infers the repo from the `origin` remote).

**Golden rules for the whole runbook:**

- **NEVER `git push heroku ...`** — pushing to the `heroku` remote deploys production. Pushing to `origin` (GitHub) is safe; Heroku only deploys from its own remote.
- Never paste a secret value into a file, a commit, or a chat. Every command below moves values machine-to-machine without printing them.

---

## 1. Current state (what the `vercel-migration` branch changed)

Code changes on this branch, all **backward compatible with Heroku** (Heroku keeps working untouched during the transition):

| Change | File(s) |
|---|---|
| Node pg Pool prefers `DATABASE_URL` (`connectionString`), falls back to the old discrete `user`/`host`/`dbname`/`password` vars | `app/about/db.js` |
| Python DB layer passes `DATABASE_URL` through as a full libpq DSN (Neon's `?sslmode=require&channel_binding=...` query params are preserved instead of being dropped by urlparse) | `db_helpers.py` |
| Kalshi env vars: prefer `KALSHI_ACCESS_KEY` / `KALSHI_ACCESS_SIGNATURE`, fall back to the legacy hyphenated `KALSHI-ACCESS-KEY` / `KALSHI-ACCESS-SIGNATURE` still set on Heroku (GH/Vercel names cannot contain hyphens). Kalshi HTTP *header* names stay hyphenated — required by their API | `kalshi.py`, `test_kalshi_api.py`, `kalshi_hourly.py` |
| 3 scheduled workflows created (details in §4) | `.github/workflows/hourly-data.yml`, `kalshi-hourly.yml`, `daily-final.yml` |
| `*.dump` added to `.gitignore` (DB backups must never land in this public repo) | `.gitignore` |
| This runbook | `VERCEL_MIGRATION.md` |

Also true today:

- Vercel project **`nextjsportfolio`** is linked to this directory.
- A DB backup was captured today. Re-fetch a **fresh** one anytime (do this again right before the real cutover — see the token-rotation warning in §2):

```sh
heroku pg:backups:capture -a nextjsportfolio
heroku pg:backups:download -a nextjsportfolio -o backup.dump
```

- The scheduled workflows only run once they exist on the **default branch (`main`)**. So before §4: merge `vercel-migration` into `main` and push to `origin` (GitHub) — this does NOT deploy anywhere.

---

## 2. Neon setup

1. Create a free project at https://console.neon.tech — **Postgres 16**, region **AWS us-east-1 (N. Virginia)** to match the current Heroku Postgres region.

2. Grab BOTH connection strings from the Neon console (they differ only in hostname):
   - **Direct** (`...neon.tech`) — use for `pg_restore`, `psql`, and the **GitHub Actions jobs**.
   - **Pooled** (`...-pooler...neon.tech`) — use for the **Vercel app** (each warm lambda holds its own pg Pool, default max 10 connections; the pooler keeps you under Neon's connection limits).
   - Both must include `sslmode=require` (Neon includes it by default — keep it). The Python and Node code on this branch both honor it now.

3. Restore the backup (use the **direct** string):

```sh
pg_restore --no-owner --no-acl -d "<NEON_DATABASE_URL>" backup.dump
```

4. Verify — expect 7 tables (repos, songs, wakatime, oura_data, kalshi_positions, kalshi_profile, api_tokens):

```sh
psql "<NEON_DATABASE_URL>" -c "\dt"
psql "<NEON_DATABASE_URL>" -c "SELECT COUNT(*) FROM oura_data;"
psql "<NEON_DATABASE_URL>" -c "SELECT service, updated_at FROM api_tokens;"
```

> **⚠️ Token-rotation warning (`api_tokens` table):** WakaTime and Oura OAuth *refresh tokens* live in the `api_tokens` table and **rotate every time `hourly.py` runs**. If Heroku Scheduler keeps running jobs after your dump, the tokens in Neon go stale and the providers may reject them. At real cutover time: capture a **fresh** backup (or at minimum re-copy `api_tokens`) at the same moment you disable the Heroku Scheduler jobs, and from then on run the jobs against exactly ONE database. Never let Heroku-cron-against-Heroku-DB and Actions-against-Neon run interleaved.

---

## 3. Vercel environment variables + deploy

Thanks to the `db.js` refactor the Next.js app needs exactly **one** env var:

| Vercel var | Value | Notes |
|---|---|---|
| `DATABASE_URL` | Neon **pooled** connection string | The only var the app reads at runtime. Do NOT replicate the old lowercase `user`/`host`/`dbname`/`password` vars on Vercel — they are the legacy fallback and dangerously generic names. |
| `SITE_URL` | *(optional — skip)* | Only used by the `next-sitemap` postbuild step and it already defaults to `https://ashwiniyer.com`. |

Do not carry over: `COC_TOKEN`, `HerokuURL`, `WAKA_TOKENS_JSON`, `wakaBearer`, `last_fm_secret` (dead — read by no code), nor any of the Python-job vars (those go to GitHub Actions only, §4).

**Set the value without ever echoing it:**

- Final state — Neon pooled string. Copy it from the Neon console, then pipe from the clipboard (macOS):

```sh
pbpaste | vercel env add DATABASE_URL production
```

- Valid interim test — point Vercel at the existing Heroku DB first (value flows Heroku → Vercel, never printed):

```sh
vercel env add DATABASE_URL production < <(heroku config:get DATABASE_URL -a nextjsportfolio)
```

To replace an interim value later: `vercel env rm DATABASE_URL production`, then re-add.

**Deploy and verify** (env changes only apply to NEW deployments):

```sh
vercel --prod
```

Then hit every API route on the `*.vercel.app` URL the deploy prints:

```sh
BASE="https://<deployment-url-vercel-printed>"
curl -s "$BASE/api/data"          | head -c 300; echo
curl -s "$BASE/api/songs"         | head -c 300; echo
curl -s "$BASE/api/wakatime"      | head -c 300; echo
curl -s "$BASE/api/kalshi"        | head -c 300; echo
curl -s "$BASE/api/kalshi-profile"| head -c 300; echo
curl -s "$BASE/api/oura?type=sleep" | head -c 300; echo
```

Each should return JSON rows (not `{}` errors). Also click through the site itself — home, /about, /blog, /resume.

---

## 4. GitHub secrets + workflow smoke tests

**Prerequisite:** the three workflow files must be on `main` (merge this branch and `git push origin main` — safe, see §1).

The workflows and the secret names they reference (names verified against the YAML):

| Workflow | Cron (UTC) | Runs | Secrets referenced |
|---|---|---|---|
| `hourly-data.yml` | `7 * * * *` | `hourly.py` (WakaTime + Oura) | `DATABASE_URL`, `WAKA_CLIENT_ID`, `WAKA_CLIENT_SECRET`, `OURA_CLIENT_ID`, `OURA_CLIENT_SECRET` |
| `kalshi-hourly.yml` | `23 * * * *` | `kalshi_hourly.py` | `DATABASE_URL`, `KALSHI_ACCESS_KEY`, `KALSHI_ACCESS_SIGNATURE` |
| `daily-final.yml` | `41 6 * * *` | `final.py` (repos + songs) | `DATABASE_URL`, `SPOTIFY_CLIENT`, `SPOTIFY_SECRET`, `GOOGLE_KEY`, `LAST_FM_KEY` |

Create all 11 secrets — values flow Heroku → GitHub without being printed. Run from the repo root:

```sh
# Same-name copies from Heroku:
gh secret set WAKA_CLIENT_ID     --body "$(heroku config:get WAKA_CLIENT_ID -a nextjsportfolio)"
gh secret set WAKA_CLIENT_SECRET --body "$(heroku config:get WAKA_CLIENT_SECRET -a nextjsportfolio)"
gh secret set OURA_CLIENT_ID     --body "$(heroku config:get OURA_CLIENT_ID -a nextjsportfolio)"
gh secret set OURA_CLIENT_SECRET --body "$(heroku config:get OURA_CLIENT_SECRET -a nextjsportfolio)"

# Renamed (hyphenated Heroku name -> underscore secret name):
gh secret set KALSHI_ACCESS_KEY       --body "$(heroku config:get KALSHI-ACCESS-KEY -a nextjsportfolio)"
gh secret set KALSHI_ACCESS_SIGNATURE --body "$(heroku config:get KALSHI-ACCESS-SIGNATURE -a nextjsportfolio)"

# Renamed (lowercase Heroku name -> underscore secret name; workflows map them
# back to the exact lowercase names the Python code reads):
gh secret set SPOTIFY_CLIENT --body "$(heroku config:get spotifyClient -a nextjsportfolio)"
gh secret set SPOTIFY_SECRET --body "$(heroku config:get spotifySecret -a nextjsportfolio)"
gh secret set GOOGLE_KEY     --body "$(heroku config:get google_key -a nextjsportfolio)"
gh secret set LAST_FM_KEY    --body "$(heroku config:get last_fm_key -a nextjsportfolio)"

# DATABASE_URL — two phases:
# (a) valid interim test: point the jobs at the existing Heroku DB
gh secret set DATABASE_URL --body "$(heroku config:get DATABASE_URL -a nextjsportfolio)"
# (b) AT CUTOVER: repoint at the Neon DIRECT (non-pooler) string, pasted via clipboard
pbpaste | gh secret set DATABASE_URL
```

Do NOT create secrets for the dead vars (`COC_TOKEN`, `HerokuURL`, `WAKA_TOKENS_JSON`, `wakaBearer`, `last_fm_secret`).

**Smoke-test each workflow** (`workflow_dispatch` is enabled on all three):

```sh
gh workflow run hourly-data.yml
gh workflow run kalshi-hourly.yml
gh workflow run daily-final.yml

gh run list --limit 5          # find the run IDs
gh run watch <run-id>          # or: gh run view <run-id> --log
```

Success criteria: all three runs green; `wakatime`, `oura_data`, `kalshi_positions`/`kalshi_profile`, `repos`, and songs tables show fresh `last_updated`-style values in whichever DB `DATABASE_URL` points at.

**Cutover ordering for the jobs** (token rotation, see §2 warning): in one sitting — (1) delete/disable the Heroku Scheduler jobs and set `heroku ps:scale worker=0` if the worker was ever scaled up, (2) take the fresh backup, (3) restore/refresh Neon, (4) flip the `DATABASE_URL` secret to Neon, (5) `gh workflow run` all three to confirm green against Neon.

---

## 5. DNS cutover for ashwiniyer.com

1. **Ahead of time** (ideally a day before): at your DNS provider, lower the TTL on the apex and `www` records to 300s so the switch propagates fast. (Heroku Auto Cert Management is currently on; nothing to do there — its renewals just start failing after DNS moves, which is fine.)

2. Add the domains to the Vercel project:

```sh
vercel domains add ashwiniyer.com
vercel domains add www.ashwiniyer.com
```

   (Or dashboard → project `nextjsportfolio` → Settings → Domains.) Vercel then displays the **exact** DNS targets to use — trust what it shows over anything written here.

3. At the DNS provider, replace the current `*.herokudns.com` targets:
   - apex `ashwiniyer.com`: ALIAS/ANAME (or A record) → the value Vercel shows (typically `A 76.76.21.21`)
   - `www`: CNAME → the value Vercel shows (typically `cname.vercel-dns.com`)

4. Verify propagation + SSL (both take minutes):

```sh
dig +short ashwiniyer.com
dig +short www.ashwiniyer.com
curl -sI https://ashwiniyer.com | head -5     # expect HTTP/2 200 and server: Vercel
```

   The Vercel dashboard shows certificate issuance status per domain.

5. Re-run the §3 curl checks against `https://ashwiniyer.com`.

Note: once DNS points at Vercel but before Heroku is decommissioned, the Heroku app keeps running harmlessly; its data just goes stale because the jobs now write to Neon.

---

## 6. Decommission Heroku (ONLY after days of verified stability)

Wait until the site AND all three scheduled workflows have been healthy for several days. Then:

```sh
# 1. Stop serving (Scheduler jobs should already be deleted per §4;
#    verify in the Scheduler dashboard: heroku addons:open scheduler -a nextjsportfolio)
heroku ps:scale web=0 -a nextjsportfolio

# 2. Keep the app + DB paused for ~a week as the rollback path. Then:
heroku addons:destroy heroku-postgresql -a nextjsportfolio   # destroys the Postgres (final!)
heroku apps:destroy -a nextjsportfolio --confirm nextjsportfolio

# 3. Local cleanup
git remote remove heroku
```

Before destroying the Postgres, keep a final `backup.dump` somewhere safe (it is gitignored — never commit it).

**Rollback** (any time before `apps:destroy`):

1. Revert DNS: apex + `www` back to the previous `*.herokudns.com` targets.
2. `heroku ps:scale web=1 -a nextjsportfolio`
3. If Actions have been writing to Neon meanwhile, the Heroku DB is stale — either point the `DATABASE_URL` GitHub secret back at the Heroku URL (and stop pointing anything at Neon — token rotation, §2) or accept the staleness during the rollback window.

---

## 7. Known issues & follow-ups

- **COC_TOKEN (IP-allowlisted)** — read by NO current code. The script that used it (`app/scripts/getClash.js`) was deleted in commit `fbd8647`; `app/components/COC.js` now renders the committed static `app/data/COC.json`. So: do not copy it to Vercel or Actions, nothing to migrate. It only matters if the Clash-of-Clans fetch job is ever resurrected — CoC API keys are IP-allowlisted, so a run from Actions/Vercel (dynamic egress IPs) gets 403. Options then: use the CoC developer API to mint a key for the runner's current IP at the start of each run, route the request through a static-egress proxy, or keep the static-JSON approach (no job).
- **WakaTime / Oura token refresh** — refresh tokens are DB-stored (`api_tokens` table via `token_manager.py`), so no interactive re-auth (`oura_setup.py` / `wakatime_setup.py`) is needed after copying the table to Neon. But tokens rotate on every run — single-writer rule and fresh-copy-at-cutover per §2. If tokens ever DO get stranded (jobs fail auth), rerun the interactive setup scripts locally with `DATABASE_URL` pointed at Neon.
- **TLS hardening (post-cutover)** — `app/about/db.js` sets `ssl: { rejectUnauthorized: false }` in both Pool branches (kept intentionally for Heroku compatibility). Once Heroku is gone, switch to verified TLS against Neon (Neon serves publicly-trusted certs; `ssl: true` typically suffices). Python side already honors `sslmode=require` from the URL; consider `sslmode=verify-full` later.
- **60-day auto-disable** — on public repos, GitHub disables scheduled workflows after 60 days without repository activity. Any push resets the clock; the `workflow_dispatch` trigger on each workflow is the manual re-enable (Actions tab → workflow → "Run workflow"). Check the Actions tab if data ever silently goes stale.
- **`git remote remove heroku`** — do this at decommission (§6) so an accidental push can never deploy again. Optional: also `git remote remove github` (duplicate of `origin`).
- **Dead Heroku config vars** — `HerokuURL`, `COC_TOKEN`, `WAKA_TOKENS_JSON`, `wakaBearer` (dead helper in `api_helpers.py`), `last_fm_secret`: referenced by no code; migrate none of them.
- **Sitemap build churn** — `npm run build`'s postbuild (`next-sitemap`) regenerates the git-tracked `public/sitemap.xml`, `public/sitemap-0.xml`, `public/robots.txt`. Fine on Vercel (regenerated per deploy); locally, do not commit that churn. Optional cleanup: gitignore the three files + `git rm --cached` them.
- **Repo hygiene (optional, post-cutover)** — `.claude/settings.local.json` is git-tracked and `.claude/worktrees/*` contains 15 broken submodule gitlinks in a public repo; `git rm --cached` + ignore `.claude/`. Also consider pinning versions: `package.json` has no `engines.node` and `requirements.txt` has no pins, so Vercel/Actions float on defaults (workflows currently pin Python 3.12).
- **GH Actions cron is UTC and best-effort** — runs can be delayed several minutes; crons are already offset (`:07`, `:23`, `06:41`) to dodge top-of-hour congestion. Acceptable for all three jobs.
- **Cosmetic Heroku mentions** (optional copy edits, zero functional impact): `app/components/Skills.js:171,181` (Heroku skill icon), `content/coding.mdx:40` (prose), and the repo description shown on the site comes from GitHub via `final.py` — edit the description on the GitHub repo itself, not `app/data/repos.json`.
