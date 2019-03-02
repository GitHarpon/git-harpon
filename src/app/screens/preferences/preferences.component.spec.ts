import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferencesComponent } from './preferences.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { ModalComponent } from '../../components/modal/modal.component';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { MockLanguagePreferencesService } from '../../models/MockLanguagePreferenceService';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ButtonComponent } from '../../components/button/button.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { AppRoutingModule } from '../../app-routing.module';
import { HomeComponent } from '../home/home.component';
import { ToolboxComponent } from '../toolbox/toolbox.component';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { ContainerComponent } from '../../components/container/container.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { InputComponent } from '../../components/input/input.component';
import { CopyButtonComponent } from '../../components/copy-button/copy-button.component';
import { InputNumberComponent } from '../../components/input-number/input-number.component';
import { ResizableModule } from 'angular-resizable-element';
import { ContextMenuComponent, ContextMenuModule } from 'ngx-contextmenu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { LanguagePreferencesService } from '../../providers/language-preferences.service';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Router } from '@angular/router';
import { MockRouter } from '../../models/MockRouter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElectronService } from '../../providers/electron.service';
import { MockElectronService } from '../../models/MockElectronService';
import { TerminalManagerService } from '../../providers/terminal-manager.service';
import { MockTerminalManagerService } from '../../models/MockTerminalManagerService';

describe('PreferencesComponent', () => {
  /* tslint:disable */
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;
  let langPrefService: LanguagePreferencesService;
  let terminalService: TerminalManagerService;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PreferencesComponent,
        ModalComponent,
        DropdownComponent,
        ButtonComponent,
        LoaderComponent,
        HomeComponent,
        ToolboxComponent,
        IconButtonComponent,
        ContainerComponent,
        FooterComponent,
        CheckboxComponent,
        AccordionComponent,
        InfoBarComponent,
        InputComponent,
        CopyButtonComponent,
        InputNumberComponent,
      ],
      imports: [
        FormsModule,
        ContextMenuModule,
        CommonModule,
        MatTabsModule,
        NgbModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        MatIconModule,
        AppRoutingModule,
        ResizableModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useClass: MockTranslateLoader},
        }),
        NgScrollbarModule
      ],
      providers: [
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        {
          provide: ThemePreferencesService,
          useClass: MockThemePreferencesService
        },
        {
          provide: LanguagePreferencesService,
          useClass: MockLanguagePreferencesService,
        },
        {
          provide: ElectronService,
          useClass: MockElectronService,
        },
        {
          provide: TerminalManagerService,
          useClass: MockTerminalManagerService
        },
        ToastrService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesComponent);
    component = fixture.componentInstance;
    langPrefService = TestBed.get(LanguagePreferencesService);
    terminalService = TestBed.get(TerminalManagerService);
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the ngOnInit function', () => {
    component.ngOnInit();
    expect(component.languageSubscription.closed).toBeFalsy();
    expect(component.themePrefSubscription.closed).toBeFalsy();
    expect(component.terminalSubscription.closed).toBeFalsy();
  });

  it('tests the checkIfCloseModal function with index equals to 0', (done) => {
    const Event = { index: 0 };
    component.checkIfCloseModal(Event).then((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('tests the checkIfCloseModal function with index greater than 0', (done) => {
    const Event = { index: 1 };
    component.checkIfCloseModal(Event).then((result) => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('tests the switchLanguage function', () => {
     const Lang = 'fr';
     component.dropdownLanguageValue = Lang;
     component.switchLanguage();
     expect(langPrefService.preferences).toEqual(Lang);
  });

  it('tests the switchTerminal function', () => {
    const TerminalCmd = 'terminator';
    component.dropdownTerminalValue = TerminalCmd;
    component.switchTerminal();
    expect(terminalService.terminalCmd).toBe(TerminalCmd);
  });

  it('tests the saveChangedPreferences function', (done) => {
     const Lang = 'fr';
     const TerminalCmd = 'terminator';
     component.dropdownLanguageValue = Lang;
     component.dropdownTerminalValue = TerminalCmd;
     component.saveChangedPreferences().then((result) => {
       expect(result).toBeTruthy();
       done();
     });
     expect(langPrefService.preferences).toEqual(Lang);
     expect(terminalService.terminalName).toEqual(TerminalCmd);
     expect(component.loading).toBeFalsy();
  });

  it('tests the saveChangedUIPreferences function with light theme', (done) => {
    const Theme = 'light';
    component.currentTheme = Theme;
    component.saveChangedUIPreferences().then((result) => {
      expect(result).toBeTruthy();
      done();
    });
    expect(component.currentTheme).toEqual(Theme);
  });

  it('tests the saveChangedUIPreferences function with dark theme', (done) => {
    const Theme = 'dark';
    component.currentTheme = Theme;
    component.saveChangedUIPreferences().then((result) => {
      expect(result).toBeTruthy();
      done();
    });
    expect(component.currentTheme).toEqual(Theme);
  });



  it('tests the ngOnDestroy function', () => {
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.languageSubscription.closed).toBeTruthy();
    expect(component.themePrefSubscription.closed).toBeTruthy();
    expect(component.terminalSubscription.closed).toBeTruthy();
  });
});
