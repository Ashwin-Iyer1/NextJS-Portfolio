import { readFile, writeFile, mkdir, rm, lstat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { explorerDemos, localPreviews } from './explorer-demo-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkouts = path.dirname(root);
const output = path.join(root, 'public', 'demos');
const pictures = path.join(root, 'public', 'project-previews');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const versions = [];
await mkdir(pictures, { recursive: true });

function checkout(repo) {
  const cwd = path.join(checkouts, repo);
  if (execFileSync('git', ['status', '--porcelain'], { cwd, encoding: 'utf8' }).trim())
    throw Error(`${repo} has uncommitted changes; commit and verify source first.`);
  return { cwd, commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd, encoding: 'utf8' }).trim() };
}
function contained(base, relative) {
  const resolved = path.resolve(base, relative);
  if (!resolved.startsWith(base + path.sep)) throw Error(`Unsafe path: ${relative}`);
  return resolved;
}
async function fileBytes(base, relative) {
  const source = contained(base, relative);
  if ((await lstat(source)).isSymbolicLink()) throw Error(`Symlink rejected: ${source}`);
  return readFile(source);
}
async function preview(id, repo, file, source) {
  const bytes = await fileBytes(source.cwd, file);
  await writeFile(path.join(pictures, `${id}.png`), bytes);
  versions.push({ id, repository: `https://github.com/Ashwin-Iyer1/${repo}`, commit: source.commit, source: file, file: `${id}.png`, sha256: sha(bytes) });
}
for (const demo of explorerDemos) {
  const source = checkout(demo.repo);
  const destination = contained(output, demo.id);
  try { if ((await lstat(destination)).isSymbolicLink()) throw Error('Output symlink rejected.'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  // Resolved destination is checked above; only this named generated directory is replaced.
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  const files = {}, sourceFiles = {};
  const entry = demo.entry || 'index.html';
  const repository = `https://github.com/Ashwin-Iyer1/${demo.repo}`;
  for (const relative of demo.files) {
    let bytes = await fileBytes(source.cwd, path.join(demo.folder, relative));
    if (/\.(html|css|js|json|txt)$|LICENSE$/.test(relative)) bytes = Buffer.from(bytes.toString('utf8').replace(/\r\n/g, '\n'));
    sourceFiles[relative] = sha(bytes);
    if (relative === entry) {
      let html = bytes.toString('utf8').replace(/href=(['"])\.\/?\1/g, 'href="./index.html"');
      if (demo.id === 'interview') html = html.replace('href="../dashboard.html"', `href="${repository}/tree/${source.commit}#readme"`).replace('Optional AI dashboard ↗', 'Local AI workflow setup ↗');
      const contextCSS = path.posix.relative(path.posix.dirname(entry), 'portfolio-context.css');
      // Add same-origin stylesheet permission only; script/connect restrictions stay intact.
      html = html.replace("style-src 'unsafe-inline';", "style-src 'self' 'unsafe-inline';");
      html = html.replace('</head>', `<link rel="stylesheet" href="${contextCSS}"></head>`);
      html = html.replace('</body>', `<aside class="portfolio-project-context" aria-label="Project context"><a href="/projects/explore#${demo.repo.toLowerCase()}">← Project directory</a> · <a href="${repository}/tree/${source.commit}">View this version’s source ↗</a> · <a href="${path.posix.relative(path.posix.dirname(entry), 'provenance.json')}">Build provenance</a></aside></body>`);
      bytes = Buffer.from(html);
    }
    const target = contained(destination, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, bytes); files[relative] = sha(bytes);
  }
  for (const relative of demo.extras || []) {
    const raw = await fileBytes(source.cwd, relative);
    const bytes = Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n'));
    await writeFile(contained(destination, relative), bytes);
    files[relative] = sha(bytes); sourceFiles[relative] = sha(bytes);
  }
  const css = Buffer.from('.portfolio-project-context{display:block;position:static;box-sizing:border-box;width:100%;padding:28px 20px;text-align:center;font:12px/1.8 system-ui,sans-serif;clear:both}.portfolio-project-context a{color:inherit;text-decoration:underline;text-underline-offset:3px}.portfolio-project-context a:focus-visible{outline:2px solid currentColor;outline-offset:4px}\n');
  await writeFile(path.join(destination, 'portfolio-context.css'), css); files['portfolio-context.css'] = sha(css);
  await writeFile(path.join(destination, 'provenance.json'), JSON.stringify({ repository, commit: source.commit, workingPreview: false, sourceDirectory: demo.folder || '.', entry, sourceHashNormalization: 'UTF-8 text line endings normalized to LF; binary files unchanged', sourceFiles, files }, null, 2) + '\n');
  if (demo.screenshot) await preview(demo.id, demo.repo, demo.screenshot, source);
  console.log(`${demo.id}: ${Object.keys(files).length} allowlisted files from ${source.commit.slice(0, 7)}`);
}
for (const item of localPreviews) await preview(item.id, item.repo, item.file, checkout(item.repo));
await writeFile(path.join(pictures, 'provenance.json'), JSON.stringify(versions, null, 2) + '\n');
