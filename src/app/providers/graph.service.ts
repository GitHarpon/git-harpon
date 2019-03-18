import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GitService } from './git.service';

@Injectable()
export class GraphService {
    graph: any;
    graphSubject: Subject<any>;

    constructor(private gitService: GitService) {
        this.graphSubject = new Subject<any>();
    }

    setGraph() {
        this.gitService.getGraph().then((graph) => {
            this.graph = graph.replace(/\n/g, '<br />');
            this.graphSubject.next(this.graph);
        });
    }
}
