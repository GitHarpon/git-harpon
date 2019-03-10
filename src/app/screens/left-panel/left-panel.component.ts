import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';
import { GitService } from '../../providers/git.service';
import { LeftPanelService } from '../../providers/left-panel.service';
import { ToastrService } from 'ngx-toastr';

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
  @Output() checkoutInfoBarChange = new EventEmitter<any>();

  constructor(private themePrefService: ThemePreferencesService, private gitService: GitService,
    private leftPanelService: LeftPanelService, private toastr: ToastrService) { }

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

    this.leftPanelService.setLocalBranches();
    this.leftPanelService.setRemoteBranches();
  }

  checkoutLocalBranch(localBranch) {
    console.log(localBranch);
    if (localBranch !== this.currentBranch) {
      this.gitService.checkoutLocalBranch(localBranch).then((result) => {
        this.toastr.info(result.message, result.title, {
          onActivateTick: true
        });

        this.leftPanelService.setLocalBranches();
        this.leftPanelService.setRemoteBranches();
      }).catch((result) => {
        this.toastr.error(result.message, result.title, {
          onActivateTick: true
        });
      });
    }
  }

  checkoutRemoteBranch(remoteBranch) {
    const IsInLocal = this.localBranches.includes(remoteBranch.split('/')[1]);
    this.gitService.checkoutRemoteBranch(remoteBranch, this.currentBranch, IsInLocal).then((result) => {
      this.toastr.info(result.message, result.title, {
        onActivateTick: true
      });
      this.leftPanelService.setLocalBranches();
      this.leftPanelService.setRemoteBranches();
    }).catch((result) => {
      if (!result.newData) {
        this.toastr.error(result.message, result.title, {
          onActivateTick: true
        });
      } else {
        this.checkoutInfoBarChange.emit(remoteBranch);
      }
    });
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
