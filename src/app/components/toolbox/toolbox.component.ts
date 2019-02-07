import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  @ViewChild('userCM') userCM: ContextMenuComponent;
  @ViewChild('subjectCM') subjectCM: ContextMenuComponent;
  colorList: Array<String>;
  fsList: Array<String>;
  faList: Array<any>;
  inputValue: String;
  inputEmptyValue: String;
  inputValueNumber: number;
  inputMinMaxValueNumber: number;
  max: number;
  min: number;
  contextMenuFirstObject: Array<Object>;
  contextMenuSecondObject: Array<Object>;
  dataDropdownExample: Array<String>;

  constructor(private electronService: ElectronService,
    private toastr: ToastrService, private translateService: TranslateService) { }

  ngOnInit() {
    this.inputValue = 'Test';
    this.inputEmptyValue = '';

    this.inputValueNumber = 10;
    this.inputMinMaxValueNumber = 0;
    this.max = 10;
    this.min = 0;

    this.colorList = [
      'dark-blue',
      'light-blue',
      'light-blue-hover',
      'disabled-blue',
      'dark-green',
      'light-green',
      'disabled-green',
      'dark-red',
      'light-red',
      'disabled-red',
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

    this.dataDropdownExample = [
      'Orange',
      'Banane',
      'Cerise',
      'Pêche'
    ];

    this.contextMenuFirstObject = [
      { firstname: 'Cyrielle', lastname: 'Angoula Meka', age: 23, sexe: 'F' },
      { firstname: 'Julien', lastname: 'Besnier', age: 23, sexe: 'M' },
      { firstname: 'Martin', lastname: 'Blondel', age: 21, sexe: 'M' },
      { firstname: 'Clément', lastname: 'Drouin', age: 21, sexe: 'M' },
      { firstname: 'Antoine', lastname: 'Guillory', age: 21, sexe: 'M' },
      { firstname: 'Julien', lastname: 'Lamy', age: 21, sexe: 'M' }
    ];

    this.contextMenuSecondObject = [
      { name: 'Prog Objet', teacher: 'M. Andary', language: 'Java'  },
      { name: 'S&T', teacher: 'M. Patrou', language: 'Scala' },
      { name: 'Langage Web', teacher: 'M. Nicart', language: 'JavaScript' },
    ];
  }


  openFontAwesome() {
    this.electronService.shell.openExternal('https://fontawesome.com/icons?d=gallery');
  }

  primary() {
    this.toastr.info(this.translateService.instant('BUTTON.PRIMARY'),
      this.translateService.instant('INFORMATION'));
  }

  success() {
    this.toastr.success(this.translateService.instant('BUTTON.SUCCESS'),
      this.translateService.instant('SUCCESS'));
  }

  danger() {
    this.toastr.error(this.translateService.instant('BUTTON.DANGER'),
      this.translateService.instant('DANGER'));
  }

  testInput() {
    this.toastr.info(this.inputValue.toString());
  }

  changeInputValue() {
    this.inputValue += 'daa';
  }


  testInputNumber() {
    this.toastr.info(this.inputValueNumber.toString());
	}
	
  showMessage(message: string) {
    this.toastr.info(message);
  }
}
