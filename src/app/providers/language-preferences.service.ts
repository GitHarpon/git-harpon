import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguagePreferencesService {
    languages: any[];
    preferences: any;
    preferencesSubject = new Subject<any>();

    constructor(private translate: TranslateService) {
        this.languages = [
            { key: 'fr', value: this.translate.instant('FRENCH') },
            { key: 'en', value: this.translate.instant('ENGLISH') },
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

    getLanguages() {
        return this.languages;
    }

}
