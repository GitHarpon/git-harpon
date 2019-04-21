import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { GraphService } from '../../providers/graph.service';
import { GitService } from '../../providers/git.service';
import { MetaCommit } from '../../models/MetaCommit';
import { AnimationMetadataType } from '@angular/animations';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {
  themePrefSubscription: Subscription;
  graph: any;
  graphSubscription: Subscription;
  currentTheme: string;
  metaCommitCollection: Array<MetaCommit>;

  constructor(private themePrefService: ThemePreferencesService, private rightPanelService: RightPanelService,
    private graphService: GraphService, private gitService: GitService) { }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.graphSubscription = this.graphService.graphSubject.subscribe(
      (graph) => {
        this.graph = graph;
        this.setCommitGraph();
      }
    );
    this.graphService.setGraph();
  }

  openSendCommit() {
    this.rightPanelService.setView(false);
    return true;
  }

  setCommitGraph() {
    if (this.graph) {
        this.graphService.drawGraph();

        return true;
    }

    return false;
  }

  async getWellFormatedGraph() {
    return this.gitService.getWellFormatedTextGraph()
      .then((data) => {
        if (data.newData) {
          /* tslint:disable */
          const Regex = /^(.+?)(\s(B\[(.*?)\])? C\[(.+?)\] D\[(.+?)\] A\[(.+?)\] E\[(.+?)\] H\[(.+?)\] S\[(.+?)\])?$/mg;
          /* tslint:enable */
          let GraphArray = data.newData.split('\n');
          let Tmp;
          this.metaCommitCollection = new Array<MetaCommit>();
          GraphArray.forEach(element => {
            let Meta: MetaCommit;
            while ((Tmp = Regex.exec(element)) !== null) {
                if (Tmp.index === Regex.lastIndex) {
                    Regex.lastIndex++;
                }
                Tmp.forEach((match, groupIndex) => {
                    console.log(match);
                    if (groupIndex === 1) {
                      Meta.typeCommit = match;
                    } else if (groupIndex === 4) {
                        // TODO
                    } else if (groupIndex === 5) {
                      Meta.hash = match;
                    } else if (groupIndex === 6) {
                      Meta.date = match;
                    } else if (groupIndex === 7) {
                      Meta.dispName = match;
                    } else if (groupIndex === 8) {
                      Meta.mail = match;
                    } else if (groupIndex === 9) {
                      Meta.littlehash = match;
                    } else if (groupIndex === 10) {
                      Meta.commitMsg = match;
                    }
                });
                console.log(Meta);
                this.metaCommitCollection.push(Meta);
            }
          });
          console.log(this.metaCommitCollection);
        }
      })
      .catch((data) => {
        if (data.newData) {
          console.log(data);
        } else {

        }
      });

    /*
    return this.gitService.getWellFormatedTextGraph()
      .then((data) => {
        let GraphArray = data.newData.split('\n');
        const Regex = /^(.+?)(\s(B\[(.*?)\])? C\[(.+?)\] D\[(.+?)\] A\[(.+?)\] E\[(.+?)\] H\[(.+?)\] S\[(.+?)\])?$/mg;
        let Tmp;
        let Line = [];
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

            Line.push(TmpLine);
          }
        });
      });
      */
  }

  graphs() {

  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
    if (this.graphSubscription) {
      this.graphSubscription.unsubscribe();
    }
  }
}
