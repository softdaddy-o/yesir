import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

const threadHtml = await readFile('threads/doha-poor-fish/index.html', 'utf8');
const nervousThreadHtml = await readFile('threads/nervous-system-habits/index.html', 'utf8');
const aiPlayThreadHtml = await readFile('threads/ai-play-self/index.html', 'utf8');
const anxietyThreadHtml = await readFile('threads/anxiety-trigger-people/index.html', 'utf8');
const happinessThreadHtml = await readFile('threads/happiness-not-goal/index.html', 'utf8');
const autonomyThreadHtml = await readFile('threads/autonomy-self-regulation/index.html', 'utf8');
const middleClassThreadHtml = await readFile('threads/middle-class-patterns/index.html', 'utf8');
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
assertIncludes(homeHtml, '3 rooms / 7 saves', 'index.html');
assertIncludes(homeHtml, '7 saved posts', 'index.html');
assertNotIncludes(homeHtml, 'threads/doha-poor-fish/', 'index.html');
assertNotIncludes(homeHtml, 'play/anxiety/', 'index.html');
assertNotIncludes(homeHtml, 'play/psychology/', 'index.html');
assertNotIncludes(homeHtml, '밖에서 주운 말', 'index.html');
assertNotIncludes(homeHtml, '살짝 열기', 'index.html');
assertNotIncludes(homeHtml, '웃음 서랍', 'index.html');

assertIncludes(mindHtml, '<title>마음 - 네님 놀이터 - yesir.softdaddy-o.com</title>', 'play/mind/index.html');
assertIncludes(mindHtml, '신경계를 불안하게 만드는 일상 습관', 'play/mind/index.html');
assertIncludes(mindHtml, '../../threads/nervous-system-habits/', 'play/mind/index.html');
assertIncludes(mindHtml, 'AI로 나랑 잘 놀기', 'play/mind/index.html');
assertIncludes(mindHtml, '../../threads/ai-play-self/', 'play/mind/index.html');
assertIncludes(mindHtml, '불안을 자극하는 사람을 고르는 이유', 'play/mind/index.html');
assertIncludes(mindHtml, '../../threads/anxiety-trigger-people/', 'play/mind/index.html');
assertNotIncludes(mindHtml, 'https://www.threads.com/@youngtech_01/post/DZPfJdrkXSB', 'play/mind/index.html');
assertNotIncludes(mindHtml, 'https://www.threads.com/@wrigglingshop/post/DWlnZF_D0KK', 'play/mind/index.html');
assertNotIncludes(mindHtml, 'https://www.threads.com/@gentleman.kr/post/DRTTM74CCgE', 'play/mind/index.html');
assertNotIncludes(mindHtml, '부모님 걱정', 'play/mind/index.html');
assertNotIncludes(mindHtml, '후킹 글쓰기 5가지 심리 장치', 'play/mind/index.html');
assertNotIncludes(mindHtml, '따뜻한 리더의 역설', 'play/mind/index.html');

assertIncludes(selfGrowthHtml, '<title>자기계발 - 네님 놀이터 - yesir.softdaddy-o.com</title>', 'play/self-growth/index.html');
assertIncludes(selfGrowthHtml, '행복을 목표로 삼지 말라', 'play/self-growth/index.html');
assertIncludes(selfGrowthHtml, '../../threads/happiness-not-goal/', 'play/self-growth/index.html');
assertIncludes(selfGrowthHtml, '자율성이 오래 가는 자기조절을 만든다', 'play/self-growth/index.html');
assertIncludes(selfGrowthHtml, '../../threads/autonomy-self-regulation/', 'play/self-growth/index.html');
assertIncludes(selfGrowthHtml, '서민 중산층에 머무는 10가지 패턴', 'play/self-growth/index.html');
assertIncludes(selfGrowthHtml, '../../threads/middle-class-patterns/', 'play/self-growth/index.html');
assertNotIncludes(selfGrowthHtml, 'https://www.threads.com/@watch.point_re/post/DZNbtYqFH9i', 'play/self-growth/index.html');
assertNotIncludes(selfGrowthHtml, 'https://www.threads.com/@dream_grow_lee/post/DX_0Ze4Ehvg', 'play/self-growth/index.html');
assertNotIncludes(selfGrowthHtml, 'https://www.threads.com/@yoonji_song/post/DXlXaiLga8x', 'play/self-growth/index.html');

assertIncludes(funnyHtml, '<title>웃긴 것 - 네님 놀이터 - yesir.softdaddy-o.com</title>', 'play/funny/index.html');
assertIncludes(funnyHtml, '가난한 물고기', 'play/funny/index.html');
assertIncludes(funnyHtml, '../../threads/doha-poor-fish/', 'play/funny/index.html');
assertNotIncludes(funnyHtml, '웃긴 닉네임', 'play/funny/index.html');
assertNotIncludes(funnyHtml, '아재개그 대회', 'play/funny/index.html');
assertNotIncludes(funnyHtml, '천하제일 똥글 명언 대회', 'play/funny/index.html');
assertNotIncludes(funnyHtml, '../../threads/funny-nickname/', 'play/funny/index.html');
assertNotIncludes(funnyHtml, '../../threads/ajae-joke-contest/', 'play/funny/index.html');
assertNotIncludes(funnyHtml, '../../threads/bad-writing-quote-contest/', 'play/funny/index.html');

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

