import { Injectable, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorage } from 'ngx-store';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ThemePreferencesService {
    @LocalStorage({ key: 'themePreference' }) themePreference = '';
    themePreferenceSubject: Subject<string>;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.themePreferenceSubject = new Subject<string>();
        if (this.themePreference.length === 0) {
            this.setThemePreference('dark');
        } else {
            this.document.body.classList.add((this.themePreference === 'light' ? 'light' : 'dark') + '-body');
            this.document.body.classList.remove((this.themePreference === 'light' ? 'dark' : 'light') + '-body');
        }
    }

    emitThemePreferencesSubject() {
        this.themePreferenceSubject.next(this.themePreference);
    }

    setThemePreference(newTheme: string) {
        this.themePreference = newTheme;
        this.document.body.classList.add((newTheme === 'light' ? 'light' : 'dark') + '-body');
        this.document.body.classList.remove((newTheme === 'light' ? 'dark' : 'light' + '-body'));
        this.emitThemePreferencesSubject();
    }
}
