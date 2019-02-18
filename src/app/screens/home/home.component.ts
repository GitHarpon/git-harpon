import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GitService } from '../../providers/git.service';
import { ElectronService } from '../../providers/electron.service';
import { initNgModule } from '@angular/core/src/view/ng_module';
import { Subscription } from 'rxjs';
import { ServiceResult } from '../../models/ServiceResult';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  projectModalVisible: Boolean;
  searchInputValue: string;
  initName: string;
  initLocation: string;
  fullPath: string;
  projectModalLoading: Boolean;
  path: any;
  pathSubscription: Subscription;

  constructor(public router: Router, private toastr: ToastrService,
    private electronService: ElectronService, private gitService: GitService,
    private translateService: TranslateService) {
    this.pathSubscription = this.gitService.pathSubject.subscribe(
      (path: any) => {
        this.path = path;
      }
    );
    this.gitService.emitPathSubject();

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

  initBrowse() {
    const INITPATH = this.electronService.browse();
    if (INITPATH !== undefined) {
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
        .then( (result) => {
          this.toastr.info(this.translateService.instant(result.message), this.translateService.instant(result.title), {
            onActivateTick: true
          });

          this.projectModalVisible = false;
          this.initName = '';
          this.initLocation = '';
          this.fullPath = '';
        })
        .catch( (result) => {
          this.toastr.error(this.translateService.instant(result.message), this.translateService.instant(result.title), {
            onActivateTick: true
          });
        });
    }

    this.projectModalLoading = false;
  }

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
  }
}
