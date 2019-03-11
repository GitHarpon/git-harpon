import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GitService } from '../../providers/git.service';
import { ElectronService } from '../../providers/electron.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as GitUrlParse from 'git-url-parse';
import { TerminalManagerService } from '../../providers/terminal-manager.service';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { HttpsUser } from '../../models/HttpsUser';
import { LeftPanelService } from '../../providers/left-panel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  projectModalTabSelectedIndex: any;
  projectModalVisible: Boolean;
  cloneUrl: String;
  cloneFolder: string;
  searchInputValue: String;
  dimensions: number;
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
  branchName: any;
  branchNameSubscription: Subscription;
  credInfoBarVisible: boolean;
  openClonedInfoBarVisible: boolean;
  checkoutInfoBarVisible: boolean;
  newClonedRepoPath: string;
  cloneHttpsUser: HttpsUser;

  pullrebaseInfoBarVisible: boolean;
  pullrebaseAuthErrored: boolean;
  pullrebaseCredInfoBarVisible: boolean;

  homeLoading: boolean;
  openFolder: string;
  themePrefSubscription: Subscription;
  currentTheme: string;
  mainPanelVisible: boolean;
  leftPanelVisible: boolean;
  graphVisible: boolean;
  rightPanelVisible: boolean;
  cloneAuthErrored: boolean;
  currentHttpsUserSubscription: Subscription;
  currentHttpsUser: HttpsUser;
  remoteBranch: string;
  newCheckedoutBranchName: string;
  leftPanelLoadingVisible: Boolean;

  constructor(public router: Router, private toastr: ToastrService,
    private electronService: ElectronService, private gitService: GitService,
    private translateService: TranslateService, private terminalService: TerminalManagerService,
    private themePrefService: ThemePreferencesService, private leftPanelService: LeftPanelService) {
    this.pathSubscription = this.gitService.pathSubject.subscribe(
      (path: any) => {
        this.path = path;
      });
    this.gitService.emitPathSubject();

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

    this.dimensions = 20;

    this.cloneHttpsUser = {
      username: '',
      password: ''
    };
  }

  async pullrebaseHttps() {
    this.homeLoading = true;
    return this.gitService.pullrebaseHttps(this.fullPath, this.currentHttpsUser, this.branchName)
      .then((data) => {
        this.homeLoading = false;
        this.pullrebaseCredInfoBarVisible = false;
        this.toastr.info(data.message, data.title);
      })
      .catch((data) => {
        if (data.newData) {
          this.pullrebaseAuthErrored = this.pullrebaseCredInfoBarVisible;
          this.currentHttpsUser.password = '';
          this.pullrebaseCredInfoBarVisible = true;
          this.homeLoading = false;
        } else {
          this.homeLoading = false;
          this.resetPullrebaseInputs();
          this.toastr.error(data.message, data.title);
        }
      });
  }

  pushButtonClicked() {
    return true;
  }

  pullButtonClicked() {
    this.pullrebaseCredInfoBarVisible = true;
    return true;
  }

  branchButtonClicked() {
    return true;
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

  displaySearchInputValue() {
    if (this.repoName) {
      return true;
    }
    return false;
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
          this.cloneAuthErrored = this.credInfoBarVisible;
          this.cloneHttpsUser.password = '';
          this.credInfoBarVisible = true;
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
        this.openHomeView();
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
            this.openHomeView();
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

  closeCredInfoBar() {
    this.credInfoBarVisible = false;
    this.resetCloneInputs();
  }

  openClonedRepo() {
    this.gitService.setHttpsUser(this.cloneHttpsUser);
    this.gitService.setPath(this.newClonedRepoPath);
    this.closeClonedInfoBar();
    this.openHomeView();
  }

  closeClonedInfoBar() {
    this.openClonedInfoBarVisible = false;
    this.resetCloneInputs();
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
    this.credInfoBarVisible = false;
    this.homeLoading = false;
  }

  closePullrebaseCredInfoBar() {
    this.pullrebaseCredInfoBarVisible = false;
    this.resetPullrebaseInputs();
  }

  resetPullrebaseInputs() {
    this.currentHttpsUser = {
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
    this.closeHomeView();
  }

  openHomeView() {
    if (this.repoName) {
      this.mainPanelVisible = false;
      this.leftPanelVisible = true;
      this.graphVisible = true;
      this.rightPanelVisible = true;
    } else {
      this.mainPanelVisible = true;
    }
  }

  closeHomeView() {
    this.mainPanelVisible = true;
    this.leftPanelVisible = false;
    this.graphVisible = false;
    this.rightPanelVisible = false;
  }

  openCheckoutInfoBar(remoteBranch) {
    this.remoteBranch = remoteBranch;
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
    this.leftPanelLoadingVisible = false;
    this.remoteBranch = '';
    this.newCheckedoutBranchName = '';
    this.checkoutInfoBarVisible = false;
  }

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
    this.repoNameSubscription.unsubscribe();
    this.recentProjectSubscription.unsubscribe();
    this.branchNameSubscription.unsubscribe();
    this.currentHttpsUserSubscription.unsubscribe();
  }
}
