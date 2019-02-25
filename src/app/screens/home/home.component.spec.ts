import { async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // let inputEl: DebugElement;

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
        LoaderComponent
      ],
      imports: [
        FormsModule,
        TranslateModule,
        MatTabsModule,
        ResizableModule,
        NgbModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
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
    // inputEl = fixture.debugElement.query(By.css('input.gh-input'));
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the pull button click', () => {
    expect(component.pullButtonClicked()).toBeTruthy();
  });

  it('tests the push button click', () => {
    expect(component.pushButtonClicked()).toBeTruthy();
  });

  it('tests the branch button click', () => {
    expect(component.branchButtonClicked()).toBeTruthy();
  });

  it('tests the display search input value', () => {
    const RepoName = '/repo';
    component.repoName = RepoName;
    expect(component.displaySearchInputValue()).toBeTruthy();
  });

  it('tests the validate resize with bad status', () => {
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

  it('tests the validate resize with good status', () => {
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

  it('tests the end of resize', () => {
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

  it('tests the update full path for init', () => {
    const Path = '/new';
    const RepoName = '/repo';
    component.initLocation = Path;
    component.initName = RepoName;
    component.updateFullPath();
    expect(component.fullPath).toBe('/new/repo');
  });

  it('tests the init browse', () => {
    component.initBrowse();
    expect(component.initLocation).toBe('/new');
  });

  it('tests the project initialization with valid path', () => {
    const Path = '/new';
    const RepoName = '/repo';
    const BoolModal = true;
    component.initLocation = Path;
    component.initName = RepoName;
    component.updateFullPath();
    component.projectModalVisible = BoolModal;
    component.projectModalLoading = BoolModal;
    component.initSubmit().then((result) => {
      expect(result).toBeTruthy();
      expect(component.projectModalVisible).toBeFalsy();
      expect(component.projectModalLoading).toBeFalsy();
      expect(component.initLocation).toBe('');
      expect(component.initName).toBe('');
      expect(component.fullPath).toBe('');
    });
  });

  it('tests the project initialization with invalid path', () => {
    const Path = '/invalidpath';
    const RepoName = '/repo';
    const BoolModal = true;
    component.initLocation = Path;
    component.initName = RepoName;
    component.updateFullPath();
    component.projectModalVisible = BoolModal;
    component.projectModalLoading = BoolModal;
    component.initSubmit().then((result) => {
      expect(result).toBeFalsy();
      expect(component.projectModalVisible).toBeTruthy();
      expect(component.projectModalLoading).toBeFalsy();
      expect(component.initLocation).toBe(Path);
      expect(component.initName).toBe(RepoName);
    });
  });
});
