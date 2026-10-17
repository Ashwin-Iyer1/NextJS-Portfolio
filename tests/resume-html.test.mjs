import assert from "node:assert/strict";
import { test } from "node:test";
import { load } from "cheerio";
import { extractResumeHtml } from "../app/resume/resume-html.mjs";

test("embeds only the resume and preserves content with a nested heading hierarchy", () => {
  const html = extractResumeHtml(`
    <html><head><style>body { color: red; }</style></head><body>
      <nav>Source navigation</nav>
      <main id="resume">
        <header><h1>Sample Resume</h1></header>
        <section id="education"><h2>Education</h2><article>
          <div class="entry-heading"><h3>University</h3><p class="date">2028</p></div>
          <p><strong>Degree</strong> &amp; honors</p><ul><li>Coursework</li></ul>
        </article></section>
      </main><footer>Source footer</footer>
    </body></html>
  `);
  const $ = load(html, null, false);
  assert.equal($("html, head, body, main, style, nav, footer, h1, [id]").length, 0);
  assert.equal($("header h2").text(), "Sample Resume");
  assert.equal($("section h3").text(), "Education");
  assert.equal($(".entry-heading h4").text(), "University");
  assert.equal($(".date").text(), "2028");
  assert.equal($("article > p").text(), "Degree & honors");
  assert.equal($("li").text(), "Coursework");
});

test("strips active content, inline styles, unrelated classes, and unsafe URLs", () => {
  const html = extractResumeHtml(`
    <main id="resume"><section style="position:fixed" onclick="alert(1)">
      <h2>Experience</h2><script>alert('script')</script><style>body{display:none}</style>
      <iframe src="https://example.com"></iframe><img src="x" onerror="alert(1)">
      <div class="entry-heading Bar"><p class="date fade-out">2026</p></div>
      <a href="java&#x73;cript:alert(1)" onmouseover="alert(1)">Unsafe</a>
      <a href="data:text/html,unsafe">Data URL</a>
      <p><strong>Keep this text</strong></p>
    </section></main>
  `);
  const $ = load(html, null, false);
  assert.equal($("script, style, iframe, img, [style], [onclick], [onmouseover]").length, 0);
  assert.equal($("a[href]").length, 0);
  assert.equal($("div").attr("class"), "entry-heading");
  assert.equal($(".date").attr("class"), "date");
  assert.equal($("strong").text(), "Keep this text");
  assert.doesNotMatch(html, /alert|display:none/);
});

test("resolves source-relative links and retains safe contact links", () => {
  const $ = load(extractResumeHtml(`
    <main id="resume"><section><h2>Links</h2>
      <a href="../Ashwin_Iyer_CV.pdf">PDF</a>
      <a href="resume.txt">Text</a>
      <a href="mailto:sample@example.com">Email</a>
      <a href="tel:+15551234567">Phone</a>
      <a href="https://example.com/project">Project</a>
    </section></main>
  `), null, false);
  assert.deepEqual($("a").map((_, link) => $(link).attr("href")).get(), [
    "https://ashwin-iyer1.github.io/resume/Ashwin_Iyer_CV.pdf",
    "https://ashwin-iyer1.github.io/resume/docs/resume.txt",
    "mailto:sample@example.com",
    "tel:+15551234567",
    "https://example.com/project",
  ]);
});

test("rejects an error page or empty resume so the page can show its fallback", () => {
  for (const html of ["<h1>Not found</h1>", '<main id="resume"></main>', '<main id="resume"><section></section></main>']) {
    assert.throws(() => extractResumeHtml(html), /expected resume/);
  }
});
