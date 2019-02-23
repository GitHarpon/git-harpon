import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguagePreferencesService } from '../../providers/language-preferences.service';
import { ToastrService } from 'ngx-toastr';
import { ElectronService } from '../../providers/electron.service';
import { TerminalManagerService } from '../../providers/terminal-manager.service';

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

  dataDropdownTerminal: Array<any>;
  dropdownTerminalValue: string;

  terminalSubscription: Subscription;

  constructor(public router: Router, private translate: TranslateService,
      private langPrefService: LanguagePreferencesService, private toastr: ToastrService,
      private electronService: ElectronService,
      private terminalPreferencesService: TerminalManagerService) {
  }

  ngOnInit() {
    this.preferencesVisible = true;
    this.preferencesTabSelectedIndex = 1;

    this.dataDropdownLanguage = [
      { key: 'fr', value: this.translate.instant('FRENCH') },
      { key: 'en', value: this.translate.instant('ENGLISH') },
    ];

    this.dropdownLanguageValue = this.translate.getDefaultLang(); // renvoie 'fr' ou 'en'

    this.languageSubscription = this.langPrefService.preferencesSubject.subscribe(
      (preference) => {
        this.dropdownLanguageValue = preference;
        this.langPrefService.preferences = preference;
      }
    );
    this.langPrefService.emitPreferencesSubject();

    var CurrentOs = this.electronService.os.type();
    switch (CurrentOs) {
      case 'Linux':
        this.dataDropdownTerminal = [
          { key: 'terminator', value: 'terminator' },
          { key: 'gnome-terminal', value: 'gnome-terminal' },
          { key: 'xterm', value: 'xterm' }
        ];
        break;
      case 'Darwin':
        this.dataDropdownTerminal = [
          { key: 'open -a Terminal', value: 'Terminal' },
          { key: 'open -a iTerm', value: 'iTerm' },
          { key: 'open -a terminator', value: 'terminator' }
        ];
        break;
      case 'Windows_NT':
        this.dataDropdownTerminal = [
          { key: 'start cmd.exe', value: 'cmd' },
          { key: 'start PowerShell.exe', value: 'PowerShell' },
          { key: 'start "" "%ProgramFiles%\\Git\\git-bash.exe"', value: 'Git Bash' }
        ];
        break;
      default:
        break;
    }

    this.dropdownTerminalValue = this.terminalPreferencesService.getCurrentTerminalName();

    this.terminalSubscription = this.terminalPreferencesService.preferencesSubject.subscribe(
      (preference) => {
        this.dropdownTerminalValue = preference;
        this.terminalPreferencesService.preferences.name = preference;
      }
    );
    this.terminalPreferencesService.emitPreferencesSubject();
  }

  setCurrentTerminal(event) {
    this.terminalPreferencesService.setCurrentTerminal(event);
  }

  checkIfCloseModal(event) {
    if (event.index === 0) {
      this.router.navigate(['home']);
    }
  }

  switchLanguage() {
    this.langPrefService.setLanguage(this.dropdownLanguageValue);
  }

  switchTerminal() {
    this.terminalPreferencesService.setCurrentTerminal({ name: 'Terminal', cmd: this.dropdownTerminalValue });
  }

  // Fonction qui regroupe toutes les fonctions applicables aux préférences
  saveChangedPreferences() {
    this.loading = true;
    this.switchLanguage();
    this.switchTerminal();
    this.loading = false;
    this.toastr.info(this.translate.instant('CHANGE_PREF_DONE'),
        this.translate.instant('SUCCESS'));
    this.router.navigate(['home']);
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.terminalSubscription.unsubscribe();
  }
}
