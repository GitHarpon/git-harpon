import { Injectable } from '@angular/core';

@Injectable()
export class MockElectronService {
  constructor() { }

  browse() {
    const CHEMIN = '/new';
    return CHEMIN;
  }
}
