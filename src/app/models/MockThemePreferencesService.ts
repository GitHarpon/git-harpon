import { Subject } from 'rxjs';

export class MockThemePreferencesService {
    themePreference = '';
    themePreferenceSubject: Subject<string>;

    constructor() {
        this.themePreferenceSubject = new Subject<string>();
        this.themePreference = 'dark';
    }

    emitThemePreferencesSubject() {
        this.themePreferenceSubject.next(this.themePreference);
    }

    setThemePreference(newTheme: string) {
        this.themePreference = newTheme;
        this.emitThemePreferencesSubject();
    }
}
