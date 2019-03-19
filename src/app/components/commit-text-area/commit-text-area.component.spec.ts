import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CommitTextAreaComponent } from './commit-text-area.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { FormsModule } from '@angular/forms';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TextAreaComponent', () => {
  /* tslint:disable */
  let component: CommitTextAreaComponent;
  let fixture: ComponentFixture<CommitTextAreaComponent>;
  let firstTextareaEl: DebugElement;
  let sndTextareaEl: DebugElement;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitTextAreaComponent ],
      imports: [
        FormsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        }),
      ],
      providers: [
        {
            provide: ThemePreferencesService,
            useClass: MockThemePreferencesService
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitTextAreaComponent);
    component = fixture.componentInstance;
    firstTextareaEl = fixture.debugElement.query(By.css('.gh-commit-textarea-summary'));
    sndTextareaEl = fixture.debugElement.query(By.css('.gh-commit-textarea-desc'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tests the summaryValue', fakeAsync(() => {
    const Content = 'axuluphrum';
    component.summaryValue = Content;
    fixture.detectChanges();
    firstTextareaEl.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(firstTextareaEl.nativeElement.value).toEqual(Content);
  }));

  it('tests the descValue', fakeAsync(() => {
    const Content = 'axuluphrum';
    component.descValue = Content;
    fixture.detectChanges();
    sndTextareaEl.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(sndTextareaEl.nativeElement.value).toEqual(Content);
  }));

  it('tests the getDescPlaceholderTranslation function', () => {
    const Content = 'something';
    component.descPlaceholder = Content;
    const Translation = component.getDescPlaceholderTranslation();
    expect(Translation).toBe(component.descPlaceholder.toUpperCase());
  });

  it('tests the getSummaryPlaceholderTranslation function', () => {
    const Content = 'something';
    component.summaryPlaceholder = Content;
    const Translation = component.getSummaryPlaceholderTranslation();
    expect(Translation).toBe(component.summaryPlaceholder.toUpperCase());
  });
});
