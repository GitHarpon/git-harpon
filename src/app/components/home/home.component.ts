import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { ToastrService } from 'ngx-toastr';
import { EditorPreferencesService } from '../../providers/editor-preferences.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public model: string;
  public filename: string;
  public preferences: any;
  public preferencesSubscription: Subscription;
  public languages: any[];
  public themes: any[];
  public fontFamilies: any[];
  public lineNumbers: Boolean;


  constructor(private electronService: ElectronService,
    private editorPreferencesService: EditorPreferencesService,
    private toastr: ToastrService) {
    this.preferencesSubscription = this.editorPreferencesService.preferencesSubject.subscribe(
      (preferences: any) => {
        this.preferences = {
          language: preferences.language,
          theme: preferences.theme,
          fontFamily: preferences.fontFamily,
          fontSize: preferences.fontSize,
          tabSize: preferences.tabSize,
          lineNumbers: preferences.lineNumbers
        };
      }
    );
    this.editorPreferencesService.emitPreferencesSubject();
    this.languages = this.editorPreferencesService.languages;
    this.themes = this.editorPreferencesService.themes;
    this.fontFamilies = this.editorPreferencesService.fontFamilies;
    this.lineNumbers = this.editorPreferencesService.lineNumbers;
  }

  ngOnInit() {
    this.model = '';
    this.filename = 'Choisissez un fichier...';
  }

  chooseFile() {
    const FILEPATH = this.electronService.remote.dialog.showOpenDialog({
      properties: ['openFile']
    });
    if (FILEPATH !== undefined) {
      this.filename = this.electronService.path.basename(FILEPATH[0]);
      this.electronService.fs.readFile(FILEPATH[0], 'UTF-8', (err, data) => {
        if (err) {
        } else {
          this.model = data;
        }
      });
    }
  }

  onLanguageChange(event) {
    this.editorPreferencesService.setLanguage(event.target.value);
  }

  onThemeChange(event) {
    this.editorPreferencesService.setTheme(event.target.value);
  }

  onFontFamilyChange(event) {
    this.editorPreferencesService.setFontFamily(event.target.value);
  }

  onFontSizeChange(event) {
    this.editorPreferencesService.setFontSize(event.target.value);
  }

  onTabSizeChange(event) {
    this.editorPreferencesService.setTabSize(event.target.value);
  }

  onLineNumbersChange(event) {
    this.editorPreferencesService.setLineNumbers(this.lineNumbers);
  }

  ngOnDestroy() {
  }
}
