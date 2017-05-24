import fs from 'fs';
import path from 'path';
import { transform } from 'babel-core';
import camelCase from 'lodash.camelcase';

import plugin from '../';

const fixturesPath = path.resolve(__dirname, './fixtures/');
const fixtures = fs.readdirSync(fixturesPath, 'utf8').reduce((p, file) => {
    const data = fs.readFileSync(path.resolve(fixturesPath, file), 'utf8');
    return Object.assign(p, {
        [camelCase(path.basename(file, '.js'))]: data
    })
}, {});

describe('css-tag-literal', () => {
    test('transforms css tag literals into JS objects', () => {
        const compiledOutput = transform(fixtures.example, {
            plugins: [plugin]
        });

        expect(compiledOutput.code).toMatchSnapshot();
    });

    test('media-queries', () => {
        const compiledOutput = transform(fixtures.mediaQueries, {
            plugins: [plugin]
        });

        expect(compiledOutput.code).toMatchSnapshot();
    });
});
