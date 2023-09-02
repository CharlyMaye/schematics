import { join, parse } from 'node:path';
import {
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    statSync,
    writeFileSync,
} from 'node:fs';
import { Tree } from '@angular-devkit/schematics';

export function createFiles(
    tree: Tree,
    testPath: string,
    outputType: 'master' | 'result' = 'result'
) {
    //  Génération de fichier
    tree.visit((path, entry) => {
        const pathToGenerate = join(testPath, outputType, path);
        try {
            if (!existsSync(parse(pathToGenerate).dir)) {
                mkdirSync(parse(pathToGenerate).dir, { recursive: true });
            }
            writeFileSync(pathToGenerate, entry!.content.toString(), {
                encoding: 'utf8',
            });
        } catch (error) {
            console.error(error);
        }
    });
}

// Recursive function to get files
function getFiles(dir: string, files: string[] = []) {
    const fileList = readdirSync(dir, { encoding: 'utf8' });
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        if (statSync(name).isDirectory()) {
            getFiles(name, files);
        } else {
            files.push(name);
        }
    }
    return files;
}

export function readFiles(
    testPath: string,
    inputType: 'master' | 'result' = 'result'
) {
    const pathToRead = join(testPath, inputType);
    const files = getFiles(pathToRead);
    return files.map((file) => ({
        path: file.replace(pathToRead, ''),
        content: readFileSync(file),
    }));
}
