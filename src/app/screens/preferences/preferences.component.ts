import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguagePreferencesService } from '../../providers/language-preferences.service';

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

  path: any;
  pathSubscription: Subscription;

  key: String = 'key';
  value: String = 'value';


  constructor(public router: Router, private translate: TranslateService,
      private gitService: LanguagePreferencesService) {

        this.translate.addLangs(['fr', 'en']);
        this.translate.setDefaultLang(this.translate.getLangs()[0]);

  }

  ngOnInit() {
    this.preferencesVisible = true;
    this.preferencesTabSelectedIndex = 1;
    this.dropdownLanguageValue = 'Français';

    this.dataDropdownLanguage = [
      {key: 'Français', value: 'Français'},
      {key: 'English', value: 'English'},
    ];
  }

  checkIfCloseModal(event) {
    if (event.index === 0) {
      this.router.navigate(['home']);
    }
  }

  switchLanguage(language: String) {
    this.gitService.setLanguage(language);
    if (language === 'Français') {
      this.translate.use('fr');
      // this.translate.getLangs()[0];
    } else {
      this.translate.use('en');
      // this.translate.getLangs()[1];
    }
    // if (this.dropdownLanguageValue === 'Français') {
    //   this.translate.use('fr');
    // } else {
    //   this.translate.use('en');
    // }
  }



}
