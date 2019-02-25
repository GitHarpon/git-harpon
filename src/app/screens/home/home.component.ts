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
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  projectModalTabSelectedIndex: any;
  projectModalVisible: Boolean;
  searchInputValue: String;
  dimensions: number;
  style: Object;
  initName: string;
  initLocation: string;
  fullPath: string;
  projectModalLoading: Boolean;
  path: any;
  pathSubscription: Subscription;
  repoName: any;
  repoNameSubscription: Subscription;
  recentProject: any[];
  recentProjectSubscription: Subscription;
  openFolder: string;
  themePrefSubscription: Subscription;
  currentTheme: string;

  constructor(public router: Router, private toastr: ToastrService,
    private electronService: ElectronService, private gitService: GitService,
    private translateService: TranslateService, private themePrefService: ThemePreferencesService) {
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

  openTerminal() {
    console.log('on ouvre le terminal');
  }

  openPreferences() {
    this.router.navigate(['preferences']);
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

  initBrowse() {
    const INITPATH = this.electronService.browse();
    if (INITPATH !== null) {
      this.initLocation = INITPATH;
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
    const NEWPATH = this.electronService.browse();
    if (NEWPATH !== null) {
      this.openFolder = NEWPATH;
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
