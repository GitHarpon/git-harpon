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
import { MatTabsModule, MatIconModule } from '@angular/material';
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
import { ContextMenuModule, ContextMenuComponent, ContextMenuService} from 'ngx-contextmenu';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { By } from '@angular/platform-browser';
import { ElectronService } from '../../providers/electron.service';
import { MockElectronService } from '../../models/MockElectronService';
import { ClipboardService, ClipboardModule } from 'ngx-clipboard';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { CommitTextAreaComponent } from '../../components/commit-text-area/commit-text-area.component';

describe('ToolboxComponent', () => {
  /* tslint:disable */
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;
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
        MonacoEditorWrapperComponent,
        TextAreaComponent,
        CommitTextAreaComponent
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
        ToastrModule.forRoot(),
        NgScrollbarModule,
        MatIconModule,
        ClipboardModule,
        ContextMenuModule,
        BrowserDynamicTestingModule
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
        {
          provide: ElectronService,
          useClass: MockElectronService
        },
        ClipboardService,
        ContextMenuService
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

  it('tests the ngOnInit function', () => {
    component.ngOnInit();
    expect(component.cbValue).toBeDefined();
    expect(component.inputValue).toBeDefined();
    expect(component.inputEmptyValue).toBeDefined();

    expect(component.modalTabSelectedIndex).toBeDefined();
    expect(component.passwordInput).toBeDefined();

    expect(component.inputValueNumber).toBeDefined();
    expect(component.inputMinMaxValueNumber).toBeDefined();
    expect(component.max).toBeDefined();
    expect(component.min).toBeDefined();
    expect(component.dropdownValue).toBeDefined();

    expect(component.darkColorList).toBeDefined();
    expect(component.lightColorList).toBeDefined();
    expect(component.independentColorList).toBeDefined();
    expect(component.fsList).toBeDefined();
    expect(component.faList).toBeDefined();
    expect(component.dataDropdownExample).toBeDefined();
    expect(component.dataDropdownExampleTwo).toBeDefined();
    expect(component.dataDropdownExampleTwo).toBeDefined();
    expect(component.dataDropdownExampleTwo).toBeDefined();
  });

  it('tests the openFontAwesome function', () => {
    const Result = component.openFontAwesome();

    expect(Result).toBeTruthy();
  });

  it('tests the setCheckValue function', () => {
    component.setCheckValue();

    expect(component.cbValue).toBeTruthy();
  });

  it('tests the displayCbValue function with cbValue', () => {
    component.cbValue = true;
    const Result = component.displayCbValue();

    expect(Result).toBeDefined();
  });

  it('tests the displayCbValue function without cbValue', () => {
    const Result = component.displayCbValue();

    expect(Result).toBeDefined();
  });

  it('tests the primary function', () => {
    const Result = component.primary();

    expect(Result).toBeDefined();
  });

  it('tests the success function', () => {
    const Result = component.success();

    expect(Result).toBeDefined();
  });

  it('tests the danger function', () => {
    const Result = component.danger();

    expect(Result).toBeDefined();
  });

  it('tests the menubar function', () => {
    const Result = component.menubar();

    expect(Result).toBeDefined();
  });

  it('tests the githubButtonClicked function', () => {
    const Result = component.githubButtonClicked();

    expect(Result).toBeDefined();
  });

  it('tests the gitlabButtonClicked function', () => {
    const Result = component.gitlabButtonClicked();

    expect(Result).toBeDefined();
  });

  it('tests the testInput function', () => {
    const Value = 'axuluphrum';
    component.inputValue = Value;
    const Result = component.testInput();

    expect(Result).toBeDefined();
  });

  it('tests the changeInputValue function', () => {
    const Value = 'texteto';
    component.inputValue = Value;
    component.changeInputValue();

    expect(component.inputValue).toEqual('textetoadd');
  });

  it('tests the setLoading function', () => {
    component.loading = true;
    component.setLoading();

    expect(component.loading).toEqual(false);
  });

  it('tests the openRegularModal function', () => {
    component.modalRegularVisible = false;
    component.openRegularModal();

    expect(component.modalRegularVisible).toEqual(true);
  });

  it('tests the openFullscreenModal function', () => {
    component.modalFullscreenVisible = false;
    component.openFullscreenModal();

    expect(component.modalFullscreenVisible).toEqual(true);
  });

  it('tests the openLoadingModal function with success', (done) => {
    component.openLoadingModal().then((result) => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('tests the openInfoBar function', () => {
    component.infoBarVisible = false;
    component.openInfoBar();

    expect(component.infoBarVisible).toEqual(true);
  });

  it('tests the closeInfoBar function', () => {
    component.infoBarVisible = true;
    component.closeInfoBar();

    expect(component.infoBarVisible).toEqual(false);
  });

  it('tests the displayModalInputValue function', () => {
    const Value = 'axuluphrum';
    component.modalInputValue = Value;
    const Result = component.displayModalInputValue();

    expect(Result).toBeDefined();
  });

  it('tests the checkIfCloseModal function zero case', () => {
    const Value = { index: 0 };
    component.checkIfCloseModal(Value);

    expect(component.modalTabSelectedIndex).toEqual(1);
    expect(component.modalFullscreenVisible).toEqual(false);
  });

  it('tests the checkIfCloseModal function not zero case', () => {
    const Value = { index: 1 };
    const MTSI = component.modalTabSelectedIndex;
    const MFV = component.modalFullscreenVisible;
    component.checkIfCloseModal(Value);

    expect(component.modalTabSelectedIndex).toEqual(MTSI);
    expect(component.modalFullscreenVisible).toEqual(MFV);
  });

  it('tests the testInputNumber function', () => {
    component.inputValueNumber = 1;
    const Result = component.testInputNumber();

    expect(Result).toBeDefined();
  });

  it('tests the setInputNumber function', () => {
    component.setInputNumber();

    expect(component.inputValueNumber).toEqual(1000);
  });

  it('tests the testDropdown function', () => {
    const Value = 'axuluphrum';
    component.dropdownValue = Value;
    const Result = component.testDropdown();

    expect(Result).toBeDefined();
  });

  it('tests the testCopyButton function', () => {
    const Value = 'Contenu copié';
    const Result = component.testCopyButton();

    expect(Result).toBeDefined();
  });

  it('tests the testAleatDropdown function', () => {
    const DataDropdownExample = [
      { key: 'orange', value: 'Orange' },
      { key: 'banana', value: 'Banane' },
      { key: 'cherry', value: 'Cerise' },
      { key: 'pear', value: 'Poire' },
    ];
    component.dataDropdownExample = DataDropdownExample;
    const Result = component.testAleatDropdown();

    expect(component.dropdownValue).toBe(component.dataDropdownExample[Result].key);
  });

  it('tests the testDropdown function', () => {
    const Value = 'axuluphrum';
    const Result = component.showMessage(Value);

    expect(Result).toBeDefined();
  });

  it('tests the testTextarea function', () => {
    const Value = 'axuluphrum';
    component.textareaValue = Value;
    const Result = component.testTextarea();

    expect(Result).toBeDefined();
  });

  it('tests the setTextareaValue function', () => {
    const Value = 'axuluphrum';
    const Expected = Value + 'Lorem ipsum...';
    component.textareaValue = Value;
    component.setTextareaValue();

    expect(component.textareaValue).toBe(Expected);
  });

  it('tests the testCommitTextarea function', () => {
    const Value = { summary: 'sum', desc: 'desc' };
    component.commitTextAreaValue = Value;
    const Result = component.testCommitTextarea();

    expect(Result).toBeDefined();
  });

  it('tests the setCommitTextareaValue function', () => {
    const Value = { summary: 'sum', desc: 'desc' };
    const ExpectedSummary = Value.summary + 'Lorem ipsum...';
    const ExpectedDesc = Value.desc + 'dolor sit amet...';
    component.commitTextAreaValue = Value;
    component.setCommitTextareaValue();

    expect(component.commitTextAreaValue.summary).toBe(ExpectedSummary);
    expect(component.commitTextAreaValue.desc).toBe(ExpectedDesc);
  });
});
