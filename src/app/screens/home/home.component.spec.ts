import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockTranslateService } from '../../models/MockTranslateService';
import * as child from 'child_process';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        FormsModule,
        child
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    //inputEl = fixture.debugElement.query(By.css('input.gh-input'));
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  /*it('tests the component value', fakeAsync(() => {
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
  });*/
});
