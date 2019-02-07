import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  colorList: Array<String>;
  fsList: Array<String>;
  faList: Array<any>;
  cbValue: Boolean;

  constructor(private electronService: ElectronService,
    private toastr: ToastrService, private translateService: TranslateService) { }

  ngOnInit() {
    this.cbValue = true;

    this.colorList = [
      'dark-blue',
      'light-blue',
      'dark-green',
      'light-green',
      'disabled-green',
      'dark-red',
      'light-red',
      'dark-grey',
      'light-grey',
      'blue-grey',
      'white',
      'muted-white',
      'dark'
    ];

    this.fsList = [
      'fs-xsmall',
      'fs-small',
      'fs-medium',
      'fs-large',
      'fs-xlarge'
    ];

    this.faList = [
      { icon: 'fa-git', isFab: true },
      { icon: 'fa-gitlab', isFab: true },
      { icon: 'fa-github', isFab: true },
      { icon: 'fa-toolbox', isFab: false },
      { icon: 'fa-home', isFab: false },
      { icon: 'fa-bitbucket', isFab: true },
      { icon: 'fa-check', isFab: false },
      { icon: 'fa-code', isFab: false },
      { icon: 'fa-edit', isFab: false },
      { icon: 'fa-filter', isFab: false },
      { icon: 'fa-folder', isFab: false },
      { icon: 'fa-folder-open', isFab: false },
      { icon: 'fa-key', isFab: false },
      { icon: 'fa-sort-alpha-down', isFab: false },
      { icon: 'fa-sort-alpha-up', isFab: false },
      { icon: 'fa-sort-amount-down', isFab: false },
      { icon: 'fa-sort-amount-up', isFab: false },
      { icon: 'fa-sort-numeric-down', isFab: false },
      { icon: 'fa-sort-numeric-up', isFab: false },
      { icon: 'fa-sync', isFab: false },
      { icon: 'fa-tag', isFab: false },
      { icon: 'fa-terminal', isFab: false },
      { icon: 'fa-trash', isFab: false },
      { icon: 'fa-user', isFab: false },
      { icon: 'fa-redo', isFab: false },
      { icon: 'fa-undo', isFab: false },
      { icon: 'fa-spinner', isFab: false },
      { icon: 'fa-upload', isFab: false },
      { icon: 'fa-download', isFab: false }
    ];
  }

  openFontAwesome() {
    this.electronService.shell.openExternal('https://fontawesome.com/icons?d=gallery');
  }

  setCheckValue() {
    return this.cbValue = !this.cbValue;
  }

  displayCbValue() {
    this.toastr.info(this.cbValue ? 'Coché' : 'Décoché', 'Information');
  }

}
