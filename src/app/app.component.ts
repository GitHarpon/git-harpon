import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService) {

    this.translate.addLangs(['fr', 'en']);

    if (localStorage.getItem('lang') === null || localStorage.getItem('lang') === 'fr') {
      this.translate.setDefaultLang('fr');
    } else {
      this.translate.setDefaultLang('en');
    }
  }
}
