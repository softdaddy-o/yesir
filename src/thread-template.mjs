const THREADS_POST_URL_PREFIX = 'https://www.threads.com/';

export function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export function formatNumber(value) {
    if (typeof value !== 'number') {
        return '';
    }

    if (value >= 10000) {
        return `${(value / 10000).toFixed(value % 10000 === 0 ? 0 : 1)}만`;
    }

    if (value >= 1000) {
        return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}천`;
    }

    return String(value);
}

export function formatDate(seconds) {
    if (!seconds) {
        return '';
    }

    return new Intl.DateTimeFormat('ko-KR', {
        month: 'long',
        day: 'numeric',
    }).format(new Date(seconds * 1000));
}

export function getInitial(username) {
    return String(username || '?').replace(/^@/, '').slice(0, 1).toUpperCase() || '?';
}

export function getThreadTitle(thread) {
    return thread.title || thread.main?.text?.split(/\n/)[0]?.trim().replace(/를$/, '') || 'Threads archive';
}

export function sortRepliesByLikes(replies) {
    return [...replies].sort((a, b) => {
        const likeDiff = (b.likeCount || 0) - (a.likeCount || 0);
        if (likeDiff !== 0) {
            return likeDiff;
        }

        return (a.originalIndex || 0) - (b.originalIndex || 0);
    });
}

export function sortRepliesByOriginalOrder(replies) {
    return [...replies].sort((a, b) => (a.originalIndex || 0) - (b.originalIndex || 0));
}

function renderText(text, large = false) {
    const className = large ? 'post-text post-text-large' : 'post-text';
    const normalized = escapeHtml(text).replace(/\n{2,}/g, '\n').replace(/\n/g, '<br>');
    return `<p class="${className}">${normalized}</p>`;
}

function renderReply(reply, index, sortedReplies) {
    const likeRank = index + 1;
    const originalIndex = reply.originalIndex || likeRank;
    const likeCount = reply.likeCount || 0;
    const date = formatDate(reply.takenAt) || reply.relativeTime || '2일';

    return `            <article class="thread-post thread-post-reply" id="reply-${likeRank}" data-original-index="${originalIndex}" data-like-index="${likeRank}" data-like-count="${likeCount}">
                <div class="avatar" aria-hidden="true">${escapeHtml(getInitial(reply.username))}</div>
                <div class="post-main">
                    <div class="post-head">
                        <span class="username">${escapeHtml(reply.username)}</span>
                        <span class="dot">&middot;</span>
                        <span>${escapeHtml(date)}</span>
                        <a class="post-number" href="#reply-${likeRank}" aria-label="답글 ${likeRank}번">#${likeRank}</a>
                    </div>
                    ${renderText(reply.text)}
                    <div class="post-actions">
                        <span>좋아요 ${escapeHtml(formatNumber(likeCount) || '0')}</span>
                        <span>원래순 ${originalIndex}/${sortedReplies.length}</span>
                    </div>
                </div>
            </article>`;
}

function renderSortToggle() {
    return `        <div class="sort-dock" data-thread-sort-toggle data-default-sort="likes" aria-label="답글 정렬">
            <button type="button" data-sort-button="likes" aria-pressed="true">좋아요순</button>
            <button type="button" data-sort-button="original" aria-pressed="false">원래순</button>
        </div>`;
}

function renderSortScript() {
    return `    <script>
(() => {
    const list = document.querySelector('[data-thread-replies]');
    const dock = document.querySelector('[data-thread-sort-toggle]');
    if (!list || !dock) return;

    const posts = Array.from(list.querySelectorAll('.thread-post-reply'));
    const buttons = Array.from(dock.querySelectorAll('[data-sort-button]'));

    function applySort(mode) {
        const attr = mode === 'original' ? 'originalIndex' : 'likeIndex';
        posts
            .slice()
            .sort((a, b) => Number(a.dataset[attr]) - Number(b.dataset[attr]))
            .forEach((post, index) => {
                const number = post.querySelector('.post-number');
                if (number) number.textContent = '#' + (index + 1);
                list.appendChild(post);
            });

        dock.dataset.currentSort = mode;
        buttons.forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.sortButton === mode));
        });
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => applySort(button.dataset.sortButton));
    });

    applySort(dock.dataset.defaultSort || 'likes');
})();
    </script>`;
}

export function renderHomePage({ threads }) {
    const thread = threads[0];
    const title = getThreadTitle(thread);
    const replyCount = thread.replies.length;

    return `<!doctype html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>yesir.softdaddy-o.com</title>
    <meta name="description" content="네님 전용 이것저것 모은 페이지. 지금은 Threads 스크랩과 작은 링크들을 정리합니다.">
    <link rel="canonical" href="https://yesir.softdaddy-o.com/">
    <meta property="og:title" content="yesir.softdaddy-o.com">
    <meta property="og:description" content="네님 전용 이것저것 모은 페이지.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yesir.softdaddy-o.com/">
    <meta property="og:image" content="https://yesir.softdaddy-o.com/assets/poor-fish.png">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="home-page">
    <main class="home-shell">
        <header class="home-topbar">
            <a class="brand" href="/">yesir.</a>
            <nav class="home-nav" aria-label="Primary">
                <a href="threads/${escapeHtml(thread.slug)}/">Threads</a>
            </nav>
        </header>

        <section class="home-hero" aria-labelledby="page-title">
            <div>
                <p class="eyebrow">Personal index</p>
                <h1 id="page-title"><span>네님 전용</span><span>이것저것 모은</span><span>페이지</span></h1>
                <p class="lede">지금은 링크, 웃긴 스레드, 작은 스크랩을<br>여기에 모아둡니다.</p>
            </div>

            <div class="home-visual home-scrapbook" aria-label="yesir 스크랩북 미리보기">
                <div class="scrapbook-bar">
                    <span>yesir.</span>
                    <span>saved / threads</span>
                </div>
                <span class="scrap-sticker scrap-sticker-pink">saved!</span>
                <span class="scrap-sticker scrap-sticker-green">like sort</span>
                <div class="scrap-note scrap-note-main">
                    <small>Personal index</small>
                    <strong>네님 전용<br>이것저것 모은 페이지</strong>
                </div>
                <div class="scrap-note scrap-note-feed">
                    <b>Threads archive</b>
                    <p>답글은 길어도 화면은 가볍게.</p>
                    <span>${replyCount} replies</span>
                </div>
            </div>
        </section>

        <section class="index-section" aria-labelledby="saved-title">
            <div class="section-heading">
                <p class="eyebrow">Saved</p>
                <h2 id="saved-title">지금 있는 것</h2>
            </div>

            <div class="index-list" aria-label="Saved pages">
                <a class="index-card" href="threads/${escapeHtml(thread.slug)}/">
                    <span class="card-type">Threads archive</span>
                    <strong>${escapeHtml(title)}</strong>
                    <span>도하(@${escapeHtml(thread.author.username)})의 물고기 말장난 스레드. 로그인 세션으로 불러온 답글 ${replyCount}개를 Threads 피드처럼 정리했습니다.</span>
                </a>
            </div>
        </section>
    </main>
