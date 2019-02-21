import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GitService } from '../../providers/git.service';
import { ElectronService } from '../../providers/electron.service';
import { initNgModule } from '@angular/core/src/view/ng_module';
import { Subscription } from 'rxjs';
import { ServiceResult } from '../../models/ServiceResult';
import { TranslateService } from '@ngx-translate/core';
import * as GitUrlParse from 'git-url-parse';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  projectModalVisible: Boolean;
  searchInputValue: string;
  cloneUrl: String;
  cloneFolder: string;
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

  constructor(public router: Router, private toastr: ToastrService,
    private electronService: ElectronService, private gitService: GitService,
    private translateService: TranslateService) {
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
  }

  ngOnInit() {
  }

  pullButtonClicked() {
    console.log('Bouton pull cliqué');
  }

  pushButtonClicked() {
    console.log('Bouton push cliqué');
  }

  branchButtonClicked() {
    console.log('Bouton branche cliqué');
  }

  openTerminal() {
    console.log('on ouvre le terminal');
  }

  openPreferences() {
    this.router.navigate(['preferences']);
  }

  openProjectModal() {
    this.projectModalVisible = true;
  }

  displaySearchInputValue() {
    this.toastr.info(this.searchInputValue.toString());
  }

  cloneBrowse() {
    const BROWSEPATH = this.electronService.browse();
    if (BROWSEPATH !== null) {
      this.cloneFolder = BROWSEPATH;
    }
  }

  cloneSubmit() {
    if (this.electronService.fs.existsSync(this.cloneFolder.toString())) {
      var URL = GitUrlParse(this.cloneUrl);
      if (URL.protocol === 'https') {
        this.projectModalVisible = false;
        this.credInfoBarVisible = true;
      } else if (URL.protocol === 'ssh') {
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
    this.gitService.cloneHttps(GitUrlParse(this.cloneUrl), this.cloneFolder, this.username, this.password)
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
        this.fullPath = this.electronService.path.join(this.initLocation, this.initName).toString();
      }
    } else {
      this.fullPath = '';
    }
  }

  async initSubmit() {
    this.projectModalLoading = true;

    if (this.initLocation && this.initName) {
      await this.gitService.init(this.initLocation, this.initName)
        .then((result) => {
          this.toastr.info(this.translateService.instant(result.message), this.translateService.instant(result.title), {
            onActivateTick: true
          });

          this.projectModalVisible = false;
          this.initName = '';
          this.initLocation = '';
          this.fullPath = '';
        })
        .catch((result) => {
          this.toastr.error(this.translateService.instant(result.message), this.translateService.instant(result.title), {
            onActivateTick: true
          });
        });
    }
    this.projectModalLoading = false;
  }

  openBrowse() {
    const NEWPATH = this.electronService.browse();
    if (NEWPATH !== null) {
      this.openRepo(NEWPATH);
    }
  }

  openRepo(path: any) {
    if (this.path !== path) {
      this.projectModalLoading = true;
      if (path !== null) {
        this.gitService.setPath(path)
          .then((data) => {
            this.projectModalLoading = false;
            this.projectModalVisible = false;
            this.toastr.info(data.message, data.title);
          })
          .catch((data) => {
            this.projectModalLoading = false;
            this.toastr.error(data.message, data.title);
          });
      }
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

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
    this.repoNameSubscription.unsubscribe();
    this.recentProjectSubscription.unsubscribe();
  }
}
