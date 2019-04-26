import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { GitService } from './git.service';

declare function drawGitCommitGraph(): any;

@Injectable()
export class GraphService {
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

  async setGraph() {
    console.log('drawing');
    this.setGraphLoading(true);
    return this.gitService.getWellFormatedTextGraph()
      .then((data) => {
        this.graph = [];
        this.emitGraph(this.graph);
        let GraphArray = data.newData.split('\n');
        const Regex = /^(.+?)(\s(B\[(.*?)\])? C\[(.+?)\] D\[(.+?)\] A\[(.+?)\] E\[(.+?)\] H\[(.+?)\] S\[(.+?)\])?$/mg;
        let Tmp;
        let Lines = [];
        GraphArray.forEach(element => {
          while ((Tmp = Regex.exec(element)) !== null) {
            if (Tmp.index === Regex.lastIndex) {
              Regex.lastIndex++;
            }

            let TmpLine = [];
            Tmp.forEach((match, groupIndex) => {
              if (groupIndex === 1) {
                TmpLine['relation'] = match;
              } else if (groupIndex === 4) {
                TmpLine['branch'] = match;
              } else if (groupIndex === 5) {
                TmpLine['rev'] = match;
              } else if (groupIndex === 6) {
                TmpLine['date'] = match;
              } else if (groupIndex === 7) {
                TmpLine['author'] = match;
              } else if (groupIndex === 8) {
                TmpLine['author_email'] = match;
              } else if (groupIndex === 9) {
                TmpLine['short_rev'] = match;
              } else if (groupIndex === 10) {
                TmpLine['subject'] = match;
              }
            });

            Lines.push(TmpLine);
          }
        });
        this.graph = Lines;
        this.emitGraph(this.graph);
        this.emitDrawingGraph(true);
        this.gitService.emitNeedToDrawGraph(false);
      });
  }

  drawTheGraph(drawingGraph) {
    if (drawingGraph) {
      this.emitDrawingGraph(false);
        setTimeout(() => {
          let GraphCanvas: any = document.getElementById('graph-canvas');
          let Context = GraphCanvas.getContext('2d');
          Context.clearRect(0, 0, GraphCanvas.width, GraphCanvas.height);
          drawGitCommitGraph();
          this.setGraphLoading(false);
        }, 0);
    }
  }
}
