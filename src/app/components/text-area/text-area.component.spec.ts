import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TextAreaComponent } from './text-area.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { FormsModule } from '@angular/forms';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('TextAreaComponent', () => {
  /* tslint:disable */
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;
  let textareaEl: DebugElement;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAreaComponent ],
      imports: [
        FormsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        })
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
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    textareaEl = fixture.debugElement.query(By.css('textarea.gh-textarea'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tests the component value', fakeAsync(() => {
    const Content = 'axuluphrum';
    component.value = Content;
    fixture.detectChanges();
    textareaEl.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(textareaEl.nativeElement.value).toEqual(Content);
  }));

  it('tests the getPlaceholderTranslation function', () => {
    const Content = 'something';
    component.placeholder = Content;
    const Translation = component.getPlaceholderTranslation();
    expect(Translation).toBe(component.placeholder.toUpperCase());
  });
});
