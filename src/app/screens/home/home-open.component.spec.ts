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
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { GraphComponent } from '../graph/graph.component';
import { RightPanelComponent } from '../right-panel/right-panel.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { SendCommitComponent } from '../send-commit/send-commit.component';
import { ViewCommitComponent } from '../view-commit/view-commit.component';
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';

describe('HomeComponent', () => {
  /* tslint:disable */
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  /* tslint:enable */

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
        InfoBarComponent,
        AccordionComponent,
        LeftPanelComponent,
        GraphComponent,
        RightPanelComponent,
        SendCommitComponent,
        ViewCommitComponent
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
            provide: LeftPanelService,
            useClass: MockLeftPanelService
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
  });

  it('tests the openBrowse function with valid BrowsePath', () => {
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

  it('tests the openRepo function with changed and valid path and null openFolder', (done) => {
    const OldPath = '/old';
    const NewPath = null;
    const ProjectModalBoolean = true;
    component.path = OldPath;
    component.openFolder = NewPath;
    component.projectModalLoading = ProjectModalBoolean;
    component.projectModalVisible = ProjectModalBoolean;
    component.openRepo().then(() => {
      expect(component.projectModalLoading).toBeTruthy();
      expect(component.projectModalVisible).toBeTruthy();
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
