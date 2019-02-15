import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GitService } from '../../providers/git.service';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projectModalVisible: Boolean;
  searchInputValue: string;
  initName: string;
  initLocation: string;
  fullPath: string;

  constructor(public router: Router, private toastr: ToastrService, private electronService: ElectronService) { }

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
        this.fullPath += '\\' + this.initName;
      }
    } else {
      this.fullPath = '';
    }
  }

  initSubmit() {
    console.log('initName : ' + this.initName);
    console.log('initLocation : ' + this.initLocation);

  }
}
