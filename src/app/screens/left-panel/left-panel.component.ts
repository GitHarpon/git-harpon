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
  remoteBranchesSubscription: Subscription;
  currentBranch: any;
  branchNameSubscription: Subscription;
  objectKeys = Object.keys;

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
      (currentBranch: any) => {
        this.currentBranch = currentBranch;
      });
    this.gitService.emitBranchNameSubject();

    this.localBranchesSubscription = this.leftPanelService.localBranchesSubject.subscribe(
      (localBranches: any) => {
        this.localBranches = localBranches;
      });

    this.remoteBranchesSubscription = this.leftPanelService.remoteBranchesSubject.subscribe(
      (remoteBranches: any) => {
        this.remoteBranches = remoteBranches;
      });

    this.gitService.getLocalBranches().then((localBranches) => {
      this.leftPanelService.setLocalBranches(localBranches);
    });

    this.gitService.getRemoteBranches().then((remoteBranches) => {
      this.leftPanelService.setRemoteBranches(remoteBranches);
    });
  }

  checkoutLocalBranch(localBranch) {
    console.log(localBranch);
  }

  checkoutRemoteBranch(remoteBranch) {
    console.log(remoteBranch);
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
    if (this.localBranchesSubscription) {
      this.localBranchesSubscription.unsubscribe();
    }
    if (this.remoteBranchesSubscription) {
      this.remoteBranchesSubscription.unsubscribe();
    }
    if (this.branchNameSubscription) {
      this.branchNameSubscription.unsubscribe();
    }
  }
}
