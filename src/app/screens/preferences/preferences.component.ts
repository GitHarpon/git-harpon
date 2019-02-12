import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  preferencesVisible: Boolean;
  preferencesTabSelectedIndex: any;

  constructor(public router: Router) { }

  ngOnInit() {
    this.preferencesVisible = true;
    this.preferencesTabSelectedIndex = 1;
  }

  checkIfCloseModal(event) {
    if (event.index === 0) {
      this.router.navigate(['home']);
    }
  }
}
