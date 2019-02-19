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
    // Ici on doit chercher depuis le local storage (si vide prendre fr du coup)
    // this.translate.setDefaultLang(this.translate.getLangs()[0]);
    // localStorage.setItem('en', 'en');
    if (localStorage.getItem('lang') === null) {
      this.translate.setDefaultLang('fr');
    } else {
      this.translate.setDefaultLang('en');
    }
    console.log(localStorage.length);


    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
