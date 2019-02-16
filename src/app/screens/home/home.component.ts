import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceResult } from '../../models/ServiceResult';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projectModalVisible: Boolean;
  searchInputValue: String;

  constructor(public router: Router, private toastr: ToastrService) { }

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


  async openTerminal() {
    const RES: ServiceResult = await this.openTerminal();
    if (RES.success) {
      this.toastr.info(RES.message, RES.title, {
          onActivateTick: true
      });
    } else {
      this.toastr.error(RES.message, RES.title, {
          onActivateTick: true
      });
    }
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

}
