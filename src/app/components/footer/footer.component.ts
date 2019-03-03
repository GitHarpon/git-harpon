import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from '../../../environments/environment';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() devRedirect: any;
  version: String;
  production: Boolean;
  themePrefSubscription: Subscription;
  currentTheme: string;

  constructor(private electronService: ElectronService,
    private translateService: TranslateService, private themePrefService: ThemePreferencesService) {
      this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
        (newTheme: string) => {
          this.currentTheme = newTheme;
        }
      );
      this.themePrefService.emitThemePreferencesSubject();
  }

  ngOnInit() {
    this.version = AppConfig.version;
    this.production = AppConfig.production;
  }

  openGithub() {
    return this.electronService.ShellOpenExternal('https://github.com/GitHarpon/git-harpon');
  }

  getHomeTranslation() {
    return this.translateService.instant('HOME');
  }
}
