import {
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
  lstat,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkouts = path.dirname(root);
const output = path.join(root, "public", "demos");
const projects = [
  {
    id: "factor-risk",
    repo: "Index-based-Factor-Decomposition",
    folder: "workbench/dist",
    slug: "factor-risk",
  },
  {
    id: "nucoop",
    repo: "NUWorks-Co-op-grader-site",
    folder: "demo",
    slug: "nucoop",
    remote: "NUWorks-Co-op-grader",
    branch: "chrome-extension-site",
  },
  {
    id: "firmware",
    repo: "Uniden-Firmware-Decompilation-Tool",
    folder: "web",
    slug: "firmware-workbench",
    licenses: ["LICENSE", "NOTICE"],
  },
  { id: "fourier", repo: "FourierSeries", folder: "web", slug: "fourier-lab" },
  {
    id: "oura",
    repo: "oura-npm",
    folder: "demo/dist",
    slug: "oura-visualizer",
  },
  {
    id: "fantasy-draft",
    repo: "FantasyDraft",
    folder: "web/dist",
    slug: "fantasy-draft",
  },
  { id: "row2reach", repo: "row2reach", folder: "studio", slug: "row2reach" },
];
const only = process.argv
  .find((value) => value.startsWith("--only="))
  ?.slice(7)
  .split(",");
const allowDirty = process.argv.includes("--allow-dirty");
const selected = only
  ? projects.filter((project) => only.includes(project.id))
  : projects;
if (!selected.length) throw new Error("No matching project demos.");
await mkdir(output, { recursive: true });
for (const project of selected) {
  const source = path.join(checkouts, project.repo, project.folder);
  const destination = path.resolve(output, project.id);
  const checkout = path.join(checkouts, project.repo);
  const dirty = Boolean(
    execFileSync("git", ["status", "--porcelain"], {
      cwd: checkout,
      encoding: "utf8",
    }).trim(),
  );
  if (dirty && !allowDirty)
    throw new Error(
      `${project.repo} has uncommitted changes. Commit source first, or use --allow-dirty for a local preview.`,
    );
  await readFile(path.join(source, "index.html"));
  // Only replace these explicitly named generated output directories.
  if (!destination.startsWith(`${output}${path.sep}`))
    throw new Error("Unsafe demo output path.");
  try {
    if ((await lstat(destination)).isSymbolicLink())
      throw new Error("Refusing to replace a symbolic link.");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await rm(destination, { recursive: true, force: true });
  await cp(source, destination, {
    recursive: true,
    filter: (value) =>
      !/(?:\.md$|\.map$|\.test\.|[\\/](?:tests|node_modules|screenshots|docs)(?:[\\/]|$))/.test(
        value,
      ),
  });
  for (const license of project.licenses || [])
    await cp(
      path.join(checkouts, project.repo, license),
      path.join(destination, license),
    );
  const repository = `https://github.com/Ashwin-Iyer1/${project.remote || project.repo}`;
  const commit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: path.join(checkouts, project.repo),
    encoding: "utf8",
  }).trim();
  let html = await readFile(path.join(destination, "index.html"), "utf8");
  // Next serves public files explicitly rather than directory-indexing them.
  html = html.replace(/href=(['"])\.\/?\1/g, 'href="./index.html"');
  const footer = `<aside aria-label="Project context" class="portfolio-project-context"><a href="/projects/${project.slug}">← Back to the case study</a> · <a href="${repository}/tree/${commit}" target="_blank" rel="noopener noreferrer">${dirty ? "Source repository (working preview)" : "View this version’s source"} ↗</a>${project.licenses ? ' · <a href="./LICENSE">License</a> · <a href="./NOTICE">Attribution</a>' : ""}</aside>`;
  html = html.replace(
    "</head>",
    '<link rel="stylesheet" href="./portfolio-context.css"></head>',
  );
  html = html.replace("</body>", `${footer}</body>`);
  await writeFile(path.join(destination, "index.html"), html);
  // External CSS respects demos with strict style-src policies.
  await writeFile(
    path.join(destination, "portfolio-context.css"),
    ".portfolio-project-context{display:block;position:static;box-sizing:border-box;width:100%;padding:24px 20px;text-align:center;font:12px/1.8 system-ui,sans-serif;clear:both}.portfolio-project-context a{color:inherit;text-decoration:underline;text-underline-offset:3px}.portfolio-project-context a:focus-visible{outline:2px solid currentColor;outline-offset:4px}\n",
  );
  const files = {};
  async function hashFiles(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) await hashFiles(target);
      else {
        let bytes = await readFile(target);
        if (
          /\.(?:html|css|js|mjs|json|svg|txt)$|[\\/](?:LICENSE|NOTICE)$/.test(
            target,
          )
        ) {
          bytes = Buffer.from(bytes.toString("utf8").replace(/\r\n/g, "\n"));
          await writeFile(target, bytes);
        }
        files[path.relative(destination, target).split(path.sep).join("/")] =
          createHash("sha256").update(bytes).digest("hex");
      }
    }
  }
  await hashFiles(destination);
  await writeFile(
    path.join(destination, "provenance.json"),
    JSON.stringify(
      {
        repository,
        commit,
        workingPreview: dirty,
        sourceDirectory: project.folder,
        files,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    `${project.id}: ${Object.keys(files).length} public runtime files from ${commit.slice(0, 7)}`,
  );
}
