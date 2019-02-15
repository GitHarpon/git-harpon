import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  preferencesVisible: Boolean;
  preferencesTabSelectedIndex: any;
  dropdownLanguageValue: String;
  dataDropdownLanguage: Array<any>;

  key: String = 'key';
  value: String = 'value';


  constructor(public router: Router, private translate: TranslateService) {
  }

  ngOnInit() {
    this.preferencesVisible = true;
    this.preferencesTabSelectedIndex = 1;
    this.dropdownLanguageValue = 'Français';

    this.dataDropdownLanguage = [
      {key: 'en', value: 'English'},
      {key: 'fr', value: 'Français'},
    ];
  }

  checkIfCloseModal(event) {
    if (event.index === 0) {
      this.router.navigate(['home']);
    }
  }

  switchLanguage() {
    if (this.dropdownLanguageValue === 'Français') {
      this.translate.use('fr');
    } else {
      this.translate.use('en');
    }
  }
}