import { async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';

describe('InputComponent', () => {
   /* tslint:disable */
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let inputEl: DebugElement;
   /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [
        FormsModule
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        {
          provide: ThemePreferencesService,
          useClass: MockThemePreferencesService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input.gh-input'));
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the component value', fakeAsync(() => {
    const Content = 'axuluphrum';
    component.value = Content;
    fixture.detectChanges();
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toEqual(Content);
  }));

  it('tests the getPlaceholderTranslation function', () => {
    const Content = 'something';
    component.placeholder = Content;
    const Translation = component.getPlaceholderTranslation();
    expect(Translation).toBe(component.placeholder.toUpperCase());
  });
});
