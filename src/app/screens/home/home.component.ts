import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GitService } from '../../providers/git.service';
import { ElectronService } from '../../providers/electron.service';
import { Subscription } from 'rxjs';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  projectModalVisible: Boolean;
  searchInputValue: String;
  projectModalLoading: Boolean;
  repoName: any;
  repoNameSubscription: Subscription;
  path: any;
  pathSubscription: Subscription;
  recentProject: any[];
  recentProjectSubscription: Subscription;


  constructor(public router: Router, private toastr: ToastrService,
    private electronService: ElectronService, private gitService: GitService) {
    this.pathSubscription = this.gitService.pathSubject.subscribe(
      (path: any) => {
        this.path = path;
      }
    );
    this.gitService.emitPathSubject();
    this.repoNameSubscription = this.gitService.repoNameSubject.subscribe(
      (repoName: any) => {
        this.repoName = repoName;
      }
    );
    this.gitService.emitRepoNameSubject();
    this.recentProjectSubscription = this.gitService.recentProjectSubject.subscribe(
      (recentProject: any) => {
        this.recentProject = recentProject;
      }
    );
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

  openBrowse() {
    const NEWPATH = this.electronService.browse();
    this.openRepo(NEWPATH);
  }

  openRepo(path: any) {
    if (this.path !== path) {
      this.projectModalLoading = true;
      if (path !== null) {
        const RESULT = this.gitService.setPath(path);
        if (RESULT.success) {
          this.toastr.info(RESULT.message, RESULT.title);
        } else {
          this.toastr.error(RESULT.message, RESULT.title);
        }
      }
      this.projectModalLoading = false;
    }
  }

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
    this.repoNameSubscription.unsubscribe();
  }
}
