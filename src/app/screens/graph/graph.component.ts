import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { GraphService } from '../../providers/graph.service';

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
  graphLines: Array<any>;
  drawingGraph: boolean;
  graphLoading: boolean;
  drawingGraphSubscription: Subscription;
  graphLoadingSubscription: Subscription;

  constructor(private themePrefService: ThemePreferencesService, private rightPanelService: RightPanelService,
    private graphService: GraphService) { }

  ngOnInit() {
    this.graphLoading = true;

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
    this.graphService.emitDrawingGraph(this.drawingGraph);

    this.graphSubscription = this.graphService.graphSubject.subscribe(
      (graph: any) => {
        this.graph = graph;
      }
    );
    this.graphService.emitGraph(this.graph);

    this.graphService.setGraph();
  }

  openSendCommit() {
    this.rightPanelService.setView(false);
    return true;
  }

  drawTheGraph() {
    this.graphService.drawTheGraph(this.drawingGraph);

    const Empty = '';
    return Empty;
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
    if (this.graphLoadingSubscription) {
      this.graphLoadingSubscription.unsubscribe();
    }
    if (this.graphSubscription) {
      this.graphSubscription.unsubscribe();
    }
    if (this.drawingGraphSubscription) {
      this.drawingGraphSubscription.unsubscribe();
    }
  }
}
