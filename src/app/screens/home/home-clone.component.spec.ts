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
import { HttpsUser } from '../../models/HttpsUser';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { SendCommitComponent } from '../send-commit/send-commit.component';
import { ViewCommitComponent } from '../view-commit/view-commit.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { CommitTextAreaComponent } from '../../components/commit-text-area/commit-text-area.component';
import { FileDiffCommitComponent } from '../../components/file-diff-commit/file-diff-commit.component';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';

describe('HomeComponent', () => {
    /* tslint:disable */
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    const Empty = '';
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
        ViewCommitComponent,
        TextAreaComponent,
        CommitTextAreaComponent,
        FileDiffCommitComponent
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
          provide: RightPanelService,
          useClass: MockRightPanelService
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

  it('tests the cloneBrowse function wtih valid BrowsePath', () => {
    component.cloneBrowse();
    expect(component.cloneFolder).toBe('/new');
  });

  it('tests the cloneHttps function and valid arguments', (done) => {
    const CloneUrl = 'https://github.com/GitHarpon/git-harpon';
    const CloneFolder = 'path';
    const User = { username: 'username', password: 'password' };
    component.cloneUrl = CloneUrl;
    component.cloneFolder = CloneFolder;
    component.cloneHttpsUser = User;
    component.openClonedInfoBarVisible = false;
    component.homeLoading = false;
    component.cloneHttps().then(() => {
      expect(component.homeLoading).toBeFalsy();
      expect(component.openClonedInfoBarVisible).toBeTruthy();
      done();
    });
  });

  it('tests the cloneHttps function with invalid url or folder', (done) => {
    const CloneUrl = 'invalidurl';
    const CloneFolder = 'invalidfolder';
    const User = { username: 'username', password: 'password' };
    component.cloneUrl = CloneUrl;
    component.cloneFolder = CloneFolder;
    component.cloneHttpsUser = User;
    component.cloneHttps().then(() => {
      expect(component.homeLoading).toBeFalsy();
      expect(component.projectModalLoading).toBeFalsy();
      done();
    });
  });

  it('tests the cloneHttps function with wrong informations', (done) => {
    const CloneUrl = 'invalidurl';
    const CloneFolder = 'invalidfolder';
    const User = { username: '', password: '' };
    const NotVisible = false;
    component.cloneUrl = CloneUrl;
    component.cloneFolder = CloneFolder;
    component.cloneHttpsUser = User;
    component.cloneAuthErrored = NotVisible;
    component.credInfoBarVisible = NotVisible;
    component.cloneHttps().then(() => {
      expect(component.cloneAuthErrored).toBeFalsy();
      expect(component.credInfoBarVisible).toBeTruthy();
      done();
    });
  });


  it('tests the cloneSubmit function with https', () => {
    const CloneFolder = 'path';
    const CloneUrl = 'https://github.com/GitHarpon/git-harpon';
    component.cloneFolder = CloneFolder;
    component.cloneUrl = CloneUrl;
    component.cloneSubmit();
    expect(component.projectModalVisible).toBeFalsy();
    expect(component.homeLoading).toBeTruthy();
  });

  it('tests the cloneSubmit function with ssh', () => {
    const CloneFolder = 'path';
    const CloneUrl = 'git@github.com:GitHarpon/git-harpon.git';
    component.cloneFolder = CloneFolder;
    component.cloneUrl = CloneUrl;
    component.cloneSubmit();
  });

  it('tests the cloneSubmit function with invalid url', () => {
    const CloneFolder = 'path';
    const CloneUrl = 'NotAnUrl';
    component.cloneFolder = CloneFolder;
    component.cloneUrl = CloneUrl;
    component.cloneSubmit();
  });

  it('tests the cloneSubmit function with invalid folder', () => {
    const CloneFolder = 'invalid';
    const CloneUrl = 'https://github.com/GitHarpon/git-harpon';
    component.cloneFolder = CloneFolder;
    component.cloneUrl = CloneUrl;
    component.cloneSubmit();
  });

  it('tests the resetCloneInputs function', () => {
    const Expected: HttpsUser = { username: '', password: '' };
    component.resetCloneInputs();
    expect(component.cloneHttpsUser.username).toBe(Expected.username);
    expect(component.cloneHttpsUser.password).toBe(Expected.password);
    expect(component.cloneUrl).toBe(Empty);
    expect(component.cloneFolder).toBe(Empty);
    expect(component.newClonedRepoPath).toBe(Empty);
    expect(component.cloneAuthErrored).toBeFalsy();
    expect(component.credInfoBarVisible).toBeFalsy();
    expect(component.homeLoading).toBeFalsy();
  });

  it('tests the closeCredInfoBar function', () => {
    component.closeCredInfoBar();
    expect(component.credInfoBarVisible).toBeFalsy();
  });

  it('tests the openClonedRepo function', () => {
    const NewRepo = '/new';
    component.newClonedRepoPath = NewRepo;
    component.openClonedRepo();
    expect(component.path).toBe(NewRepo);
    expect(component.openClonedInfoBarVisible).toBeFalsy();
  });

  it('tests the closeClonedInfoBar function', () => {
    component.closeClonedInfoBar();
    expect(component.openClonedInfoBarVisible).toBeFalsy();
  });
});
