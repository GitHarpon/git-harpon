import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorage } from 'ngx-store';

@Injectable()
export class ThemePreferencesService {
    @LocalStorage({ key: 'themePreference' }) themePreference = '';
    themePreferenceSubject: Subject<string>;

    constructor() {
        this.themePreferenceSubject = new Subject<string>();
        if (this.themePreference.length === 0) {
            this.setThemePreference('dark');
        }
    }

    emitThemePreferencesSubject() {
        this.themePreferenceSubject.next(this.themePreference);
    }

    setThemePreference(newTheme: string) {
        this.themePreference = newTheme;
        this.emitThemePreferencesSubject();
    }
}
