import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { GraphService } from '../../providers/graph.service';
import { GitService } from '../../providers/git.service';


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
        console.log(data);
        if (data.newData) {
          /* tslint:disable */
          const Regex = /^(.+?)(\s(B\[(.*?)\])? C\[(.+?)\] D\[(.+?)\] A\[(.+?)\] E\[(.+?)\] H\[(.+?)\] S\[(.+?)\])?$/mg;
          /* tslint:enable */
          var GraphArray = data.newData.split('\n');
          let Tmp;
          GraphArray.forEach(element => {
            console.log(element);
            console.log(Tmp);
            while ((Tmp = Regex.exec(element)) !== null) {
                if (Tmp.index === Regex.lastIndex) {
                    Regex.lastIndex++;
                }
                Tmp.forEach((match, groupIndex) => {
                    console.log(`Match, group ${groupIndex}: ${match}`);
                });
            }
          });
        }
      })
      .catch((data) => {
        if (data.newData) {
          console.log(data);
        } else {

        }
      });
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
