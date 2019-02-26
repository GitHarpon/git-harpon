export class MockTranslateService {
    instant(text: string) {
        return text;
    }

    getDefaultLang() {
        const DefaultLang = 'fr';
        return DefaultLang;
    }
}
