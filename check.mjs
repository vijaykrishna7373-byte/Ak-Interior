import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = process.cwd();
const content = JSON.parse(fs.readFileSync('content.json', 'utf8'));
const pages = ['index.html', ...content.pages.map(p => `${p.path}/index.html`)];
const titles = new Set();
const localMissing = [];
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
  assert.ok(title, `${file}: missing title`);
  assert.ok(!titles.has(title), `${file}: duplicate title ${title}`);
  titles.add(title);
  assert.match(html, /<meta name="description" content="[^"]+"/, `${file}: missing meta description`);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${file}: expected exactly one H1`);
  const pageDir = path.dirname(file) === '.' ? '/' : `/${path.dirname(file)}/`;
  const baseUrl = new URL(pageDir, 'https://local.test');
  const fileBase = pathToFileURL(path.resolve(file));
  for (const [, attr, href] of html.matchAll(/(href|src)="([^"#][^"]*)"/g)) {
    if (/^(https?:|mailto:|tel:|\/\/|data:)/i.test(href)) continue;
    const pathname = decodeURIComponent(new URL(href, baseUrl).pathname);
    const target = path.join(root, pathname.replace(/^\/+/, ''), pathname.endsWith('/') ? 'index.html' : '');
    if (!fs.existsSync(target) && !fs.existsSync(path.join(root, pathname.replace(/^\/+/, '')))) localMissing.push(`${file} ${attr} → ${href}`);
    const fileTarget = fileURLToPath(new URL(href, fileBase));
    if (!fs.existsSync(fileTarget) && !fs.existsSync(path.dirname(fileTarget))) localMissing.push(`${file} ${attr} does not resolve under file:// → ${href}`);
  }
}
assert.equal(localMissing.length, 0, `Missing internal routes:\n${localMissing.join('\n')}`);
for (const required of ['robots.txt', 'sitemap.xml', 'favicon.svg', 'styles.css', 'site.js']) assert.ok(fs.existsSync(required), `Missing ${required}`);
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<url>/g) || []).length, pages.length, 'Sitemap route count mismatch');
console.log(`PASS: ${pages.length} static pages have unique titles, descriptions, one H1, valid local routes, and sitemap entries.`);
