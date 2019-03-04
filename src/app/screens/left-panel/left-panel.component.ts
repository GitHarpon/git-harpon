import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';
import { GitService } from '../../providers/git.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit, OnDestroy {
  themePrefSubscription: Subscription;
  currentTheme: string;
  localBranches: any;
  remoteBranches: any;

  constructor(private themePrefService: ThemePreferencesService, private gitService: GitService) { }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.gitService.getLocalBranches().then((localBranches) => {
      this.localBranches = localBranches;
    });

    this.gitService.getRemoteBranches().then((remoteBranches) => {
      this.remoteBranches = remoteBranches;
    });
  }

  ngOnDestroy() {
    this.themePrefSubscription.unsubscribe();
  }
}
