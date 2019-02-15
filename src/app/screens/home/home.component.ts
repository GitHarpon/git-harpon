import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projectModalVisible: Boolean;
  searchInputValue: String;
  destination: string;

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

  browse() {
    const NEWPATH = this.electronService.remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (NEWPATH !== undefined) {
      this.destination = NEWPATH[0];
    }

  }
}
