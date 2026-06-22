import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const checks = [
    {
        path: 'index.html',
        includes: [
            '<title>yesir.softdaddy-o.com</title>',
            '네님 전용',
            '이것저것 모은',
            'threads/doha-poor-fish/',
            '답글 405개'
        ]
    },
    {
        path: 'threads/doha-poor-fish/index.html',
        includes: [
            '<title>가난한 물고기 - yesir.softdaddy-o.com</title>',
            'Threads archive',
            '가난한 물고기를',
            '푸어 라고 한다',
            '로그인 세션으로 스크롤 캡쳐한 Threads 답글 405개',
            '캡쳐</dt><dd>162장</dd>',
            '살이 없는 물고기를',
            '여기서 배운거 어디에',
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