</body>
</html>
`;
}

export function renderThreadPage(thread) {
    const title = getThreadTitle(thread);
    const sortedReplies = sortRepliesByLikes(thread.replies);
    const screenshotCount = thread.capture?.screenshotCount || 0;
    const generatedAt = thread.capture?.generatedAt || '';
    const totalReplyCount = thread.replies.length;
    const stats = thread.stats || {};
    const main = thread.main;

    return `<!doctype html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} - yesir.softdaddy-o.com</title>
    <meta name="description" content="도하(@${escapeHtml(thread.author.username)})의 Threads 물고기 말장난 스레드와 답글 ${totalReplyCount}개를 정리한 페이지.">
    <link rel="canonical" href="https://yesir.softdaddy-o.com/threads/${escapeHtml(thread.slug)}/">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(main.text.replace(/\s+/g, ' ').trim())}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://yesir.softdaddy-o.com/threads/${escapeHtml(thread.slug)}/">
    <meta property="og:image" content="https://yesir.softdaddy-o.com/assets/poor-fish.png">
    <link rel="stylesheet" href="../../styles.css">
</head>
<body class="thread-page">
    <main class="thread-shell">
        <header class="thread-topbar">
            <a class="back-link" href="../../" aria-label="Back to index">&lsaquo;</a>
            <div>
                <p class="thread-kicker">Threads archive</p>
                <h1>${escapeHtml(title)}</h1>
            </div>
            <a class="open-original" href="${escapeHtml(thread.originalUrl || THREADS_POST_URL_PREFIX)}">원문</a>
        </header>

        <section class="thread-summary" aria-label="Archive summary">
            <p>로그인 세션으로 스크롤 캡쳐한 Threads 답글 ${totalReplyCount}개. 기본 정렬은 좋아요순입니다.</p>
            <dl>
                <div><dt>캡쳐</dt><dd>${screenshotCount}장</dd></div>
                <div><dt>본문</dt><dd>${totalReplyCount}개 답글</dd></div>
                <div><dt>기준일</dt><dd>${escapeHtml(generatedAt)}</dd></div>
            </dl>
        </section>

        <section class="thread-feed" aria-label="Threads post and replies">
            <article class="thread-post thread-post-root">
                <div class="avatar avatar-author" aria-hidden="true">${escapeHtml(getInitial(main.username))}</div>
                <div class="post-main">
                    <div class="post-head">
                        <a class="username" href="https://www.threads.com/@${escapeHtml(main.username)}">${escapeHtml(main.username)}</a>
                        <span class="dot">&middot;</span>
                        <span>${escapeHtml(formatDate(main.takenAt) || '3일')}</span>
                    </div>
                    ${renderText(main.text, true)}
                    <div class="post-actions" aria-label="Post stats">
                        <span>좋아요 ${escapeHtml(formatNumber(main.likeCount) || '0')}</span>
                        <span>답글 ${escapeHtml(stats.replyCount ?? '')}</span>
                        <span>리포스트 ${escapeHtml(stats.repostCount ?? '')}</span>
                        <span>공유 ${escapeHtml(stats.shareCount ?? '')}</span>
                    </div>
                </div>
            </article>

            <div class="thread-replies" data-thread-replies>
${sortedReplies.map((reply, index) => renderReply(reply, index, sortedReplies)).join('\n')}
            </div>
        </section>

        <p class="scrape-note">Threads가 일부 답글을 접어두는 구간이 있어 화면 캡쳐는 바닥까지 도달한 ${screenshotCount}장 기준, 텍스트 목록은 GraphQL 응답에서 로드된 답글 ${totalReplyCount}개 기준입니다.</p>
${renderSortToggle()}
    </main>
${renderSortScript()}
</body>
</html>
`;
}
