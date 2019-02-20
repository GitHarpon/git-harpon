import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguagePreferencesService } from '../../providers/language-preferences.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit, OnDestroy {

  @Input() loading: Boolean = false;

  preferencesVisible: Boolean;
  preferencesTabSelectedIndex: any;
  dropdownLanguageValue: string;
  dataDropdownLanguage: Array<any>;

  languageSubscription: Subscription;

  constructor(public router: Router, private translate: TranslateService,
      private langPrefService: LanguagePreferencesService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.preferencesVisible = true;
    this.preferencesTabSelectedIndex = 1;

    // this.dataDropdownLanguage = this.langPrefService.getLanguages();
    this.dataDropdownLanguage = [
      { key: 'fr', value: this.translate.instant('FRENCH') },
      { key: 'en', value: this.translate.instant('ENGLISH') },
    ];

    // Ici il faut récupérer le language courant de l'appli
    // Donc comme ça c'est bon mais dans l'app.component.ts faut gérer avec le LocalStorage
    this.dropdownLanguageValue = this.translate.getDefaultLang(); // renvoie 'fr' ou 'en'

    this.languageSubscription = this.langPrefService.preferencesSubject.subscribe(
      (preference) => {
        this.dropdownLanguageValue = preference;
        this.langPrefService.preferences = preference;
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
    this.langPrefService.setLanguage(this.dropdownLanguageValue);
  }

  // Fonction qui regroupe toutes les fonctions applicables aux préférences
  saveChangedPreferences() {
    this.loading = true;
    this.switchLanguage();
    this.loading = false;
    this.toastr.info(this.translate.instant('SUCCESS'),
        this.translate.instant('CHANGE_PREFERENCE'));
    this.router.navigate(['home']);
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }


}