assertIncludes(nervousThreadHtml, '<title>신경계를 불안하게 만드는 일상 습관 - yesir.softdaddy-o.com</title>', 'threads/nervous-system-habits/index.html');
assertIncludes(nervousThreadHtml, '조용히 신경계를 불안하게 만드는', 'threads/nervous-system-habits/index.html');
assertIncludes(nervousThreadHtml, 'Threads 본문 조각 6개', 'threads/nervous-system-habits/index.html');
assertIncludes(nervousThreadHtml, '캡처</dt><dd>7장</dd>', 'threads/nervous-system-habits/index.html');

assertIncludes(aiPlayThreadHtml, '<title>AI로 나랑 잘 놀기 - yesir.softdaddy-o.com</title>', 'threads/ai-play-self/index.html');
assertIncludes(aiPlayThreadHtml, '내가 나랑 잘 놀기', 'threads/ai-play-self/index.html');
assertIncludes(aiPlayThreadHtml, 'Threads 본문 조각 4개', 'threads/ai-play-self/index.html');

assertIncludes(anxietyThreadHtml, '<title>불안을 자극하는 사람을 고르는 이유 - yesir.softdaddy-o.com</title>', 'threads/anxiety-trigger-people/index.html');
assertIncludes(anxietyThreadHtml, '무의식적 얽힘', 'threads/anxiety-trigger-people/index.html');
assertIncludes(anxietyThreadHtml, 'Threads 본문 조각 8개', 'threads/anxiety-trigger-people/index.html');

assertIncludes(happinessThreadHtml, '<title>행복을 목표로 삼지 말라 - yesir.softdaddy-o.com</title>', 'threads/happiness-not-goal/index.html');
assertIncludes(happinessThreadHtml, '행복을 목표로 삼지 마라', 'threads/happiness-not-goal/index.html');
assertIncludes(happinessThreadHtml, 'Threads 본문 조각 19개', 'threads/happiness-not-goal/index.html');

assertIncludes(autonomyThreadHtml, '<title>자율성이 오래 가는 자기조절을 만든다 - yesir.softdaddy-o.com</title>', 'threads/autonomy-self-regulation/index.html');
assertIncludes(autonomyThreadHtml, '자율성의 문제입니다', 'threads/autonomy-self-regulation/index.html');
assertIncludes(autonomyThreadHtml, 'Threads 본문 조각 6개', 'threads/autonomy-self-regulation/index.html');

assertIncludes(middleClassThreadHtml, '<title>서민 중산층에 머무는 10가지 패턴 - yesir.softdaddy-o.com</title>', 'threads/middle-class-patterns/index.html');
assertIncludes(middleClassThreadHtml, 'Logseq 검증 노트에 남은 본문 요지', 'threads/middle-class-patterns/index.html');
assertIncludes(middleClassThreadHtml, 'Threads Logseq 항목 13개', 'threads/middle-class-patterns/index.html');
assertIncludes(middleClassThreadHtml, 'D:/LogseqData의 verified literature note', 'threads/middle-class-patterns/index.html');

const firstReplyIndex = threadHtml.indexOf('id="reply-1"');
const topLikedIndex = threadHtml.indexOf('minij0min');
const previousChronologicalIndex = threadHtml.indexOf('john_and_peter__');
if (!(firstReplyIndex !== -1 && topLikedIndex > firstReplyIndex && topLikedIndex < previousChronologicalIndex)) {
    throw new Error('thread page default reply order is not like-count descending');
}

assertExists('src/thread-template.mjs');
assertExists('scripts/build-site.mjs');
assertExists('data/playground.json');
for (const path of [
    'data/threads/doha-poor-fish.json',
    'data/threads/nervous-system-habits.json',
    'data/threads/ai-play-self.json',
    'data/threads/anxiety-trigger-people.json',
    'data/threads/happiness-not-goal.json',
    'data/threads/autonomy-self-regulation.json',
    'data/threads/middle-class-patterns.json',
]) {
    assertExists(path);
}
for (const path of [
    'data/threads/funny-nickname.json',
    'data/threads/ajae-joke-contest.json',
    'data/threads/bad-writing-quote-contest.json',
]) {
    assertMissing(path);
}
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
    'threads/doha-poor-fish/index.html',
    'threads/nervous-system-habits/index.html',
    'threads/ai-play-self/index.html',
    'threads/anxiety-trigger-people/index.html',
    'threads/happiness-not-goal/index.html',
    'threads/autonomy-self-regulation/index.html',
    'threads/middle-class-patterns/index.html',
]) {
    assertExists(path);
}
for (const path of [
    'play/anxiety/index.html',
    'play/psychology/index.html',
    'threads/funny-nickname/index.html',
    'threads/ajae-joke-contest/index.html',
    'threads/bad-writing-quote-contest/index.html',
]) {
    assertMissing(path);
}

if ((await readFile('CNAME', 'utf8')).trim() !== 'yesir.softdaddy-o.com') {
    throw new Error('CNAME trimmed content mismatch');
}

const checkedHtml = [
    homeHtml,
    mindHtml,
    selfGrowthHtml,
    funnyHtml,
    threadHtml,
    nervousThreadHtml,
    aiPlayThreadHtml,
    anxietyThreadHtml,
    happinessThreadHtml,
    autonomyThreadHtml,
    middleClassThreadHtml,
].join('');
if (/[\uFFFD\u5a9b\u6e72\uf9ce\uc9cc]/.test(checkedHtml)) {
    throw new Error('generated HTML contains likely mojibake');
}

console.log('static page checks passed');
