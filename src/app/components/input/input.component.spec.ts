import { async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

class MockTranslateService {
  instant(text: string) {
    return text;
  }
}

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let inputEl: DebugElement;

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
    const content = 'axuluphrum';
    component.value = content;
    fixture.detectChanges();
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toEqual(content);
  }));

  it('tests the getPlaceholderTranslation function', () => {
    const content = 'something';
    component.placeholder = content;
    const translation = component.getPlaceholderTranslation();
    expect(translation).toBe(component.placeholder.toUpperCase());
  });
});
