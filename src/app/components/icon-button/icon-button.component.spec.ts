import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ContainerComponent } from '../../components/container/container.component';
import { InputComponent } from '../../components/input/input.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FooterComponent } from '../../components/footer/footer.component';
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
import { IconButtonComponent } from './icon-button.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('IconButtonComponent', () => {
  /* tslint:disable */
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;
  let inputEl: DebugElement;
  let buttonEl: DebugElement;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        InputComponent,
        IconButtonComponent,
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
    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    buttonEl = fixture.debugElement.query(By.css('.gh-icon-button'));
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the execClick function', () => {
    const Evt = new Event('click');
    spyOn(component.buttonClicked, 'emit');
    buttonEl.nativeElement.dispatchEvent(Evt);
    fixture.detectChanges();
    expect(component.buttonClicked.emit).toHaveBeenCalledWith(Evt);
  });

  it('tests the getValueTranslation function', () => {
    const Content = 'something';
    component.value = Content;
    const Translation = component.getValueTranslation();
    expect(Translation).toBe(component.value.toUpperCase());
  });

  it('tests the getTooltipTranslation function', () => {
    const Content = 'something';
    component.tooltipValue = Content;
    const Translation = component.getTooltipTranslation();
    expect(Translation).toBe(component.tooltipValue.toUpperCase());
  });
});
