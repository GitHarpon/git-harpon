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
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { ToastrModule } from 'ngx-toastr';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { InfoBarComponent } from './info-bar.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InfoBarComponent', () => {
  /* tslint:disable */
  let component: InfoBarComponent;
  let fixture: ComponentFixture<InfoBarComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        InputComponent,
        InfoBarComponent,
        ModalComponent,
        FooterComponent,
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
    fixture = TestBed.createComponent(InfoBarComponent);
    component = fixture.componentInstance;
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });
});
