import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ContainerComponent } from '../../components/container/container.component';
import { InputComponent } from '../../components/input/input.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { MatTabsModule, TooltipComponent } from '@angular/material';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { ToastrModule } from 'ngx-toastr';
import { DebugElement } from '@angular/core';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { CheckboxComponent } from './checkbox.component';
import { By } from '@angular/platform-browser';

describe('CheckboxComponent', () => {
  /* tslint:disable */
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let checkboxEl: DebugElement;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        InputComponent,
        CheckboxComponent,
        ModalComponent,
        FooterComponent,
        IconButtonComponent,
        LoaderComponent,
        InfoBarComponent
      ],
      imports: [
        FormsModule,
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
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    checkboxEl = fixture.debugElement.query(By.css('.gh-checkbox'));
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the getter and setter of value', () => {
    const Content = true;
    spyOn(component.valueChange, 'emit');
    component.value = Content;
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith(Content);
  });
});
