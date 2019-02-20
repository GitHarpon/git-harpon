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

        this.preferences = localStorage.getItem('lang');
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

    // getLanguages() {
    //     return this.languages;
    // }

}
