import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { GraphService } from '../../providers/graph.service';
import { GitService } from '../../providers/git.service';
import { MetaCommit } from '../../models/MetaCommit';

declare function testdrawing(): any;

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
  graphLines: Array<any>;
  drawingGraph: boolean;
  loadingVisible = true;
  drawingGraphSubscription: Subscription;

  constructor(private themePrefService: ThemePreferencesService, private rightPanelService: RightPanelService,
    private graphService: GraphService, private gitService: GitService) { }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.drawingGraphSubscription = this.graphService.drawingGraphSubject.subscribe(
      (drawingGraph: boolean) => {
        this.drawingGraph = drawingGraph;
      }
    );

    this.graphSubscription = this.graphService.graphSubject.subscribe(
      (graph) => {
        this.graph = graph;
        this.setCommitGraph();
      }
    );
    this.graphService.setGraph(true);
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

  drawingit() {
    if (this.drawingGraph) {
      this.drawingGraph = false;
      testdrawing();
      setTimeout(() => {this.loadingVisible = false; }, 0);
    }
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
