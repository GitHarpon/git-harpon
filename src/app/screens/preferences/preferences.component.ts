import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguagePreferencesService } from '../../providers/language-preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit, OnDestroy {

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

    // Ici il faut récupérer le language courant de l'appli
    // Donc comme ça c'est bon mais dans l'app.component.ts faut gérer avec le LocalStorage
    this.dropdownLanguageValue = this.translate.getDefaultLang(); // renvoie 'fr' ou 'en'

    this.languageSubscription = this.langPrefService.preferencesSubject.subscribe(
      (preference) => {
        console.log(preference);
        this.dropdownLanguageValue = preference;
      }
    );
    this.langPrefService.emitPreferencesSubject();
  }

  checkIfCloseModal(event) {
    if (event.index === 0) {
      this.router.navigate(['home']);
    }
  }

  switchLanguage() {
    // console.log(language);
    this.langPrefService.setLanguage(this.dropdownLanguageValue);
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  // Fonction qui regroupe toutes les fonctions applicables aux préférences
  saveChangedPreferences() {
    this.switchLanguage();
  }

}
