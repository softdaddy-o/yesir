import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

const threadHtml = await readFile('threads/doha-poor-fish/index.html', 'utf8');
const homeHtml = await readFile('index.html', 'utf8');
const previewHtml = await readFile('design-previews/index.html', 'utf8');
const mindHtml = await readFile('play/mind/index.html', 'utf8');
const selfGrowthHtml = await readFile('play/self-growth/index.html', 'utf8');
const funnyHtml = await readFile('play/funny/index.html', 'utf8');
const packageJson = JSON.parse(await readFile('package.json', 'utf8'));

function assertIncludes(content, expected, path) {
    if (!content.includes(expected)) {
        throw new Error(`${path} does not include ${JSON.stringify(expected)}`);
    }
}

function assertNotIncludes(content, unexpected, path) {
    if (content.includes(unexpected)) {
        throw new Error(`${path} unexpectedly includes ${JSON.stringify(unexpected)}`);
    }
}

function assertExists(path) {
    if (!existsSync(path)) {
        throw new Error(`${path} is missing`);
    }
}

function assertMissing(path) {
    if (existsSync(path)) {
        throw new Error(`${path} should not exist`);
    }
}

assertIncludes(homeHtml, '<title>네님 놀이터 - yesir.softdaddy-o.com</title>', 'index.html');
assertIncludes(homeHtml, 'Naenim playground', 'index.html');
assertIncludes(homeHtml, '네님</span><span>놀이터', 'index.html');
assertIncludes(homeHtml, '다시 볼 것들<br>주제별로 정리', 'index.html');
assertIncludes(homeHtml, '필요할 때 다시 보려고 남겨둔 글과 캡처를', 'index.html');
assertIncludes(homeHtml, 'play/mind/', 'index.html');
assertIncludes(homeHtml, 'play/self-growth/', 'index.html');
assertIncludes(homeHtml, 'play/funny/', 'index.html');
assertIncludes(homeHtml, 'home-scrapbook', 'index.html');
assertIncludes(homeHtml, '3 rooms / 11 saves', 'index.html');
assertIncludes(homeHtml, '11 saved posts', 'index.html');
assertNotIncludes(homeHtml, 'threads/doha-poor-fish/', 'index.html');
assertNotIncludes(homeHtml, 'play/anxiety/', 'index.html');
assertNotIncludes(homeHtml, 'play/psychology/', 'index.html');
assertNotIncludes(homeHtml, '밖에서 주운 말', 'index.html');
assertNotIncludes(homeHtml, '살짝 열기', 'index.html');
assertNotIncludes(homeHtml, '웃음 서랍', 'index.html');

assertIncludes(mindHtml, '<title>마음 - 네님 놀이터 - yesir.softdaddy-o.com</title>', 'play/mind/index.html');
assertIncludes(mindHtml, '신경계를 불안하게 만드는 일상 습관', 'play/mind/index.html');
assertIncludes(mindHtml, 'https://www.threads.com/@youngtech_01/post/DZPfJdrkXSB', 'play/mind/index.html');
assertIncludes(mindHtml, 'AI로 나랑 잘 놀기', 'play/mind/index.html');
assertIncludes(mindHtml, '부모님 걱정', 'play/mind/index.html');
assertIncludes(mindHtml, '불안을 자극하는 사람을 고르는 이유', 'play/mind/index.html');
assertIncludes(mindHtml, '후킹 글쓰기 5가지 심리 장치', 'play/mind/index.html');
assertIncludes(mindHtml, 'https://www.threads.com/@sienna__ai/post/DX4edcwCY0X', 'play/mind/index.html');
assertIncludes(mindHtml, '따뜻한 리더의 역설', 'play/mind/index.html');

assertIncludes(selfGrowthHtml, '<title>자기계발 - 네님 놀이터 - yesir.softdaddy-o.com</title>', 'play/self-growth/index.html');
assertIncludes(selfGrowthHtml, '행복을 목표로 삼지 말라', 'play/self-growth/index.html');
assertIncludes(selfGrowthHtml, 'https://www.threads.com/@watch.point_re/post/DZNbtYqFH9i', 'play/self-growth/index.html');
assertIncludes(selfGrowthHtml, '자율성이 오래 가는 자기조절을 만든다', 'play/self-growth/index.html');
assertIncludes(selfGrowthHtml, '서민 중산층에 머무는 10가지 패턴', 'play/self-growth/index.html');

assertIncludes(funnyHtml, '<title>웃긴 것 - 네님 놀이터 - yesir.softdaddy-o.com</title>', 'play/funny/index.html');
assertIncludes(funnyHtml, '가난한 물고기', 'play/funny/index.html');
assertIncludes(funnyHtml, '../../threads/doha-poor-fish/', 'play/funny/index.html');
assertIncludes(funnyHtml, '웃긴 닉네이', 'play/funny/index.html');
assertIncludes(funnyHtml, 'https://www.threads.com/@soon_bu.li/post/DZOO7rPkyVM', 'play/funny/index.html');

assertIncludes(previewHtml, '<title>yesir 디자인 프리뷰 - yesir.softdaddy-o.com</title>', 'design-previews/index.html');
assertIncludes(previewHtml, 'Pop Scrapbook', 'design-previews/index.html');
assertIncludes(previewHtml, 'Cute OS', 'design-previews/index.html');
assertIncludes(previewHtml, 'Zine Board', 'design-previews/index.html');
assertIncludes(previewHtml, '../styles.css', 'design-previews/index.html');

assertIncludes(threadHtml, '<title>가난한 물고기 - yesir.softdaddy-o.com</title>', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, 'Threads archive', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, '가난한 물고기를', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, '푸어 라고 한다', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, '로그인 세션으로 스크롤 캡처한 Threads 댓글 405개', 'threads/doha-poor-fish/index.html');
assertIncludes(threadHtml, '캡처</dt><dd>162장</dd>', 'threads/doha-poor-fish/index.html');
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
assertExists('data/playground.json');
assertExists('data/threads/doha-poor-fish.json');
if (packageJson.scripts?.build !== 'node scripts/build-site.mjs') {
    throw new Error('package.json build script must run the shared thread template builder');
}

for (const path of [
    'CNAME',
    '.nojekyll',
    'assets/poor-fish.png',
    'design-previews/index.html',
    'play/mind/index.html',
    'play/self-growth/index.html',
    'play/funny/index.html',
]) {
    assertExists(path);
}

assertMissing('play/anxiety/index.html');
assertMissing('play/psychology/index.html');

if ((await readFile('CNAME', 'utf8')).trim() !== 'yesir.softdaddy-o.com') {
    throw new Error('CNAME trimmed content mismatch');
}

if (/[\uFFFD\u5a9b\u6e72\uf9ce\uc9cc]/.test(homeHtml + mindHtml + selfGrowthHtml + funnyHtml + threadHtml)) {
    throw new Error('generated HTML contains likely mojibake');
}

console.log('static page checks passed');
