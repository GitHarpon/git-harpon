import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from '@ngx-translate/core';

export class MockTranslateLoader implements TranslateLoader {
    translations: any = { 'CARDS_TITLE': 'This is a test' };

    getTranslation(lang: string): Observable<any> {
        return this.translations;
    }
}
