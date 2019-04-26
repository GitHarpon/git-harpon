import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { GitService } from '../providers/git.service';

@Injectable()
export class MockGraphService {
  graph: any;
  graphSubject: Subject<any>;
  drawingGraph: boolean;
  drawingGraphSubject: Subject<boolean>;
  graphLoadingSubject: Subject<any>;
  needToDrawGraph: boolean;
  needToDrawGraphSubscription: Subscription;

  constructor(private gitService: GitService) {
    this.graphSubject = new Subject<any>();
    this.drawingGraphSubject = new Subject<any>();
    this.graphLoadingSubject = new Subject<any>();

    this.needToDrawGraphSubscription = this.gitService.needToDrawGraphSubject.subscribe(
      (needToDrawGraph: boolean) => {
        this.needToDrawGraph = needToDrawGraph;
        if (this.needToDrawGraph) {
          this.setGraph();
        }
      }
    );
    this.gitService.emitNeedToDrawGraph(this.needToDrawGraph);
  }

  setGraphLoading(graphLoading) {
    this.graphLoadingSubject.next(graphLoading);
  }

  emitGraph(graph) {
    this.graphSubject.next(graph);
  }

  emitDrawingGraph(drawingGraph) {
    this.drawingGraphSubject.next(drawingGraph);
  }

  setGraph() {
    return true;
  }

  drawTheGraph(drawingGraph) {
    if (drawingGraph) {
      return true;
    }

    return false;
  }
}
