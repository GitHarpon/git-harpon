import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ContainerComponent } from '../../components/container/container.component';
import { InputComponent } from '../../components/input/input.component';
import { InputNumberComponent } from '../../components/input-number/input-number.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ButtonComponent } from '../../components/button/button.component';
import { MonacoEditorWrapperComponent } from '../../components/monaco-wrapper/monaco-editor-wrapper.component';
import { CopyButtonComponent } from '../../components/copy-button/copy-button.component';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';
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
import { ToolboxComponent } from './toolbox.component';
import { DebugElement } from '@angular/core';
import { ContextMenuModule} from 'ngx-contextmenu';
import { By } from '@angular/platform-browser';

describe('ToolboxComponent', () => {
  /* tslint:disable */
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;
  let inputEl: DebugElement;
  let buttonEl: DebugElement;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        InputComponent,
        InputNumberComponent,
        ToolboxComponent,
        ModalComponent,
        FooterComponent,
        LoaderComponent,
        InfoBarComponent,
        ButtonComponent,
        CopyButtonComponent,
        AccordionComponent,
        CheckboxComponent,
        DropdownComponent,
        IconButtonComponent,
        MonacoEditorWrapperComponent
        // ContextMenuComponent
      ],
      imports: [
        FormsModule,
        ContextMenuModule,
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
    fixture = TestBed.createComponent(ToolboxComponent);
    component = fixture.componentInstance;
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  // it('tests the ngOnInit function', () => {
  //   component.ngOnInit();
  //   expect(component.cbValue).toBeDefined();
  //   expect(component.inputValue).toBeDefined();
  //   expect(component.inputEmptyValue).toBeDefined();

  //   expect(component.modalTabSelectedIndex).toBeDefined();
  //   expect(component.passwordInput).toBeDefined();

  //   expect(component.inputValueNumber).toBeDefined();
  //   expect(component.inputMinMaxValueNumber).toBeDefined();
  //   expect(component.max).toBeDefined();
  //   expect(component.min).toBeDefined();
  //   expect(component.dropdownValue).toBeDefined();

  //   expect(component.darkColorList).toBeDefined();
  //   expect(component.lightColorList).toBeDefined();
  //   expect(component.independentColorList).toBeDefined();
  //   expect(component.fsList).toBeDefined();
  //   expect(component.faList).toBeDefined();
  //   expect(component.dataDropdownExample).toBeDefined();
  //   expect(component.dataDropdownExampleTwo).toBeDefined();
  //   expect(component.dataDropdownExampleTwo).toBeDefined();
  //   expect(component.dataDropdownExampleTwo).toBeDefined();
  // });
});
