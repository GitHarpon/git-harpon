import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GitService } from './git.service';
import 'gitgraph.js';

@Injectable()
export class GraphService {
  graph: any;
  graphSubject: Subject<any>;
  drawingGraph: boolean;
  drawingGraphSubject: Subject<boolean>;

  constructor(private gitService: GitService) {
      this.graphSubject = new Subject<any>();
      this.drawingGraphSubject = new Subject<any>();
  }

  async setGraph(doNothing?: boolean) {
    return this.gitService.getWellFormatedTextGraph()
      .then((data) => {
        this.graph = [];
        this.graphSubject.next(this.graph);
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
        this.drawingGraph = true;
        this.graphSubject.next(this.graph);
        this.drawingGraphSubject.next(this.drawingGraph);
      });
  }
}
