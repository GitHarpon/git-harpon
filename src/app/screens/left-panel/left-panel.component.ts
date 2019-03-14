import { Component, OnInit, OnDestroy, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';
import { GitService } from '../../providers/git.service';
import { LeftPanelService } from '../../providers/left-panel.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { TranslateService } from '@ngx-translate/core';
import { LanguagePreferencesService } from '../../providers/language-preferences.service';
import { NewBranchCouple } from '../../models/NewBranchCouple';

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
  newBranchCoupleChange: EventEmitter<NewBranchCouple>;
  remoteBranches: any;
  currentBranch: any;
  branchNameSubscription: Subscription;
  @ViewChild('branchCM') branchCM: ContextMenuComponent;


  constructor(private themePrefService: ThemePreferencesService, private gitService: GitService,
    private leftPanelService: LeftPanelService, private translate: TranslateService,
    private langPrefService: LanguagePreferencesService) {

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

    this.gitService.getLocalBranches().then((localBranches) => {
      this.localBranches = localBranches;
      this.leftPanelService.setLocalBranches(localBranches);
    });

    this.gitService.getRemoteBranches().then((remoteBranches) => {
      this.remoteBranches = remoteBranches;
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
    if (this.branchNameSubscription) {
      this.branchNameSubscription.unsubscribe();
    }
  }
}
