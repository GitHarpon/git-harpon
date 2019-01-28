import { browser, element, by } from 'protractor';

/* tslint:disable */
export class GitHarponPage {
  navigateTo(route: string) {
    return browser.get(route);
  }
}
