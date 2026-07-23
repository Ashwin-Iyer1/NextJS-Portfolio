// Builds the design-system dist the /design-sync converter consumes.
//
// The repo is a Next.js app with no library build, so this script is that
// build: it takes .design-sync/entry.js and produces an ESM entry plus a single
// stylesheet under .design-sync/.cache/dist/. It exists because the converter's
// own esbuild pass can't read this source as-is — components are JSX inside
// `.js` files, they import .webp assets, and they import next/* modules that
// have no meaning outside a Next runtime.
//
// react/react-dom stay external so the converter's own shims bind them to
// window.React (a second React copy in the bundle breaks hooks). react-is is
// deliberately NOT external: MUI reaches it through a CommonJS `require`, and
// an external CJS require in ESM output compiles to `__require("react-is")`,
// which throws at load and takes the whole bundle down. The bundled copy
// (19.2.4) shares React 19's element symbols, so it agrees with window.React.
//
// Run: node .design-sync/build-ds.mjs
// esbuild resolves through .design-sync/node_modules -> ../.ds-sync/node_modules.

import { build } from "esbuild";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(HERE, ".cache/dist");
const REPO = resolve(HERE, "..");
mkdirSync(OUT_DIR, { recursive: true });

// Components reference logos and social icons as site-absolute paths
// ("/Images/github.webp"), which Next serves out of public/. Nothing serves
// public/ for a preview card or a rendered design, so those paths 404 and the
// components render broken-image glyphs. Resolve them at build time — the same
// job Next does at serve time — by inlining the file as a data URI.
const MIME = {
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml",
};
const PUBLIC_REF = /(["'])(\/[A-Za-z0-9_\-./]+\.(?:webp|png|jpe?g|gif|svg))\1/g;

const inlinePublicAssets = {
  name: "inline-public-assets",
  setup(b) {
    const missing = new Set();
    b.onLoad({ filter: /\/app\/components\/[^/]+\.js$/ }, (args) => {
      const source = readFileSync(args.path, "utf8");
      if (!PUBLIC_REF.test(source)) return null;
      PUBLIC_REF.lastIndex = 0;
      const contents = source.replace(PUBLIC_REF, (whole, quote, ref) => {
        const file = join(REPO, "public", ref);
        if (!existsSync(file)) { missing.add(ref); return whole; }
        const mime = MIME[extname(ref).toLowerCase()];
        if (!mime) return whole;
        return `"data:${mime};base64,${readFileSync(file).toString("base64")}"`;
      });
      return { contents, loader: "jsx" };
    });
    b.onEnd(() => {
      for (const ref of missing) console.error(`  ! public asset not found: ${ref}`);
    });
  },
};

const result = await build({
  entryPoints: [join(HERE, "entry.js")],
  bundle: true,
  // CJS, not ESM. MUI and its dependencies are CommonJS and reach React with
  // `require("react")`. In ESM output esbuild compiles a require of an EXTERNAL
  // module to `__require(...)`, which throws "Dynamic require is not supported"
  // at load. CJS output emits a plain `require("react")`, which the converter's
  // bundling pass resolves through its React shim like any other import.
  format: "cjs",
  platform: "browser",
  target: "es2020",
  outfile: join(OUT_DIR, "index.js"),
  // The converter re-bundles this output and swaps these for window.React.
  external: [
    "react",
    "react-dom",
    "react-dom/client",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
  ],
  jsx: "automatic",
  loader: {
    // Components are JSX in .js files (Next's default) — esbuild's plain `js`
    // loader rejects that syntax.
    ".js": "jsx",
    ".webp": "dataurl",
    ".png": "dataurl",
    ".jpg": "dataurl",
    ".jpeg": "dataurl",
    ".gif": "dataurl",
    ".svg": "dataurl",
    ".woff": "dataurl",
    ".woff2": "dataurl",
  },
  alias: {
    "next/link": join(HERE, "shims/next-link.js"),
    "next/image": join(HERE, "shims/next-image.js"),
    "next/navigation": join(HERE, "shims/next-navigation.js"),
  },
  plugins: [inlinePublicAssets],
  define: { "process.env.NODE_ENV": '"development"' },
  minify: false,
  metafile: true,
  logLevel: "warning",
});

// index.css reaches the converter through cfg.cssEntry, not through a JS
// import — the JS entry deliberately carries no stylesheet reference.

const kb = (p) => (statSync(p).size / 1024).toFixed(0);
console.error(`  ds dist: index.js ${kb(join(OUT_DIR, "index.js"))} KB, index.css ${kb(join(OUT_DIR, "index.css"))} KB`);
for (const w of result.warnings) console.error(`  ! ${w.text}`);
