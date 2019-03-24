import { Injectable } from '@angular/core';

@Injectable()
export class MockPath {

    constructor() { }

    join(path: string, fileName: string): string {
        return fileName;
    }
}
