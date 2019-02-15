import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GitService } from '../../providers/git.service';
import { ElectronService } from '../../providers/electron.service';
import { initNgModule } from '@angular/core/src/view/ng_module';
import { Subscription } from 'rxjs';

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
    private electronService: ElectronService, private gitService: GitService) {
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
    if (this.initLocation !== undefined && this.initLocation !== '') {
      this.fullPath = this.initLocation;

      if (this.initName !== undefined && this.initName !== '') {
        this.fullPath = this.electronService.path.join(this.initLocation, this.initName).toString();
      }
    } else {
      this.fullPath = '';
    }
  }

  initSubmit() {
    this.projectModalLoading = true;
    if (this.initLocation !== undefined && this.initLocation !== '' && this.initName !== undefined && this.initName !== '') {
      console.log('initName : ' + this.initName);
      console.log('initLocation : ' + this.initLocation);
      if (this.electronService.fs.existsSync(this.initLocation)) {
        if (this.electronService.fs.existsSync(this.electronService.path.join(this.initLocation, this.initName))) {
          // dossier existe déjà avec le nom passé donc on peut init dans le dossier
          this.gitService.init(this.electronService.path.join(this.initLocation, this.initName))
            .then( () => {
              console.log('init done');
            });
        } else {
          // Dossier existe pas encore donc on le créé et on init dedans
          this.electronService.fs.mkdirSync(this.electronService.path.join(this.initLocation, this.initName));
          this.gitService.init(this.electronService.path.join(this.initLocation, this.initName))
            .then( () => {
              console.log('init done');
            });
        }
      } else {
        console.log('répertoire n\'existe pas');
      }
    }
  }

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
  }
}
