import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from '../../../environments/environment';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() devRedirect: any;
  version: String;
  production: Boolean;

  constructor(private electronService: ElectronService,
    private translateService: TranslateService) {
  }

  ngOnInit() {
    this.version = AppConfig.version;
    this.production = AppConfig.production;
  }

  openGithub() {
    this.electronService.shell.openExternal('https://github.com/GitHarpon/git-harpon');
  }

  getHomeTranslation() {
    return this.translateService.instant('HOME');
  }
}
