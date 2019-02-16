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
  searchInputValue: String;
  projectModalLoading: Boolean;
  destination: string;

  constructor(public router: Router, private toastr: ToastrService,
    private electronService: ElectronService, private gitService: GitService) { }

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

  async browse() {
    this.projectModalLoading = true;
    const RESULT = await this.gitService.setPath(this.electronService.browse());
    if (RESULT.success) {
      this.toastr.info(RESULT.message, RESULT.title);
    } else {
      this.toastr.error(RESULT.message, RESULT.title);
    }
    this.projectModalLoading = false;
  }
}
