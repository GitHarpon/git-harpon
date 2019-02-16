import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LanguagePreferencesService {
    languages: any[];
    preferences: any;
    preferencesSubject = new Subject<any>();

    constructor() {
        this.languages = [
            { value: 'fr', text: 'Français' },
            { value: 'en', text: 'English' },
        ];

        this.preferences = {
            language: this.languages[0].value
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

}
