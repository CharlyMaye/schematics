import { join } from 'node:path';
import { engine } from './utils/engine';

const collectionPath = join(__dirname, '../collection.json');

describe('schematics', () => {
    it('works', async () => {
        const base = await import('./files/test/work_1/base.json');
        const tree = await engine('schematics', collectionPath)(base);
        expect(tree.files.length).toEqual(21);
    });
});
