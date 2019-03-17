import { Component, OnInit, OnDestroy, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';
import { GitService } from '../../providers/git.service';
import { LeftPanelService } from '../../providers/left-panel.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { TranslateService } from '@ngx-translate/core';
import { LanguagePreferencesService } from '../../providers/language-preferences.service';
import { NewBranchCouple } from '../../models/NewBranchCouple';
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
  currentNewBranchCouple: NewBranchCouple;
  @Output()
  newBranchCoupleChange = new  EventEmitter<NewBranchCouple>();
  remoteBranches: any;
  remoteBranchesSubscription: Subscription;
  currentBranch: any;
  branchNameSubscription: Subscription;

  @ViewChild('branchCM') branchCM: ContextMenuComponent;
  objectKeys = Object.keys;
  loadingVisible: Boolean;
  loadingVisibleSubscription: Subscription;
  @Output() checkoutInfoBarChange = new EventEmitter<any>();

  constructor(private themePrefService: ThemePreferencesService, private gitService: GitService,
    private leftPanelService: LeftPanelService, private translate: TranslateService,
    private langPrefService: LanguagePreferencesService, private toastr: ToastrService) {

  }

  @Input()
  get newBranchCouple() {
    return this.currentNewBranchCouple;
  }

  set newBranchCouple(couple) {
    this.currentNewBranchCouple = couple;
    this.newBranchCoupleChange.emit(this.currentNewBranchCouple);
  }

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

    this.loadingVisibleSubscription = this.leftPanelService.loadingVisibleSubject.subscribe(
      (loadingVisible: any) => {
        this.loadingVisible = loadingVisible;
      }
    );

    this.leftPanelService.setLocalBranches();
    this.leftPanelService.setRemoteBranches();
    this.leftPanelService.setLoadingVisible(this.loadingVisible);
  }

  async checkoutLocalBranch(localBranch) {
    if (localBranch !== this.currentBranch) {
      this.loadingVisible = true;
      return this.gitService.checkoutLocalBranch(localBranch).then((result) => {
        this.toastr.info(result.message, result.title, {
          onActivateTick: true
        });

        this.loadingVisible = false;
        this.leftPanelService.setLocalBranches();
        this.leftPanelService.setRemoteBranches();
      }).catch((result) => {
        this.loadingVisible = false;
        this.toastr.error(result.message, result.title, {
          onActivateTick: true
        });
      });
    }
  }

  checkoutRemoteBranch(remoteBranch) {
    this.loadingVisible = true;
    const IsInLocal = this.localBranches.includes(remoteBranch.split('/')[1]);
    return this.gitService.checkoutRemoteBranch(remoteBranch, this.currentBranch, IsInLocal).then((result) => {
      this.toastr.info(result.message, result.title, {
        onActivateTick: true
      });
      this.loadingVisible = false;
      this.leftPanelService.setLocalBranches();
      this.leftPanelService.setRemoteBranches();
    }).catch((result) => {
      if (!result.newData) {
        this.loadingVisible = false;
        this.toastr.error(result.message, result.title, {
          onActivateTick: true
        });
      } else {
        this.checkoutInfoBarChange.emit(remoteBranch);
      }
    });
  }

  renameBranch(branch: string) {
    var TmpNewBr = new NewBranchCouple();
    TmpNewBr.oldBranch = branch;
    this.newBranchCouple = TmpNewBr;
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
    if (this.loadingVisibleSubscription) {
      this.loadingVisibleSubscription.unsubscribe();
    }
  }
}
