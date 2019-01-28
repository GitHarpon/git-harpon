import { GitHarponPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('git-harpon App', () => {
  let page: AngularElectronPage;

  beforeEach(() => {
    page = new AngularElectronPage();
  });

  it('should display message saying App works !', () => {
    page.navigateTo('/');
    expect(element(by.css('app-home h1')).getText()).toMatch('App works !');
  });
});
