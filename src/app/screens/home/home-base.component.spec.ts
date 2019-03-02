import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ElectronService } from '../../providers/electron.service';
import { MockElectronService } from '../../models/MockElectronService';
import { GitService } from '../../providers/git.service';
import { MockGitService } from '../../models/MockGitService';
import { ContainerComponent } from '../../components/container/container.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { MatTabsModule, TooltipComponent } from '@angular/material';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RouterModule, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { MockRouter } from '../../models/MockRouter';
import { MockTerminalManagerService } from '../../models/MockTerminalManagerService';
import { TerminalManagerService } from '../../providers/terminal-manager.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let terminalService: TerminalManagerService;
  let originalTimeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ContainerComponent,
        InputComponent,
        ButtonComponent,
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
          provide: ElectronService,
          useClass: MockElectronService
        },
        {
          provide: GitService,
          useClass: MockGitService
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    terminalService = TestBed.get(TerminalManagerService);
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the pullButtonClicked function', () => {
    expect(component.pullButtonClicked()).toBeTruthy();
  });

  it('tests the pushButtonClicked function', () => {
    expect(component.pushButtonClicked()).toBeTruthy();
  });

  it('tests the branchButtonClicked function', () => {
    expect(component.branchButtonClicked()).toBeTruthy();
  });

  it('tests the openTerminal function with success', (done) => {
    const TerminalName = 'terminator';
    terminalService.terminalName = TerminalName;
    component.openTerminal().then((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('tests the openTerminal function with success', (done) => {
    const TerminalName = 'not-a-terminal';
    terminalService.terminalName = TerminalName;
    component.openTerminal().then((result) => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('tests the openPreferences function', (done) => {
    component.openPreferences().then((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('tests the openProjectModal function', () => {
    const TabSelectedIndex = 0;
    component.openProjectModal(TabSelectedIndex);
    expect(component.projectModalTabSelectedIndex).toBe(TabSelectedIndex);
    expect(component.projectModalVisible).toBeTruthy();
  });

  it('tests the displaySearchInputValue function with valid repo name', () => {
    const RepoName = '/repo';
    component.repoName = RepoName;
    expect(component.displaySearchInputValue()).toBeTruthy();
  });

  it('tests the displaySearchInputValue function with invalid repo name', () => {
    expect(component.displaySearchInputValue()).toBeFalsy();
  });

  it('tests the validate function with bad status', () => {
    const TestEvent: ResizeEvent =
    {
      edges:
      {
        right: 2
      },
      rectangle:
      {
        top: 50,
        bottom: 750,
        left: 0,
        right: 220,
        height: 700,
        width: 5
      }
    };
    component.dimensions = 20;
    expect(component.validate(TestEvent)).toBeFalsy();
  });

  it('tests the validate function with good status', () => {
    const TestEvent: ResizeEvent =
    {
      edges:
      {
        right: 2
      },
      rectangle:
      {
        top: 50,
        bottom: 750,
        left: 0,
        right: 220,
        height: 700,
        width: 220
      }
    };
    component.dimensions = 20;
    expect(component.validate(TestEvent)).toBeTruthy();
  });

  it('tests the onResizeEnd function', () => {
    const TestEvent: ResizeEvent =
    {
      edges:
      {
        right: 2
      },
      rectangle:
      {
        top: 50,
        bottom: 800,
        left: 0,
        right: 300,
        height: 500,
        width: 220
      }
    };
    component.onResizeEnd(TestEvent);
    expect(component.style).not.toBeUndefined();
  });
});
