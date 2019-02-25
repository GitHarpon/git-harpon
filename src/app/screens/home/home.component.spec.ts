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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  var originalTimeout;

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
        ToastrService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
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

  it('tests the openProjectModal function', () => {
    const TabSelectedIndex = 0;
    component.openProjectModal(TabSelectedIndex);
    expect(component.projectModalTabSelectedIndex).toBe(TabSelectedIndex);
    expect(component.projectModalVisible).toBeTruthy();
  });

  it('tests the displaySearchInputValue function', () => {
    const RepoName = '/repo';
    component.repoName = RepoName;
    expect(component.displaySearchInputValue()).toBeTruthy();
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

  it('tests the updateFullPath function for init with all fields', () => {
    const Path = '/new';
    const RepoName = '/repo';
    component.initLocation = Path;
    component.initName = RepoName;
    component.updateFullPath();
    expect(component.fullPath).toBe('/new/repo');
  });

  it('tests the updateFullPath for init without location', () => {
    const Path = '';
    const RepoName = '/repo';
    component.initLocation = Path;
    component.initName = RepoName;
    component.updateFullPath();
    expect(component.fullPath).toBe('');
  });

  it('tests the initBrowse function', () => {
    component.initBrowse();
    expect(component.initLocation).toBe('/new');
  });

  it('tests the initSubmit function with valid path', (done) => {
    const OldPath = '/old';
    const NewPath = '/new';
    const RepoName = '/repo';
    const BoolModal = true;
    component.initLocation = NewPath;
    component.initName = RepoName;
    component.projectModalVisible = BoolModal;
    component.projectModalLoading = BoolModal;
    component.path = OldPath;
    component.initSubmit().then(() => {
      expect(component.projectModalVisible).toBeFalsy();
      expect(component.projectModalLoading).toBeFalsy();
      expect(component.initLocation).toBe('');
      expect(component.initName).toBe('');
      expect(component.fullPath).toBe('');
      expect(component.path).toBe(NewPath);
      done();
    });
  });

  it('tests the openBrowse function', () => {
    const Path = '/new';
    component.openBrowse();
    expect(component.openFolder).toBe(Path);
  });

  it('tests the openRepo function with changed and valid path', (done) => {
    const OldPath = '/old';
    const NewPath = '/new';
    const ProjectModalBoolean = true;
    component.path = OldPath;
    component.openFolder = NewPath;
    component.projectModalLoading = ProjectModalBoolean;
    component.projectModalVisible = ProjectModalBoolean;
    component.openRepo().then(() => {
      expect(component.openFolder).toBe('');
      expect(component.projectModalLoading).toBeFalsy();
      expect(component.projectModalVisible).toBeFalsy();
      done();
    });
  });

  it('tests the openRepo function with changed and invalid path', (done) => {
    const OldPath = '/old';
    const NewPath = '/invalid';
    const ProjectModalBoolean = true;
    component.path = OldPath;
    component.openFolder = NewPath;
    component.projectModalLoading = ProjectModalBoolean;
    component.projectModalVisible = ProjectModalBoolean;
    component.openRepo().then(() => {
      expect(component.openFolder).toBe('');
      expect(component.projectModalLoading).toBeFalsy();
      expect(component.projectModalVisible).toBeTruthy();
      done();
    });
  });

  it('tests the project initialization with invalid path', (done) => {
    const OldPath = '/old';
    const NewPath = '/invalidpath';
    const RepoName = '/repo';
    const BoolModal = true;
    component.initLocation = NewPath;
    component.initName = RepoName;
    component.updateFullPath();
    const FullPath = component.fullPath;
    component.projectModalVisible = BoolModal;
    component.projectModalLoading = BoolModal;
    component.path = OldPath;
    component.initSubmit().then(() => {
      expect(component.projectModalVisible).toBeTruthy();
      expect(component.projectModalLoading).toBeFalsy();
      expect(component.initLocation).toBe(NewPath);
      expect(component.initName).toBe(RepoName);
      expect(component.fullPath).toBe(FullPath);
      expect(component.path).toBe(OldPath);
      done();
    });
  });

  it('tests the openRepo function with unchanged path', (done) => {
    const OldPath = '/old';
    const ProjectModalBoolean = true;
    component.path = OldPath;
    component.openFolder = OldPath;
    component.projectModalVisible = ProjectModalBoolean;
    component.openRepo().then((result) => {
      expect(component.projectModalVisible).toBeTruthy();
      expect(result).toBeFalsy();
      done();
    });
  });

  it('tests the openRecentRepo function', (done) => {
    const OldPath = '/old';
    const NewPath = '/new';
    component.path = OldPath;
    component.openRecentRepo(NewPath).then(() => {
      expect(component.openFolder).toBe('');
      expect(component.projectModalLoading).toBeFalsy();
      expect(component.projectModalVisible).toBeFalsy();
      done();
    });
  });

  it('tests the closeRepo function', () => {
    const Path = '/new';
    const Repo = 'new';
    component.path = Path;
    component.repoName = Repo;
    component.closeRepo();
    expect(component.path).toBeUndefined();
    expect(component.repoName).toBeUndefined();
  });
});
