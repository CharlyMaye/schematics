import { join } from 'node:path';
import { engine } from './utils/engine';
import { createFiles, readFiles } from './utils/master';

const collectionPath = join(__dirname, '../collection.json');

describe('schematics', () => {
    it('works', async () => {
        const testPath = join(__dirname, './files/test/work_1');
        const base = await import(join(testPath, 'base.json'));
        const tree = await engine('schematics', collectionPath)(base);

        createFiles(tree, testPath, 'result');
        const masters = readFiles(testPath, 'master');
        const result = readFiles(testPath, 'result');
        expect(masters.length).toEqual(result.length);
    });
});
