import { Component, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GitService } from '../../providers/git.service';
import { ElectronService } from '../../providers/electron.service';
import { Subscription, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as GitUrlParse from 'git-url-parse';
import { TerminalManagerService } from '../../providers/terminal-manager.service';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { HttpsUser } from '../../models/HttpsUser';
import { LeftPanelService } from '../../providers/left-panel.service';
import { NewBranchCouple } from '../../models/NewBranchCouple';
import { RightPanelService } from '../../providers/right-panel.service';
import { GraphService } from '../../providers/graph.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  projectModalTabSelectedIndex: any;
  projectModalVisible: Boolean;
  currentUrl: String;
  cloneUrl: String;
  cloneFolder: string;
  style: Object;
  initName: string;
  initLocation: string;
  projectModalLoading: Boolean;
  fullPath: string;
  path: any;
  pathSubscription: Subscription;
  repoName: any;
  repoNameSubscription: Subscription;
  recentProject: any[];
  recentProjectSubscription: Subscription;
  cloneCredInfoBarVisible: boolean;
  pushCredInfoBarVisible: boolean;
  branchName: any;
  branchNameSubscription: Subscription;
  newBranchInfoBarVisible: boolean;
  newBranchName: string;
  referenceBranchName: string;
  newBranchCouple: NewBranchCouple;
  newBranchNameForRenaming: string;
  deleteBranchInfoBarVisible: boolean;
  deleteRemoteBranchCredInfoBarVisible: boolean;
  deleteBranchName: string;
  deleteRemoteBranchAuthErrored: boolean;
  mergeBranchName: string;
  credInfoBarVisible: boolean;
  openClonedInfoBarVisible: boolean;
  checkoutInfoBarVisible: boolean;
  newClonedRepoPath: string;
  cloneHttpsUser: HttpsUser;
  remoteAlias: String;
  pullrebaseInfoBarVisible: boolean;
  pullrebaseAuthErrored: boolean;
  pullrebaseCredInfoBarVisible: boolean;
  pullrebaseHttpsUser: HttpsUser;
  homeLoading: boolean;
  openFolder: string;
  themePrefSubscription: Subscription;
  currentTheme: string;
  mainPanelVisible: boolean;
  diffViewVisible: boolean;
  diffViewVisibleSubscription: Subscription;
  leftPanelVisible: boolean;
  graphVisible: boolean;
  rightPanelVisible: boolean;
  cloneAuthErrored: boolean;
  pushAuthErrored: boolean;
  currentHttpsUserSubscription: Subscription;
  currentHttpsUser: HttpsUser;
  localBranch: string;
  remoteBranch: string;
  newCheckedoutBranchName: string;
  commitHash: string;
  graph: any;
  graphSubcription: Subscription;

  constructor(public router: Router, private toastr: ToastrService,
    private electronService: ElectronService, private gitService: GitService,
    private translateService: TranslateService, private terminalService: TerminalManagerService,
    private themePrefService: ThemePreferencesService, private leftPanelService: LeftPanelService,
    private rightPanelService: RightPanelService, private graphService: GraphService) {

    this.newBranchCouple = new NewBranchCouple();
    this.pathSubscription = this.gitService.pathSubject.subscribe(
      (path: any) => {
        this.path = path;
      });
    this.gitService.emitPathSubject();

    this.graphSubcription = this.graphService.graphSubject.subscribe(
      (graph: boolean) => {
        this.graph = graph;
      }
    );
    this.graphService.emitGraph(this.graph);

    this.repoNameSubscription = this.gitService.repoNameSubject.subscribe(
      (repoName: any) => {
        this.repoName = repoName;
        this.openHomeView();
      });
    this.gitService.emitRepoNameSubject();

    this.recentProjectSubscription = this.gitService.recentProjectSubject.subscribe(
      (recentProject: any) => {
        this.recentProject = recentProject;
      });
    this.gitService.emitRecentProjectSubject();

    this.branchNameSubscription = this.gitService.branchNameSubject.subscribe(
      (branchName: any) => {
        this.branchName = branchName;
      });
    this.gitService.emitBranchNameSubject();

    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.currentHttpsUserSubscription = this.gitService.httpsUserSubject.subscribe(
      (newUser: HttpsUser) => {
        this.currentHttpsUser = newUser;
      }
    );
    this.gitService.emitHttpsUserSubject();

    this.diffViewVisibleSubscription = this.rightPanelService.diffViewVisibleSubject.subscribe(
      (diffViewVisible: boolean) => {
        this.diffViewVisible = diffViewVisible;
      }
    );
    this.rightPanelService.emitDiffViewVisibleSubject();


    this.cloneHttpsUser = {
      username: '',
      password: ''
    };

    this.pullrebaseHttpsUser = {
      username: '',
      password: ''
    };
  }

  @HostListener('window:focus', ['$event'])
  async onFocus() {
    if (this.repoName) {
      await this.gitService.updateFilesDiff();
      this.leftPanelService.setLocalBranches();
      this.leftPanelService.setRemoteBranches();
      this.gitService.emitNeedToDrawGraph(true);
      this.gitService.checkChanges();
      return true;
    }
    return false;
  }

  onKeyUp(evt) {
    if (evt.key === 'Enter') {
      this.setCommitHash();
    }
  }

  setCommitHash() {
    this.rightPanelService.setCommitHash(this.commitHash);
    this.rightPanelService.setView(true);
    this.commitHash = '';
  }

  async pullrebaseHttps() {
    this.homeLoading = true;
    return this.gitService.pullrebaseHttps(this.pullrebaseHttpsUser, this.branchName)
      .then((data) => {
        this.homeLoading = false;
        this.pullrebaseCredInfoBarVisible = false;
        this.toastr.info(data.message, data.title);
        this.resetPullrebaseInputs();
      })
      .catch((data) => {
        if (data.newData) {
          this.pullrebaseAuthErrored = this.pullrebaseCredInfoBarVisible;
          this.pullrebaseHttpsUser.password = '';
          this.pullrebaseCredInfoBarVisible = true;
        } else {
          this.homeLoading = false;
          this.resetPullrebaseInputs();
          this.toastr.error(data.message, data.title);
        }
      });
  }

  pullButtonClicked() {
    this.remoteAlias = 'origin';
    this.pullrebaseSubmit();
    return true;
  }

  pullrebaseSubmit() {
    return this.gitService.getUrl(this.remoteAlias).then((data) => {
      if (data.newData) {
        this.currentUrl = data.newData;
        var Url = GitUrlParse(this.currentUrl);
        if (Url.protocol === 'ssh') {
          this.toastr.error('Pas de ssh pour le moment', 'Erreur');
        } else if (Url.protocol === 'https') {
          this.homeLoading = true;
          this.pullrebaseHttps();
        }
      } else {
        this.toastr.error(this.translateService.instant('ERROR'),
        this.translateService.instant('ERROR'));
      }
    }).catch((err) => {
      this.toastr.error(this.translateService.instant('ERROR'),
      this.translateService.instant('ERROR'));
    });
  }

  branchButtonClicked() {
    this.referenceBranchName = this.branchName;
    this.newBranchInfoBarVisible = true;
  }

  openCreateBranchInfoBar(refBranchName) {
    this.referenceBranchName = refBranchName;
    this.newBranchInfoBarVisible = true;
  }

  openDeleteBranchInfoBar(deleteBranch) {
    this.deleteBranchName = deleteBranch;
    if (this.deleteBranchName.includes('/')) {
      this.deleteBranchInfoBarVisible = false;
      this.deleteRemoteBranchCredInfoBarVisible = true;
    } else {
      this.deleteBranchInfoBarVisible = true;
    }
  }

  async openTerminal() {
    return this.terminalService.openTerminal()
      .then(() => {
        return true;
      })
      .catch((data) => {
        this.toastr.error(data.message, data.title, {
          onActivateTick: true
        });
        return false;
      });
  }

  async openPreferences() {
    return this.router.navigate(['preferences']);
  }

  openProjectModal(tabSelected: any) {
    this.projectModalTabSelectedIndex = tabSelected;
    this.projectModalVisible = true;
  }

  cloneBrowse() {
    const BrowsePath = this.electronService.browse();
    if (BrowsePath !== null) {
      this.cloneFolder = BrowsePath;
    }
  }

  cloneSubmit() {
    if (this.electronService.fsExistsSync(this.cloneFolder.toString())) {
      var Url = GitUrlParse(this.cloneUrl);
      if (Url.protocol === 'https') {
        this.projectModalVisible = false;
        this.homeLoading = true;
        this.cloneHttps();
      } else if (Url.protocol === 'ssh') {
        this.toastr.error('Pas de ssh pour le moment', 'Erreur');
      } else {
        this.toastr.error(this.translateService.instant('INVALID_URL'),
          this.translateService.instant('ERROR'));
      }
    } else {
      this.toastr.error(this.translateService.instant('PATH_NOT_FOUND'),
        this.translateService.instant('ERROR'));
    }
  }


  pushButtonClicked() {
    this.remoteAlias = 'origin';
    this.pushSubmit();
    return true;
  }

  pushSubmit() {
    return this.gitService.getUrl(this.remoteAlias).then((data) => {
      if (data.newData) {
        this.currentUrl = data.newData;
        var Url = GitUrlParse(this.currentUrl);
        if (Url.protocol === 'ssh') {
          this.toastr.error('Pas de ssh pour le moment', 'Erreur');
        } else if (Url.protocol === 'https') {
          this.homeLoading = true;
          this.pushHttps();
        }
      } else {
        this.toastr.error(this.translateService.instant('ERROR'),
        this.translateService.instant('ERROR'));
      }
    }).catch((err) => {
      this.toastr.error(this.translateService.instant('ERROR'),
      this.translateService.instant('ERROR'));
    });
  }

  async cloneHttps() {
    return this.gitService.cloneHttps(GitUrlParse(this.cloneUrl), this.cloneFolder, this.cloneHttpsUser)
      .then((data) => {
        this.homeLoading = false;
        this.openClonedInfoBarVisible = true;
        this.newClonedRepoPath = data.newData;
        this.toastr.info(data.message, data.title);
      })
      .catch((data) => {
        if (data.newData) {
          this.cloneAuthErrored = this.cloneCredInfoBarVisible;
          this.cloneHttpsUser.password = '';
          this.cloneCredInfoBarVisible = true;
        } else {
          this.projectModalLoading = false;
          this.homeLoading = false;
          this.resetCloneInputs();
          this.toastr.error(data.message, data.title);
        }
      });
  }

  initBrowse() {
    const InitPath = this.electronService.browse();
    if (InitPath !== null) {
      this.initLocation = InitPath;
    }
    this.updateFullPath();
  }


  async pushHttps() {
    return this.gitService.pushHttps(this.fullPath, this.currentHttpsUser, this.branchName)
      .then((data) => {
        this.homeLoading = false;
        this.resetPushInputs();
        this.toastr.info(data.message, data.title);
      })
      .catch((data) => {
        if (data.newData) {
          this.pushAuthErrored = this.pushCredInfoBarVisible;
          this.currentHttpsUser.password = '';
          this.pushCredInfoBarVisible = true;
        } else {
          this.homeLoading = false;
          this.resetPushInputs();
          this.toastr.error(data.message, data.title);
        }
      });
  }

  updateFullPath() {
    if (this.initLocation) {
      this.fullPath = this.initLocation;

      if (this.initName) {
        this.fullPath = this.electronService.pathJoin(this.initLocation, this.initName);
      }
    } else {
      this.fullPath = '';
    }
  }

  async initSubmit() {
    this.projectModalLoading = true;

    return await this.gitService.init(this.initLocation, this.initName)
      .then((result) => {
        this.toastr.info(result.message, result.title, {
          onActivateTick: true
        });
        this.projectModalLoading = false;
        this.projectModalVisible = false;
        this.initName = '';
        this.initLocation = '';
        this.fullPath = '';
      })
      .catch((result) => {
        this.toastr.error(result.message, result.title, {
          onActivateTick: true
        });
        this.projectModalLoading = false;
      });
  }

  openBrowse() {
    const NewPath = this.electronService.browse();
    if (NewPath !== null) {
      this.openFolder = NewPath;
    }
  }

  async openRepo() {
    if (this.path !== this.openFolder) {
      this.projectModalLoading = true;
      if (this.openFolder !== null) {
        return this.gitService.setPath(this.openFolder)
          .then((data) => {
            this.projectModalLoading = false;
            this.projectModalVisible = false;
            this.openFolder = '';
            this.toastr.info(data.message, data.title);
            this.gitService.setHttpsUser({ username: null, password: null });
          })
          .catch((data) => {
            this.projectModalLoading = false;
            this.openFolder = '';
            this.toastr.error(data.message, data.title);
          });
      }
    } else {
      this.toastr.error(this.translateService.instant('OPEN.ALREADY'),
        this.translateService.instant('ERROR'));
        return false;
    }
  }

  closeCloneCredInfoBar() {
    this.cloneCredInfoBarVisible = false;
    this.resetCloneInputs();
  }

  updateRenaming() {
    setTimeout(() => { this.newBranchNameForRenaming = this.newBranchCouple.oldBranch; }, 0);
  }
  async renameBranch() {
    var TmpNewBr = new NewBranchCouple();
    TmpNewBr.oldBranch = this.newBranchCouple.oldBranch;
    TmpNewBr.newBranch = this.newBranchNameForRenaming;
    this.newBranchCouple = TmpNewBr;
    if (this.newBranchCouple.newBranch != '' && this.newBranchCouple.oldBranch != '') {
      return this.gitService.renameBranch(this.newBranchCouple.oldBranch, this.newBranchCouple.newBranch)
      .then((data) => {
        this.closeRenameBar();
        this.toastr.info(data.message, data.title);
      })
      .catch((data) => {
        this.closeRenameBar();
        this.toastr.error(data.message, data.title);
      });
    }
  }

  closeRenameBar() {
    this.newBranchCouple = new NewBranchCouple();
    this.newBranchNameForRenaming = '';
    this.gitService.getLocalBranches().then(() => {
      this.leftPanelService.setLocalBranches();
    });
  }

  closePushCredInfoBar() {
    this.pushCredInfoBarVisible = false;
    this.resetPushInputs();
  }

  openClonedRepo() {
    this.gitService.setHttpsUser(this.cloneHttpsUser);
    this.gitService.setPath(this.newClonedRepoPath);
    this.closeClonedInfoBar();
  }

  closeClonedInfoBar() {
    this.openClonedInfoBarVisible = false;
    this.resetCloneInputs();
    this.resetPullrebaseInputs();
  }

  resetCloneInputs() {
    this.cloneHttpsUser = {
      username: '',
      password: ''
    };
    this.cloneUrl = '';
    this.cloneFolder = '';
    this.newClonedRepoPath = '';
    this.cloneAuthErrored = false;
    this.cloneCredInfoBarVisible = false;
    this.homeLoading = false;
  }

  resetPushInputs() {
    this.currentHttpsUser = {
      username: '',
      password: ''
    };
    this.pushAuthErrored = false;
    this.pushCredInfoBarVisible = false;
    this.homeLoading = false;
  }

  closePullrebaseCredInfoBar() {
    this.pullrebaseCredInfoBarVisible = false;
    this.resetPullrebaseInputs();
  }

  resetPullrebaseInputs() {
    this.pullrebaseHttpsUser = {
      username: '',
      password: ''
    };
    this.pullrebaseAuthErrored = false;
    this.pullrebaseCredInfoBarVisible = false;
    this.homeLoading = false;
  }

  async openRecentRepo(recentPath: string) {
    this.openFolder = recentPath;
    return this.openRepo();
  }

  closeRepo() {
    this.path = undefined;
    this.repoName = undefined;
    this.branchName = undefined;
    this.graph = undefined;
    this.graphService.emitGraph(this.graph);
    this.closeHomeView();
  }

  openHomeView() {
    if (this.repoName) {
      this.mainPanelVisible = false;
      this.leftPanelVisible = true;
      this.graphVisible = true;
      this.rightPanelVisible = true;
      this.leftPanelService.setLocalBranches();
      this.leftPanelService.setRemoteBranches();
      this.rightPanelService.setView(true);
      this.rightPanelService.setDiffViewVisible(false);
      if (this.graph) {
        this.graphService.setGraph();
      }
    } else {
      this.mainPanelVisible = true;
    }
  }

  closeHomeView() {
    this.mainPanelVisible = true;
    this.leftPanelVisible = false;
    this.graphVisible = false;
    this.rightPanelVisible = false;
    this.rightPanelService.setCommitHash('');
    this.rightPanelService.setDiffViewVisible(false);
  }

  openCheckoutInfoBar(remoteBranch) {
    this.remoteBranch = remoteBranch;
    this.localBranch = remoteBranch.split('/')[1];
    this.checkoutInfoBarVisible = true;
  }

  createBranchHere() {
    return this.gitService.createBranchHere(this.newCheckedoutBranchName, this.remoteBranch).then((data) => {
      this.leftPanelService.setLocalBranches();
      this.leftPanelService.setRemoteBranches();
      this.closeCheckoutInfoBar();
      this.toastr.info(data.message, data.title);
    })
    .catch((data) => {
      this.closeCheckoutInfoBar();
      this.toastr.error(data.message, data.title);
    });
  }

  resetLocalHere() {
    return this.gitService.resetLocalHere(this.remoteBranch).then((data) => {
      this.leftPanelService.setLocalBranches();
      this.leftPanelService.setRemoteBranches();
      this.closeCheckoutInfoBar();
      this.toastr.info(data.message, data.title);
    })
    .catch((data) => {
      this.closeCheckoutInfoBar();
      this.toastr.error(data.message, data.title);
    });

  }

  closeCheckoutInfoBar() {
    this.leftPanelService.setLoadingVisible(false);
    this.remoteBranch = '';
    this.newCheckedoutBranchName = '';
    this.checkoutInfoBarVisible = false;
  }

  async createBranch() {
    this.homeLoading = true;
    return this.gitService.setNewBranch(this.newBranchName, this.referenceBranchName)
      .then((data) => {
        this.leftPanelService.setLocalBranches();
        this.leftPanelService.setRemoteBranches();
        this.newBranchInfoBarVisible = false;
        this.homeLoading = false;
        this.referenceBranchName = '';
        this.newBranchName = '';
        this.toastr.info(data.message, data.title);
      })
      .catch((data) => {
        this.newBranchInfoBarVisible = true;
        this.homeLoading = false;
        this.toastr.error(data.message, data.title);
      });
  }

  closeNewBranchInfoBar() {
    this.referenceBranchName = '';
    this.newBranchName = '';
    this.newBranchInfoBarVisible = false;
  }

  async deleteBranch() {
    this.homeLoading = true;
    this.deleteBranchInfoBarVisible = false;
    return this.gitService.applyDeletionBranch(this.deleteBranchName, this.currentHttpsUser)
      .then((data) => {
        this.leftPanelService.setLocalBranches();
        this.leftPanelService.setRemoteBranches();
        this.deleteRemoteBranchCredInfoBarVisible = false;
        this.deleteBranchInfoBarVisible = false;
        this.homeLoading = false;
        this.currentHttpsUser = {
          username: '',
          password: ''
        };
        this.toastr.info(data.message, data.title);
      })
      .catch((data) => {
          this.deleteBranchName = '';
          this.deleteBranchInfoBarVisible = false;
          this.homeLoading = false;
          this.resetDeleteRemoteBranchInputs();
          this.toastr.error(data.message, data.title);
      });
  }

  closeDeleteBranchInfoBar() {
    this.deleteBranchName = '';
    this.deleteBranchInfoBarVisible = false;
    this.homeLoading = false;
  }

  closeDeleteRemoteBranchCredInfoBar() {
    this.deleteRemoteBranchCredInfoBarVisible = false;
    this.resetDeleteRemoteBranchInputs();
  }

  resetDeleteRemoteBranchInputs() {
    this.currentHttpsUser = {
      username: '',
      password: ''
    };
    this.deleteRemoteBranchAuthErrored = false;
    this.deleteRemoteBranchCredInfoBarVisible = false;
    this.homeLoading = false;
  }

  async mergeBranch(mergeBranchName) {
    this.homeLoading = true;
    this.mergeBranchName = mergeBranchName;
    return this.gitService.mergeBranches(this.mergeBranchName, this.fullPath)
      .then((data) => {
        this.homeLoading = false;
        this.mergeBranchName = '';
        this.toastr.info(data.message, data.title);
      })
      .catch((data) => {
        this.homeLoading = false;
        this.toastr.error(data.message, data.title);
      });
  }

  rebaseBranch(rebaseBranchName) {
    this.homeLoading = true;
    return this.gitService.rebaseBranches(rebaseBranchName)
      .then((data) => {
        this.homeLoading = false;
        this.toastr.info(data.message, data.title);
      })
      .catch((data) => {
        this.homeLoading = false;
        this.toastr.error(data.message, data.title);
      });
  }

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
    this.graphSubcription.unsubscribe();
    this.repoNameSubscription.unsubscribe();
    this.recentProjectSubscription.unsubscribe();
    this.branchNameSubscription.unsubscribe();
    this.currentHttpsUserSubscription.unsubscribe();
    this.diffViewVisibleSubscription.unsubscribe();
  }
}
