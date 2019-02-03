import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../environments/environment';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  version: String;
  production: Boolean;

  constructor() { }

  ngOnInit() {
    this.version = AppConfig.version;
    this.production = AppConfig.production;
  }

}
