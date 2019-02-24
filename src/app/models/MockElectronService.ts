import { Injectable } from '@angular/core';

@Injectable()
export class MockElectronService {

  constructor() { }

  browse() {
    const Path = 'path';
    return Path;
  }

  pathJoin(...paths: string[]) {
    return paths.join('').toString();
  }
}
