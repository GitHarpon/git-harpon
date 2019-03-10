import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  @ViewChild('userCM') userCM: ContextMenuComponent;
  @ViewChild('subjectCM') subjectCM: ContextMenuComponent;
  darkColorList: Array<String>;
  lightColorList: Array<String>;
  independentColorList: Array<String>;
  fsList: Array<String>;
  faList: Array<any>;
  cbValue: Boolean;
  inputValue: String;
  inputEmptyValue: String;
  loading: Boolean;
  modalLoading: Boolean;
  modalRegularVisible: Boolean;
  modalFullscreenVisible: Boolean;
  modalLoadingVisible: Boolean;
  modalInputValue: String;
  modalTabSelectedIndex: any;
  infoBarVisible: Boolean;
  inputValueNumber: number;
  inputMinMaxValueNumber: number;
  max: number;
  min: number;
  contextMenuFirstObject: Array<Object>;
  contextMenuSecondObject: Array<Object>;
  dataDropdownExample: Array<any>;
  dataDropdownExampleTwo: Array<any>;
  textareaValue: String;
  commitTextAreaValue: any;

  key: String = 'key';
  value: String = 'value';
  dropdownValue: String;
  dropdownValueTwo: String;
  passwordInput: string;

  themePrefSubscription: Subscription;
  currentTheme: string;


  constructor(private electronService: ElectronService,
    private toastr: ToastrService, private translateService: TranslateService,
    private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  ngOnInit() {
    this.cbValue = true;
    this.inputValue = 'Test';
    this.inputEmptyValue = '';
    this.textareaValue = '';
    this.commitTextAreaValue = {
      summary: '',
      desc: ''
    };
    this.modalTabSelectedIndex = 1;
    this.passwordInput = 'toto';

    this.inputValueNumber = 10;
    this.inputMinMaxValueNumber = 0;
    this.max = 10;
    this.min = 0;
    this.dropdownValue = 'banana';

    this.darkColorList = [
      'dark-blue',
      'light-blue',
      'disabled-blue',
      'dark-green',
      'light-green',
      'disabled-green',
      'light-green-hover',
      'dark-red',
      'light-red',
      'disabled-red',
      'dark-grey',
      'light-grey',
      'blue-grey',
      'low-dark',
      'version',
      'textarea-bg'
    ];

    this.lightColorList = [
      'dark-blue-light',
      'light-blue-light',
      'disabled-blue-light',
      'dark-green-light',
      'light-green-light',
      'disabled-green-light',
      'light-green-hover-light',
      'dark-red-light',
      'light-red-light',
      'disabled-red-light',
      'button-bar-light',
      'button-bar-hover-light',
      'arrow-light',
      'border-light-grey-light',
      'border-dark-grey-light',
      'dark-grey-light',
      'light-grey-light',
      'grey-variant-light',
      'modal-tab-selected-light',
      'modal-tab-hover-light'
    ];

    this.independentColorList = [
      'light-blue-hover',
      'muted-white',
      'white',
      'muted-dark',
      'dark',
      'gh-green'
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
      { icon: 'fa-download', isFab: false },
      { icon: 'fa-globe', isFab: false},
      { icon: 'fa-sign-out-alt', isFab: false },
      { icon: 'fa-code-branch', isFab: false },
      { icon: 'fa-laptop', isFab: false },
      { icon: 'fa-cloud', isFab: false },
      { icon: 'fa-cog', isFab: false },
      { icon: 'fa-laptop', isFab: false },
      { icon: 'fa-search', isFab: false },
      { icon: 'fa-times', isFab: false },
      { icon: 'fa-file-medical', isFab: false },
      { icon: 'fa-file-signature', isFab: false },
      { icon: 'fa-file-excel', isFab: false }
    ];

    this.dataDropdownExample = [
      { key: 'orange', value: 'Orange' },
      { key: 'banana', value: 'Banane' },
      { key: 'cherry', value: 'Cerise' },
      { key: 'pear', value: 'Poire' },
    ];

    this.dataDropdownExampleTwo = [
      { key: 'carrot', value: 'Carotte' },
      { key: 'leek', value: 'Poireau' },
      { key: 'squash', value: 'Courge' },
      { key: 'potato', value: 'Patate' },
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
      { name: 'Prog Objet', teacher: 'M. Andary', language: 'Java' },
      { name: 'S&T', teacher: 'M. Patrou', language: 'Scala' },
      { name: 'Langage Web', teacher: 'M. Nicart', language: 'JavaScript' },
    ];
  }


  openFontAwesome() {
    return this.electronService.shellOpenExternal('https://fontawesome.com/icons?d=gallery');
  }

  setCheckValue() {
    return this.cbValue = !this.cbValue;
  }

  displayCbValue() {
    return this.toastr.info(this.cbValue ? 'Coché' : 'Décoché', 'Information');
  }

  primary() {
    return this.toastr.info(this.translateService.instant('BUTTON.PRIMARY'),
      this.translateService.instant('INFORMATION'));
  }

  success() {
    return this.toastr.success(this.translateService.instant('BUTTON.SUCCESS'),
      this.translateService.instant('SUCCESS'));
  }

  danger() {
    return this.toastr.error(this.translateService.instant('BUTTON.DANGER'),
      this.translateService.instant('DANGER'));
  }

  menubar() {
    return this.toastr.info(this.translateService.instant('ICONBUTTON.MENUBAR'),
      this.translateService.instant('MENUBAR'));
  }

  githubButtonClicked() {
    return this.toastr.success(this.translateService.instant('ICONBUTTON.GITHUB'),
      this.translateService.instant('ICONBUTTON.GITHUB'));
  }

  gitlabButtonClicked() {
    return this.toastr.info(this.translateService.instant('ICONBUTTON.GITLAB'),
      this.translateService.instant('ICONBUTTON.GITLAB'));
  }

  testInput() {
    return this.toastr.info(this.inputValue.toString());
  }

  changeInputValue() {
    this.inputValue += 'add';
  }

  setLoading() {
    this.loading = !this.loading;
  }

  openRegularModal() {
    this.modalRegularVisible = true;
  }

  openFullscreenModal() {
    this.modalFullscreenVisible = true;
  }

  async openLoadingModal() {
    this.modalLoadingVisible = true;
    this.modalLoading = true;
    return new Promise(resolve => setTimeout(resolve, 3000))
      .then(() => {
        this.modalLoading = false;
      }
    );
  }

  openInfoBar() {
    this.infoBarVisible = true;
  }

  closeInfoBar() {
    this.infoBarVisible = false;
  }

  displayModalInputValue() {
    return this.toastr.info(this.modalInputValue.toString());
  }

  checkIfCloseModal(event) {
    if (event.index === 0) {
      this.modalTabSelectedIndex = 1;
      this.modalFullscreenVisible = false;
    }
  }

  testInputNumber() {
    return this.toastr.info(this.inputValueNumber.toString());
  }

  setInputNumber() {
    this.inputValueNumber = 1000;
  }

  testDropdown() {
    return this.toastr.info(this.dropdownValue.toString());
  }

  testCopyButton() {
    return this.toastr.info('Contenu copié');
  }

  testAleatDropdown() {
    const Random = Math.floor(Math.random() * 4);
    this.dropdownValue = this.dataDropdownExample[Random].key;
    return Random;
  }

  showMessage(message: string) {
    return this.toastr.info(message);
  }

  testTextarea() {
    return this.toastr.info(this.textareaValue.toString());
  }

  setTextareaValue() {
    this.textareaValue += 'Lorem ipsum...';
  }

  testCommitTextarea() {
    return this.toastr.info(this.translateService.instant('SUMMARY') + ' : ' + this.commitTextAreaValue.summary.toString()
      + '\n' + this.translateService.instant('DESCRIPTION') + ' : ' + this.commitTextAreaValue.desc.toString());
  }

  setCommitTextareaValue() {
    this.commitTextAreaValue.summary += 'Lorem ipsum...';
    this.commitTextAreaValue.desc += 'dolor sit amet...';
  }
}
