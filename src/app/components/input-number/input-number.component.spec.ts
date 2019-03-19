import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ContainerComponent } from '../../components/container/container.component';
import { InputComponent } from '../../components/input/input.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { MatTabsModule } from '@angular/material';
import { ResizableModule } from 'angular-resizable-element';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { ToastrModule } from 'ngx-toastr';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { InputNumberComponent } from './input-number.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InputNumberComponent', () => {
  /* tslint:disable */
  let component: InputNumberComponent;
  let fixture: ComponentFixture<InputNumberComponent>;
  let inputEl: DebugElement;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        InputComponent,
        InputNumberComponent,
        ModalComponent,
        FooterComponent,
        IconButtonComponent,
        LoaderComponent,
        InfoBarComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        }),
        MatTabsModule,
        ResizableModule,
        NgbModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        {
            provide: ThemePreferencesService,
            useClass: MockThemePreferencesService
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumberComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input.gh-input'));
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the component value', fakeAsync(() => {
    const Content = 5;
    component.value = Content;
    fixture.detectChanges();
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toEqual(Content.toString());
  }));

  it('tests the component value with value greater than max', fakeAsync(() => {
    const Content = 15;
    const Max = 10;
    const Evt = new Event('input');
    component.ngOnInit();
    component.max = Max;
    component.value = Content;
    fixture.detectChanges();
    inputEl.nativeElement.dispatchEvent(Evt);
    tick();
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe(Max.toString());
  }));

  it('tests the component value with value lower than min', fakeAsync(() => {
    const Content = -5;
    const Min = 0;
    const Evt = new Event('input');
    component.ngOnInit();
    component.min = Min;
    component.value = Content;
    fixture.detectChanges();
    inputEl.nativeElement.dispatchEvent(Evt);
    tick();
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe(Min.toString());
  }));

  it('tests the ngOnInit function', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('tests the getPlaceholderTranslation function', () => {
    const Content = 'something';
    component.placeholder = Content;
    const Translation = component.getPlaceholderTranslation();
    expect(Translation).toBe(component.placeholder.toUpperCase());
  });
});
