import { join } from 'node:path';

import { Tree } from '@angular-devkit/schematics';

import {
    SchematicTestRunner,
    UnitTestTree,
} from '@angular-devkit/schematics/testing';

const collectionPath = join(__dirname, '../collection.json');

interface schematicSchema {
    type: string;
    options: { [key: string]: unknown };
    children: schematicSchema[];
}

function engine(collectionName: string, path: string) {
    const runner = new SchematicTestRunner(collectionName, path);
    let tree = Tree.empty();
    let testTree: UnitTestTree;

    const execute = async (scheme: schematicSchema) => {
        testTree = await runner.runSchematic(scheme.type, scheme.options, tree);
        if (scheme.children.length > 0) {
            for (let index = 0; index < scheme.children.length; index++) {
                const element = scheme.children[index];
                testTree = await execute(element);
            }
        }
        return testTree;
    };
    return execute;
}

//  Générer les fichiers

describe('schematics', () => {
    it('works', async () => {
        const base = await import('./files/test/work_1/base.json');
        const tree = await engine('schematics', collectionPath)(base);

        expect(tree.files.length).toEqual(21);
    });
});
