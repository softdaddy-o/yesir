import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderCollectionPage, renderHomePage, renderThreadPage, setStylesheetVersion } from '../src/thread-template.mjs';

const THREAD_DATA_DIR = 'data/threads';
const PLAYGROUND_DATA_PATH = 'data/playground.json';

async function readThreadData() {
    const files = (await readdir(THREAD_DATA_DIR))
        .filter(file => file.endsWith('.json'))
        .sort();

    const threads = [];
    for (const file of files) {
        const fullPath = path.join(THREAD_DATA_DIR, file);
        threads.push(JSON.parse(await readFile(fullPath, 'utf8')));
    }

    return threads;
}

// Newest addition first; items added on the same day go by the first post's likes.
// Also collects the newest items across all rooms for the home page scrapbook.
function sortItemsNewestFirst(playground, threads) {
    const likesBySlug = new Map(threads.map(thread => [thread.slug, thread.main?.likeCount || 0]));
    const likesOf = item => likesBySlug.get((item.internalUrl || '').split('/').filter(Boolean).pop()) || 0;
    const newestFirst = (a, b) => b.addedAt.localeCompare(a.addedAt) || likesOf(b) - likesOf(a);

    for (const category of playground.categories || []) {
        for (const item of category.items) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(item.addedAt || '')) {
                throw new Error(`Playground item is missing addedAt: ${item.title}`);
            }
        }
        category.items.sort(newestFirst);
    }

    playground.recent = (playground.categories || [])
        .flatMap(category => category.items.map(item => ({ ...item, room: { label: category.label, slug: category.slug } })))
        .sort(newestFirst)
        .slice(0, 4)
        .map(item => ({ title: item.title, room: item.room, href: item.internalUrl ? item.internalUrl.replace(/^(\.\.\/)+/, '') : item.url }));
}

const threads = await readThreadData();
if (threads.length === 0) {
    throw new Error(`No thread data found in ${THREAD_DATA_DIR}`);
}

const playground = JSON.parse(await readFile(PLAYGROUND_DATA_PATH, 'utf8'));
sortItemsNewestFirst(playground, threads);
setStylesheetVersion(createHash('sha256').update(await readFile('styles.css')).digest('hex').slice(0, 8));

await writeFile('index.html', renderHomePage({ threads, playground }), 'utf8');

for (const category of playground.categories || []) {
    if (!category.slug) {
        throw new Error('Playground category is missing slug');
    }

    const outDir = path.join('play', category.slug);
    await mkdir(outDir, { recursive: true });
    await writeFile(
        path.join(outDir, 'index.html'),
        renderCollectionPage({ category, categories: playground.categories || [] }),
        'utf8',
    );
}

for (const thread of threads) {
    if (!thread.slug) {
        throw new Error('Thread data is missing slug');
    }

    const outDir = path.join('threads', thread.slug);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), renderThreadPage(thread), 'utf8');
}

console.log(`built ${threads.length} thread page(s) and ${(playground.categories || []).length} playground page(s)`);
