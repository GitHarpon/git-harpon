import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MockGraphService {
    graph: any;
    graphSubject: Subject<any>;

    constructor() {
        this.graphSubject = new Subject<any>();
    }

    setGraph() {
        this.graphSubject.next('graph');
    }
}
