import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguagePreferencesService {
    languages: any[];
    preferences: string;
    preferencesSubject = new Subject<string>();

    constructor(private translate: TranslateService) {
        this.languages = [
            { key: 'fr', value: this.translate.instant('FRENCH') },
            { key: 'en', value: this.translate.instant('ENGLISH') },
        ];

        // Ici ca sera pas forcement ça en fonction du local storage encore uen fois
        this.preferences = this.languages[0].value;
        this.emitPreferencesSubject();
    }

    emitPreferencesSubject() {
        this.preferencesSubject.next(this.preferences);
    }

    setLanguage(newLanguage) {
        this.preferences = newLanguage;
        if (this.preferences === this.translate.instant('FRENCH')) {
            this.translate.setDefaultLang('fr');
        } else {
            this.translate.setDefaultLang('en');
        }
        this.emitPreferencesSubject();
    }

    getLanguages() {
        return this.languages;
    }

}
