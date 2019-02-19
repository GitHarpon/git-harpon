import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ServiceResult } from '../models/ServiceResult';

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
        if (this.translate.getDefaultLang() === 'fr') {
            this.preferences = this.languages[0].value;
        } else {
            this.preferences = this.languages[1].value;
        }

        this.emitPreferencesSubject();
    }

    emitPreferencesSubject() {
        this.preferencesSubject.next(this.preferences);
    }

    setLanguage(newLanguage) {
        return new Promise<ServiceResult>((resolve) => {
            this.preferences = newLanguage;
            if (this.preferences === this.languages[0].key) {
                localStorage.removeItem('lang');
                this.translate.setDefaultLang('fr');
            } else {
                localStorage.setItem('lang', 'en');
                this.translate.setDefaultLang('en');
            }
            resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                this.translate.instant('CHANGE_PREFERENCE')));
            this.emitPreferencesSubject();
        });
    }

    getLanguages() {
        return this.languages;
    }

}
