import { async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';
import { PreferencesComponent } from './preferences.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
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
import { ElectronService } from '../../providers/electron.service';
import { MockElectronService } from '../../models/MockElectronService';
import { TerminalManagerService } from '../../providers/terminal-manager.service';
import { MockTerminalManagerService } from '../../models/MockTerminalManagerService';
import { Router } from '@angular/router';
import { MockRouter } from '../../models/MockRouter';

describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;

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
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the theme switch light', (done) => {
    component.currentTheme = 'light';
    component.saveChangedUIPreferences().then((result) => {
      expect(result).toBeTruthy();
      done();
    });
    expect(component.currentTheme).toEqual('light');
  });

  it('tests the theme switch dark', (done) => {
    component.currentTheme = 'dark';
    component.saveChangedUIPreferences().then((result) => {
      expect(result).toBeTruthy();
      done();
    });
    expect(component.currentTheme).toEqual('dark');
  });

  it('tests the current terminal name', () => {
    const Terminal = { name: 'Terminal', cmd: 'TerminalCmd' };
    component.terminalPreferencesService.setCurrentTerminal(Terminal);
    expect(component.terminalPreferencesService.terminalName).toEqual(Terminal.name);
  });

  it('tests the current terminal cmd', () => {
    const Terminal = { name: 'Terminal', cmd: 'TerminalCmd' };
    component.terminalPreferencesService.setCurrentTerminal(Terminal);
    expect(component.terminalPreferencesService.terminalCmd).toEqual(Terminal.cmd);
  });

  // it('tests the terminal opening', () => {

  // });
});
