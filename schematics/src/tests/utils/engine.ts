import { Tree } from '@angular-devkit/schematics';

import {
    SchematicTestRunner,
    UnitTestTree,
} from '@angular-devkit/schematics/testing';

import { SchematicSchema } from './schematic.schema';

export function engine(collectionName: string, path: string) {
    const runner = new SchematicTestRunner(collectionName, path);
    let tree = Tree.empty();
    let testTree: UnitTestTree;

    const execute = async (scheme: SchematicSchema) => {
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
