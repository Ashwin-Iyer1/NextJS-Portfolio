import { spawnSync } from "node:child_process";

// Use Node entrypoints so this command works in PowerShell and POSIX shells.
const npm = process.env.npm_execpath;
if (!npm) throw new Error("Run this through npm run test:ui:production.");
for (const [script, args, env] of [
  [npm, ["run", "build"], process.env],
  [
    "node_modules/@playwright/test/cli.js",
    ["test"],
    { ...process.env, PLAYWRIGHT_PRODUCTION: "1" },
  ],
]) {
  const result = spawnSync(process.execPath, [script, ...args], {
    stdio: "inherit",
    env,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
