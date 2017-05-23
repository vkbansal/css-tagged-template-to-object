import fs from 'fs';
import path from 'path';
import { transform } from 'babel-core';
import plugin from '../';

const fixture = fs.readFileSync(path.resolve(__dirname, './fixtures/example.js'), 'utf8');

describe('css-tag-literal', () => {
    test('transforms css tag literals into JS objects', () => {
        const compiledOutput = transform(fixture, {
            plugins: [plugin]
        });

        expect(compiledOutput.code).toMatchSnapshot();
    });
});
