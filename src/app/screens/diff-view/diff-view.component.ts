import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';
import { RightPanelService } from '../../providers/right-panel.service';

@Component({
  selector: 'app-diff-view',
  templateUrl: './diff-view.component.html',
  styleUrls: ['./diff-view.component.scss']
})
export class DiffViewComponent implements OnInit, OnDestroy {
  themePrefSubscription: Subscription;
  currentTheme: string;

  constructor(private themePrefService: ThemePreferencesService, private rightPanelService: RightPanelService) { }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  closeDiffView() {
    this.rightPanelService.setDiffViewVisible(false);
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
  }

}
