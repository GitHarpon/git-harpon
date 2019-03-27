import { Component, OnInit, OnDestroy } from '@angular/core';
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
  graph: string;
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
      }
    );
    this.graphService.setGraph();
  }


  openSendCommit() {
    this.rightPanelService.setView(false);
    return true;
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
