import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projectModalVisible: Boolean;
  searchInputValue: String;
  cloneUrl: String;
  cloneFolder: String;

  constructor(public router: Router, private toastr: ToastrService,
    private electronService: ElectronService, private translate: TranslateService) { }

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

  clone() {
    if (this.electronService.fs.existsSync(this.cloneFolder.toString())) {
    } else {
      this.toastr.error(this.translate.instant('ERROR'), this.translate.instant('NO_FOLDER'));
    }
  }
}
