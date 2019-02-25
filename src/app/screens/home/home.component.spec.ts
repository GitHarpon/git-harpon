import { async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
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
import { ResizableModule } from 'angular-resizable-element';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RouterModule, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        LoaderComponent
      ],
      imports: [
        FormsModule,
        TranslateModule,
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
