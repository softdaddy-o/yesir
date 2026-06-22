import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const checks = [
    {
        path: 'index.html',
        includes: [
            '<title>yesir.softdaddy-o.com</title>',
            '네님 전용 이것저것 모은 페이지',
            'threads/doha-poor-fish/'
        ]
    },
    {
        path: 'threads/doha-poor-fish/index.html',
        includes: [
            '<title>가난한 물고기 - yesir.softdaddy-o.com</title>',
            'Threads 스타일로 정리한 공개 스레드',
            '가난한 물고기를',
            '푸어 라고 한다',
            '햄버거처럼 생긴 물고기를 우린 벅어라고 한다.',
            '심심한 물고기를',
            '병든물고기를 병어라한다',
            '잘한다 잘한다',
            'https://www.threads.com/@doha_txt/post/DZusRTzgQmh'
        ]
    },
    {
        path: 'CNAME',
        trimmed: 'yesir.softdaddy-o.com'
    },
    {
        path: '.nojekyll',
        existsOnly: true
    },
    {
        path: 'assets/poor-fish.png',
        existsOnly: true
    }
];

for (const check of checks) {
    if (!existsSync(check.path)) {
        throw new Error(`${check.path} is missing`);
    }

    if (check.existsOnly) {
        continue;
    }

    const content = await readFile(check.path, 'utf8');

    if (check.exact !== undefined && content !== check.exact) {
        throw new Error(`${check.path} content mismatch`);
    }

    if (check.trimmed !== undefined && content.trim() !== check.trimmed) {
        throw new Error(`${check.path} trimmed content mismatch`);
    }

    for (const expected of check.includes ?? []) {
        if (!content.includes(expected)) {
            throw new Error(`${check.path} does not include ${JSON.stringify(expected)}`);
        }
    }
}

console.log('static page checks passed');
