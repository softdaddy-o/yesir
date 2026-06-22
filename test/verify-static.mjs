import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const threadHtml = await readFile('threads/doha-poor-fish/index.html', 'utf8');
const homeHtml = await readFile('index.html', 'utf8');
const previewHtml = await readFile('design-previews/index.html', 'utf8');
const packageJson = JSON.parse(await readFile('package.json', 'utf8'));

function assertIncludes(content, expected, path) {
    if (!content.includes(expected)) {
        throw new Error(`${path} does not include ${JSON.stringify(expected)}`);
    }
}

function assertExists(path) {
    if (!existsSync(path)) {
        throw new Error(`${path} is missing`);
    }
}

assertIncludes(homeHtml, '<title>yesir.softdaddy-o.com</title>', 'index.html');
assertIncludes(homeHtml, '네님 전용', 'index.html');
assertIncludes(homeHtml, 'threads/doha-poor-fish/', 'index.html');
assertIncludes(homeHtml, 'design-previews/', 'index.html');
assertIncludes(homeHtml, 'yesir 톤 3안', 'index.html');
assertIncludes(homeHtml, '답글 405개', 'index.html');

assertIncludes(previewHtml, '<title>yesir 디자인 프리뷰 - yesir.softdaddy-o.com</title>', 'design-previews/index.html');
assertIncludes(previewHtml, 'Pop Scrapbook', 'design-previews/index.html');
assertIncludes(previewHtml, 'Cute OS', 'design-previews/index.html');
assertIncludes(previewHtml, 'Zine Board', 'design-previews/index.html');
assertIncludes(previewHtml, '../styles.css', 'design-previews/index.html');

assertIncludes(threadHtml, '<title>가난한 물고기 - yesir.softdaddy-o.com</title>', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, 'Threads archive', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, '가난한 물고기를', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, '푸어 라고 한다', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, '로그인 세션으로 스크롤 캡쳐한 Threads 답글 405개', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, '캡쳐</dt><dd>162장</dd>', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, 'id="reply-405"', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, 'data-thread-sort-toggle', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, 'data-default-sort="likes"', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, '좋아요순', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, '원래순', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, 'https://www.threads.com/@doha_txt/post/DZusRTzgQmh', 'threads/doha-poor-fish/index.html');

const firstReplyIndex = threadHtml.indexOf('id="reply-1"');
const topLikedIndex = threadHtml.indexOf('minij0min');
const previousChronologicalIndex = threadHtml.indexOf('john_and_peter__');
if (!(firstReplyIndex !== -1 && topLikedIndex > firstReplyIndex && topLikedIndex < previousChronologicalIndex)) {
    throw new Error('thread page default reply order is not like-count descending');
}

assertExists('src/thread-template.mjs');
assertExists('scripts/build-site.mjs');
assertExists('data/threads/doha-poor-fish.json');
if (packageJson.scripts?.build !== 'node scripts/build-site.mjs') {
    throw new Error('package.json build script must run the shared thread template builder');
}

for (const path of ['CNAME', '.nojekyll', 'assets/poor-fish.png']) {
    assertExists(path);
}
assertExists('design-previews/index.html');

if ((await readFile('CNAME', 'utf8')).trim() !== 'yesir.softdaddy-o.com') {
    throw new Error('CNAME trimmed content mismatch');
}

if (/[\uFFFD\u5a9b\u6e72\uf9ce\uc9cc]/.test(homeHtml + threadHtml)) {
    throw new Error('generated HTML contains likely mojibake');
}

console.log('static page checks passed');
