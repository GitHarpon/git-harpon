import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MockGraphService {
  graph: any;
  graphSubject: Subject<any>;
  drawingGraph: boolean;
  drawingGraphSubject: Subject<boolean>;
  graphLoadingSubject: Subject<any>;

  constructor() {
    this.graphSubject = new Subject<any>();
    this.drawingGraphSubject = new Subject<any>();
    this.graphLoadingSubject = new Subject<any>();
  }

  setGraphLoading(graphLoading) {
    this.graphLoadingSubject.next(graphLoading);
  }

  emitGraph(graph) {
    this.graphSubject.next(graph);
  }

  setGraph() {
    return true;
  }
}
