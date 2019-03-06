import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {
  themePrefSubscription: Subscription;
  currentTheme: string;
  commitHash: string;

  constructor(private themePrefService: ThemePreferencesService, private rightPanelService: RightPanelService,) { }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  openViewCommit() {
    this.rightPanelService.setCommitHash(this.commitHash);
    this.rightPanelService.setView(true);
  }

  openSendCommit() {
    this.rightPanelService.setView(false);
  }

  ngOnDestroy() {
    this.themePrefSubscription.unsubscribe();
  }
}
