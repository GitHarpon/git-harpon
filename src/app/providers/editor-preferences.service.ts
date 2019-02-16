import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EditorPreferencesService {
    languages: any[];
    themes: any[];
    fontFamilies: any[];
    fontSize: Number;
    tabSize: Number;
    lineNumbers: Boolean;
    preferences: any;
    preferencesSubject = new Subject<any>();


    constructor() {
        this.languages = [
            { value: 'typescript', text: 'TypeScript (Default)' },
            { value: 'javascript', text: 'JavaScript' },
            { value: 'java', text: 'Java' },
            { value: 'html', text: 'HTML' },
            { value: 'css', text: 'CSS' },
        ];
        this.themes = [
            { value: 'vs', text: 'Light (Default)' },
            { value: 'vs-dark', text: 'Dark' }
        ];
        this.fontFamilies = [
            { value: 'Consolas, \'Courier New\', monospace', text: 'Consolas (Default)' },
            { value: 'Courier New, \'Courier New\', monospace', text: 'Courier New' },
            { value: 'Lucida Console, \'Courier New\', monospace', text: 'Lucida Console' },
            { value: 'Lucida Sans Typewriter, \'Courier New\', monospace', text: 'Lucida Sans Typewriter' },
            { value: 'MS Gothic, \'Courier New\', monospace', text: 'MS Gothic' },
            { value: 'NSimSun, \'Courier New\', monospace', text: 'NSimSun' },
            { value: 'OCR A Extended, \'Courier New\', monospace', text: 'OCR A Extended' },
            { value: 'SimSun-ExtB, \'Courier New\', monospace', text: 'SimSun-ExtB' },
        ];
        this.fontSize = 12;
        this.tabSize = 4;
        this.lineNumbers = true;
        this.preferences = {
            language: this.languages[0].value,
            theme: this.themes[0].value,
            fontFamily: this.fontFamilies[0].value,
            fontSize: this.fontSize,
            tabSize: this.tabSize,
            lineNumbers: this.lineNumbers
        };
        this.emitPreferencesSubject();
    }

    emitPreferencesSubject() {
        this.preferencesSubject.next(this.preferences);
    }

    setLanguage(newLanguage) {
        this.preferences.language = newLanguage;
        this.emitPreferencesSubject();
    }

    setTheme(newTheme) {
        this.preferences.theme = newTheme;
        this.emitPreferencesSubject();
    }

    setFontFamily(newFontFamily) {
        this.preferences.fontFamily = newFontFamily;
        this.emitPreferencesSubject();
    }

    setFontSize(newFontSize) {
        this.preferences.fontSize = newFontSize;
        this.emitPreferencesSubject();
    }

    setTabSize(newTabSize) {
        this.preferences.tabSize = newTabSize;
        this.emitPreferencesSubject();
    }

    setLineNumbers(newLineNumbers) {
        this.preferences.lineNumbers = newLineNumbers;
        this.emitPreferencesSubject();
    }
}
