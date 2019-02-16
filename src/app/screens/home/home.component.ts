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
    // A DEPLACER DANS LE SERVICE ? (rapide à faire)
    // Si les champs sont bien remplis
    if (this.initLocation && this.initName) {
      // Si l'emplacement existe
      if (this.electronService.fs.existsSync(this.initLocation)) {
        if (!this.electronService.fs.existsSync(this.electronService.path.join(this.initLocation, this.initName))) {
          // Répertoire existe pas encore donc on le créé et on init dedans
          this.electronService.fs.mkdirSync(this.electronService.path.join(this.initLocation, this.initName));
        }

        const RESULT = await this.gitService.init(this.electronService.path.join(this.initLocation, this.initName));
          if (RESULT.success) {
            this.toastr.success(this.translateService.instant(RESULT.message), this.translateService.instant(RESULT.title), {
              onActivateTick: true
            });

            // METTRE LE CHEMIN COMME ETANT CELUI PAR DEFAUT
          } else {
            this.toastr.error(this.translateService.instant('INIT.FAILED'), this.translateService.instant('ERROR'), {
              onActivateTick: true
            });
          }

          this.projectModalLoading = false;

      } else {
        this.toastr.error(this.translateService.instant('PATH_NOT_FOUND'), this.translateService.instant('ERROR'), {
          onActivateTick: true
        });

        this.projectModalLoading = false;
      }
    }

    // On vide les champs et on ferme la modale
    this.projectModalVisible = false;
    this.initName = '';
    this.initLocation = '';
    this.fullPath = '';
  }

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
  }
}
