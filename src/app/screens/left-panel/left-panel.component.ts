import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';
import { GitService } from '../../providers/git.service';
import { LeftPanelService } from '../../providers/left-panel.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit, OnDestroy {
  currentTheme: string;
  themePrefSubscription: Subscription;
  localBranches: any;
  localBranchesSubscription: Subscription;
  remoteBranches: any;
  branchName: any;
  branchNameSubscription: Subscription;

  constructor(private themePrefService: ThemePreferencesService, private gitService: GitService,
    private leftPanelService: LeftPanelService) { }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.branchNameSubscription = this.gitService.branchNameSubject.subscribe(
      (branchName: any) => {
        this.branchName = branchName;
      });
    this.gitService.emitBranchNameSubject();

    this.localBranchesSubscription = this.leftPanelService.localBranchesSubject.subscribe(
      (localBranches: any) => {
        this.localBranches = localBranches;
      });

    this.gitService.getLocalBranches().then((localBranches) => {
      this.localBranches = localBranches;
      this.leftPanelService.setLocalBranches(localBranches);
    });

    this.gitService.getRemoteBranches().then((remoteBranches) => {
      this.remoteBranches = remoteBranches;
    });
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
    if (this.localBranchesSubscription) {
      this.localBranchesSubscription.unsubscribe();
    }
    if (this.branchNameSubscription) {
      this.branchNameSubscription.unsubscribe();
    }
  }
}
