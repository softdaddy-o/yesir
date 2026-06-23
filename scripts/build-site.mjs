import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderCollectionPage, renderHomePage, renderThreadPage } from '../src/thread-template.mjs';

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

const threads = await readThreadData();
if (threads.length === 0) {
    throw new Error(`No thread data found in ${THREAD_DATA_DIR}`);
}

const playground = JSON.parse(await readFile(PLAYGROUND_DATA_PATH, 'utf8'));

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
