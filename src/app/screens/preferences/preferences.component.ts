import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguagePreferencesService } from '../../providers/language-preferences.service';
import { ToastrService } from 'ngx-toastr';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

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
  dataDropdownTheme: Array<any>;
  currentTheme: string;

  languageSubscription: Subscription;
  themePrefSubscription: Subscription;

  constructor(public router: Router, private translate: TranslateService,
      private langPrefService: LanguagePreferencesService, private toastr: ToastrService,
      private themePrefService: ThemePreferencesService) {
  }

  ngOnInit() {
    this.preferencesVisible = true;
    this.preferencesTabSelectedIndex = 1;

    this.dataDropdownLanguage = [
      { key: 'fr', value: this.translate.instant('FRENCH') },
      { key: 'en', value: this.translate.instant('ENGLISH') },
    ];

    this.dataDropdownTheme = [
      { key: 'dark', value: this.translate.instant('DARK') },
      { key: 'light', value: this.translate.instant('LIGHT') }
    ];

    this.dropdownLanguageValue = this.translate.getDefaultLang(); // renvoie 'fr' ou 'en'

    this.languageSubscription = this.langPrefService.preferencesSubject.subscribe(
      (preference) => {
        this.dropdownLanguageValue = preference;
      }
    );
    this.langPrefService.emitPreferencesSubject();

    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
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
    this.toastr.info(this.translate.instant('CHANGE_PREF_DONE'),
        this.translate.instant('SUCCESS'));
    this.router.navigate(['home']);
  }

  saveChangedUIPreferences() {
    this.loading = true;
    this.themePrefService.setThemePreference(this.currentTheme);
    this.loading = false;
    this.toastr.info(this.translate.instant('CHANGE_PREF_DONE'),
        this.translate.instant('SUCCESS'));
    this.router.navigate(['home']);
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
  }
}
