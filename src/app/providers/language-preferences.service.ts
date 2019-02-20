import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguagePreferencesService {
    languages: any[];
    preferences: string;
    preferencesSubject = new Subject<string>();

    constructor(private translate: TranslateService) {

        if (localStorage.getItem('lang') === null
                || localStorage.getItem('lang') === 'fr') {
            this.preferences = 'fr';
        } else {
            this.preferences = 'en';
        }

        this.emitPreferencesSubject();
    }

    emitPreferencesSubject() {
        this.preferencesSubject.next(this.preferences);
    }

    setLanguage(newLanguage) {
        localStorage.setItem('lang', newLanguage);
        this.translate.setDefaultLang(newLanguage);
        this.preferences = newLanguage;
        this.emitPreferencesSubject();
    }
}
