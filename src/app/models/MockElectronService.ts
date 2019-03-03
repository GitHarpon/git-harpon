import { Injectable } from '@angular/core';

@Injectable()
export class MockElectronService {

  constructor() { }

  browse() {
    const Path = '/new';
    return Path;
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
