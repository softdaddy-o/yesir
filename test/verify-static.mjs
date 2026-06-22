import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const checks = [
    {
        path: 'index.html',
        includes: [
            '<title>yes.softdaddy-o.com</title>',
            'threads/doha-poor-fish/'
        ]
    },
    {
        path: 'threads/doha-poor-fish/index.html',
        includes: [
            '<title>가난한 물고기 - yes.softdaddy-o.com</title>',
            '가난한 물고기를',
            '푸어 라고 한다',
            'https://www.threads.com/@doha_txt/post/DZusRTzgQmh'
        ]
    },
    {
        path: 'CNAME',
        exact: 'yes.softdaddy-o.com\n'
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

    for (const expected of check.includes ?? []) {
        if (!content.includes(expected)) {
            throw new Error(`${check.path} does not include ${JSON.stringify(expected)}`);
        }
    }
}

console.log('static page checks passed');
