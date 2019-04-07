import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { GraphService } from '../../providers/graph.service';
import 'gitgraph.js';

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
    private graphService: GraphService) { }

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
      let MyTemplateConfig = {
        //colors: [ '#F00', '#0F0', '#00F' ], // branches colors, 1 per column
        branch: {
          lineWidth: 8,
          spacingX: 20
        },
        commit: {
          spacingY: -40,
          dot: {
            size: 10
          },
          message: {
            displayAuthor: false,
            displayBranch: false,
            displayHash: true,
            font: 'normal 12pt Arial'
          },
          shouldDisplayTooltipsInCompactMode: false
        }
      };
      let MyTemplate = new GitGraph.Template( MyTemplateConfig);
      let CommitGraph = new GitGraph({ template: MyTemplate, orientation: 'vertical-reverse' });

      CommitGraph.branch('master');

      console.log(this.graph);
      console.log(this.graph[0].hash);
      console.log(this.graph[0].hash.substr(0, 6));
      console.log(this.graph[1].hash);
      console.log(this.graph[1].hash.substr(0, 6));

      /*for (let Ind = 0; Ind < this.graph.length; Ind++) {
        CommitGraph.commit(
          {
            message: this.graph[Ind].message,
            sha1: this.graph[Ind].hash.substr(0, 6),
            author: this.graph[Ind].author_name
          }
        );
      }*/

      return true;
    }

    return false;
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
