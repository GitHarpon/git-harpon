import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResizeEvent } from 'angular-resizable-element';
import { GitService } from '../../providers/git.service';
import { ElectronService } from '../../providers/electron.service';
import { initNgModule } from '@angular/core/src/view/ng_module';
import { Subscription } from 'rxjs';
import { ServiceResult } from '../../models/ServiceResult';
import { TranslateService } from '@ngx-translate/core';
import * as GitUrlParse from 'git-url-parse';
import { TerminalManagerService } from '../../providers/terminal-manager.service';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

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
  credInfoBarVisible: boolean;
  openClonedInfoBarVisible: boolean;
  newClonedRepoPath: string;
  username: string;
  password: string;
  homeLoading: boolean;
  openFolder: string;
  themePrefSubscription: Subscription;
  currentTheme: string;

  constructor(public router: Router, private toastr: ToastrService,
    private electronService: ElectronService, private gitService: GitService,
    private translateService: TranslateService, private terminalService: TerminalManagerService,
    private themePrefService: ThemePreferencesService) {
    this.pathSubscription = this.gitService.pathSubject.subscribe(
      (path: any) => {
        this.path = path;
      });
    this.gitService.emitPathSubject();

    this.repoNameSubscription = this.gitService.repoNameSubject.subscribe(
      (repoName: any) => {
        this.repoName = repoName;
      });
    this.gitService.emitRepoNameSubject();

    this.recentProjectSubscription = this.gitService.recentProjectSubject.subscribe(
      (recentProject: any) => {
        this.recentProject = recentProject;
      });
    this.gitService.emitRecentProjectSubject();

    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.dimensions = 20;
  }

  pullButtonClicked() {
    return true;
  }

  pushButtonClicked() {
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
  }

  validate(event: ResizeEvent): boolean {
    if (
      event.rectangle.width &&
      (event.rectangle.width < this.dimensions)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      width: `${event.rectangle.width}px`
    };
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
        this.credInfoBarVisible = true;
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

  cloneHttps() {
    this.credInfoBarVisible = false;
    this.homeLoading = true;
    return this.gitService.cloneHttps(GitUrlParse(this.cloneUrl), this.cloneFolder, this.username, this.password)
      .then((data) => {
        this.homeLoading = false;
        this.openClonedInfoBarVisible = true;
        this.newClonedRepoPath = data.newData;
        this.toastr.info(data.message, data.title);
      })
      .catch((data) => {
        this.homeLoading = false;
        this.resetCloneInputs();
        this.toastr.error(data.message, data.title);
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
    this.gitService.setPath(this.newClonedRepoPath);
    this.closeClonedInfoBar();
  }

  closeClonedInfoBar() {
    this.openClonedInfoBarVisible = false;
    this.resetCloneInputs();
  }

  resetCloneInputs() {
    this.username = '';
    this.password = '';
    this.cloneUrl = '';
    this.cloneFolder = '';
    this.newClonedRepoPath = '';
  }

  async openRecentRepo(recentPath: string) {
    this.openFolder = recentPath;
    return this.openRepo();
  }

  closeRepo() {
    this.path = undefined;
    this.repoName = undefined;
  }

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
    this.repoNameSubscription.unsubscribe();
    this.recentProjectSubscription.unsubscribe();
  }
}
