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
        const CommitGraph = [
            {
              hash: '9cdc1af73a6800632a32c31ba299bd9f4a2d71b9',
              date: '2019-04-07 13:52:32 +0200',
              message: 'first commit',
              author_name: 'toto',
              author_email: 'toto@gmail.com'
            },
            {
              hash: 'aaf6c3dc90ec8bc02ebb7d23e85331b2118d5850',
              date: '2019-04-07 15:52:32 +0200',
              message: 'second commit',
              author_name: 'tata',
              author_email: 'tata@gmail.com'
            }
          ];
        this.graphSubject.next(CommitGraph);
    }

    drawGraph() {
        return true;
    }
}
