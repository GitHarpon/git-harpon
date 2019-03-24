import { Injectable } from '@angular/core';
import { MockPath } from './MockPath';

@Injectable()
export class MockElectronService {
  path: MockPath;

  constructor() {
    this.path = new MockPath();
  }

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

  shellOpenExternal(link: string): boolean {
    return true;
  }
}
