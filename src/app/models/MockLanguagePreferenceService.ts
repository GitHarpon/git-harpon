import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export class MockLanguagePreferencesService {
    languages: any[];
    preferences: string;
    preferencesSubject = new Subject<string>();

    constructor() {
        this.preferences = 'fr';

        this.emitPreferencesSubject();
    }

    emitPreferencesSubject() {
        this.preferencesSubject.next(this.preferences);
    }

    setLanguage(newLanguage) {
        this.preferences = newLanguage;
        this.emitPreferencesSubject();
        return this.preferences;
    }
}
