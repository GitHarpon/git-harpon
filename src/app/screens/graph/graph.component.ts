import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
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
  graphLoading = true;
  drawingGraphSubscription: Subscription;
  graphLoadingSubscription: Subscription;

  constructor(private themePrefService: ThemePreferencesService, private rightPanelService: RightPanelService,
    private graphService: GraphService) { }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.graphLoadingSubscription = this.graphService.graphLoadingSubject.subscribe(
      (graphLoading: boolean) => {
        this.graphLoading = graphLoading;
      }
    );
    this.graphService.setGraphLoading(this.graphLoading);

    this.drawingGraphSubscription = this.graphService.drawingGraphSubject.subscribe(
      (drawingGraph: boolean) => {
        this.drawingGraph = drawingGraph;
      }
    );

    this.graphSubscription = this.graphService.graphSubject.subscribe(
      (graph: any) => {
        this.graph = graph;
      }
    );
    this.graphService.setGraph();
  }

  openSendCommit() {
    this.rightPanelService.setView(false);
    return true;
  }

  drawingit() {
    if (this.drawingGraph) {
      this.drawingGraph = false;
      setTimeout(() => {
        let GraphCanvas: any = document.getElementById('graph-canvas');
        let Context = GraphCanvas.getContext('2d');
        Context.clearRect(0, 0, GraphCanvas.width, GraphCanvas.height);
        testdrawing();
        this.graphLoading = false;
      }, 0);
    }
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
    if (this.graphSubscription) {
      this.graphSubscription.unsubscribe();
    }
    if (this.drawingGraphSubscription) {
      this.drawingGraphSubscription.unsubscribe();
    }
  }
}
