import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguagePreferencesService } from '../../providers/language-preferences.service';
import { ToastrService } from 'ngx-toastr';
import { ElectronService } from '../../providers/electron.service';
import { TerminalManagerService } from '../../providers/terminal-manager.service';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit, OnDestroy {

  loading: Boolean = false;

  preferencesVisible: Boolean;
  preferencesTabSelectedIndex: any;
  dropdownLanguageValue: string;
  dataDropdownLanguage: Array<any>;
  dataDropdownTheme: Array<any>;
  currentTheme: string;

  languageSubscription: Subscription;
  themePrefSubscription: Subscription;

  dataDropdownTerminal: Array<any>;
  dropdownTerminalValue: string;

  terminalSubscription: Subscription;

  constructor(public router: Router, private translate: TranslateService,
      private langPrefService: LanguagePreferencesService, private toastr: ToastrService,
      private electronService: ElectronService, private themePrefService: ThemePreferencesService,
      public terminalPreferencesService: TerminalManagerService) {
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

    this.dataDropdownTerminal = this.terminalPreferencesService.getTerminals();

    this.dropdownTerminalValue = this.terminalPreferencesService.terminalCmd;

    this.terminalSubscription = this.terminalPreferencesService.preferencesSubject.subscribe(
      (preference) => {
        this.dropdownTerminalValue = preference;
      }
    );
    this.terminalPreferencesService.emitPreferencesSubject();

    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  setCurrentTerminal(event) {
    this.terminalPreferencesService.setCurrentTerminal(event);
  }
  async checkIfCloseModal(event) {
    if (event.index === 0) {
      return this.router.navigate(['home']);
    }
    return false;
  }

  switchLanguage() {
    this.langPrefService.setLanguage(this.dropdownLanguageValue);
  }

  switchTerminal() {
    this.terminalPreferencesService.setCurrentTerminal(this.dropdownTerminalValue);
  }

  // Fonction qui regroupe toutes les fonctions applicables aux préférences
  async saveChangedPreferences() {
    this.loading = true;
    this.switchLanguage();
    this.switchTerminal();
    this.loading = false;
    this.toastr.info(this.translate.instant('CHANGE_PREF_DONE'),
        this.translate.instant('SUCCESS'));
    return this.router.navigate(['home']);
  }

  async saveChangedUIPreferences() {
    this.loading = true;
    this.themePrefService.setThemePreference(this.currentTheme);
    this.loading = false;
    this.toastr.info(this.translate.instant('CHANGE_PREF_DONE'),
        this.translate.instant('SUCCESS'));
    return this.router.navigate(['home']);
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.terminalSubscription) {
      this.terminalSubscription.unsubscribe();
    }
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
  }
}
