import { Injectable } from '@angular/core';

@Injectable()
export class MockElectronService {

  constructor() { }

  browse() {
    const CHEMIN = '/new';
    return CHEMIN;
  }

  pathJoin(...paths: string[]): string {
    return paths.join('').toString();
  }

  fsExistsSync(pathToCheck: string): boolean {
    return pathToCheck === 'path';
  }

  ShellOpenExternal(link: string): boolean {
    return true;
  }
}
