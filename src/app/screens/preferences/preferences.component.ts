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
  dropdownLanguageValue: string;
  dataDropdownLanguage: Array<any>;

  languageSubscription: Subscription;

  constructor(public router: Router, private translate: TranslateService,
      private langPrefService: LanguagePreferencesService) {
  }

  ngOnInit() {
    this.preferencesVisible = true;
    this.preferencesTabSelectedIndex = 1;

    this.dataDropdownLanguage = this.langPrefService.getLanguages();
    console.log(this.dataDropdownLanguage);

    // Ici il faut récupérer le language courant de l'appli
    // Donc comme ça c'est bon mais dans l'app.component.ts faut gérer avec le LocalStorage
    this.dropdownLanguageValue = this.translate.getDefaultLang();

    this.languageSubscription = this.langPrefService.preferencesSubject.subscribe(
      (dropdownLanguageValue) => {
        this.dropdownLanguageValue = dropdownLanguageValue;
      }
    );
    this.langPrefService.emitPreferencesSubject();
  }

  checkIfCloseModal(event) {
    if (event.index === 0) {
      this.router.navigate(['home']);
    }
  }

  switchLanguage(language: String) {
    this.langPrefService.setLanguage(language);
    if (language === 'Français') {
      // this.translate.use('fr');
      this.translate.setDefaultLang(this.translate.getLangs()[0]);

    } else {
      // this.translate.use('en');
      this.translate.setDefaultLang(this.translate.getLangs()[1]);

    }
  }



}
