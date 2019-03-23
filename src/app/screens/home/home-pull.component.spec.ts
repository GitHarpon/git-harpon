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
import { CommitTextAreaComponent } from '../../components/commit-text-area/commit-text-area.component';
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
import { SendCommitComponent } from '../send-commit/send-commit.component';
import { ViewCommitComponent } from '../view-commit/view-commit.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { FileDiffCommitComponent } from '../../components/file-diff-commit/file-diff-commit.component';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { ContextMenuModule, ContextMenuComponent, ContextMenuService} from 'ngx-contextmenu';
import { GraphService } from '../../providers/graph.service';
import { MockGraphService } from '../../models/MockGraphService';

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
        CommitTextAreaComponent,
        LoaderComponent,
        InfoBarComponent,
        AccordionComponent,
        LeftPanelComponent,
        GraphComponent,
        RightPanelComponent,
        SendCommitComponent,
        ViewCommitComponent,
        FileDiffCommitComponent,
        TextAreaComponent,
      ],
      imports: [
        ContextMenuModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        }),
        MatTabsModule,
        ResizableModule,
        NgbModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ContextMenuModule,
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
        {
          provide: RightPanelService,
          useClass: MockRightPanelService
        },
        {
          provide: GraphService,
          useClass: MockGraphService
        },
        {
          provide: LeftPanelService,
          useClass: MockLeftPanelService
        },
        ToastrService,
        ContextMenuService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('tests the pullrebaseSubmit with newData set, https case', () => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const Origin = 'origin';

    component.pullrebaseHttpsUser = User;
    component.homeLoading = true;
    component.pullrebaseCredInfoBarVisible = true;
    component.remoteAlias = Origin;

    component.pullrebaseSubmit();
    expect(component.remoteAlias).toEqual(Origin);
    expect(component.homeLoading).toBeTruthy;
  });

  it('tests the pullrebaseSubmit with newData set, ssh case', () => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const Originssh = 'originssh';

    component.pullrebaseHttpsUser = User;
    component.homeLoading = true;
    component.pullrebaseCredInfoBarVisible = true;
    component.remoteAlias = Originssh;

    component.pullrebaseSubmit();
    expect(component.remoteAlias).toEqual(Originssh);
  });

  it('tests the pullrebaseSubmit with newData set and invalid protocol', () => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const Origininvalidproto = 'origininvalidproto';

    component.pullrebaseHttpsUser = User;
    component.homeLoading = true;
    component.pullrebaseCredInfoBarVisible = true;
    component.remoteAlias = Origininvalidproto;

    component.pullrebaseSubmit();
    expect(component.remoteAlias).toEqual(Origininvalidproto);
  });

  it('tests the pullrebaseSubmit without newData set, reject case', () => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const OriginNodata = 'toto';

    component.pullrebaseHttpsUser = User;
    component.homeLoading = true;
    component.pullrebaseCredInfoBarVisible = true;
    component.remoteAlias = OriginNodata;

    component.pullrebaseSubmit();
    expect(component.remoteAlias).toEqual(OriginNodata);
  });

  it('tests the pullrebaseSubmit without newData set, resolve case', () => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const OriginNoNewdata = 'originnonewdata';

    component.pullrebaseHttpsUser = User;
    component.homeLoading = true;
    component.pullrebaseCredInfoBarVisible = true;
    component.remoteAlias = OriginNoNewdata;

    component.pullrebaseSubmit();
    expect(component.remoteAlias).toEqual(OriginNoNewdata);
  });

  it('tests the pullrebaseHttps function and valid arguments', (done) => {
    const User: HttpsUser = { username: 'username', password: 'password' };

    component.pullrebaseHttpsUser = User;
    component.homeLoading = true;
    component.pullrebaseCredInfoBarVisible = true;

    component.pullrebaseHttps().then(() => {
      expect(component.homeLoading).toBeFalsy();
      expect(component.pullrebaseCredInfoBarVisible).toBeFalsy();
      expect(component.pullrebaseHttpsUser.password).toBeFalsy();
      expect(component.pullrebaseHttpsUser.username).toBeFalsy();
      done();
    });
  });

  it('tests the pullrebaseHttps function and invalid arguments with newData', (done) => {
    const User: HttpsUser = { username: 'username', password: 'newData' };
    const Visible = false;

    component.pullrebaseAuthErrored = Visible;
    component.pullrebaseHttpsUser = User;
    component.pullrebaseCredInfoBarVisible = Visible;

    component.pullrebaseHttps().then(() => {
      expect(component.pullrebaseAuthErrored).toBeFalsy();
      expect(component.pullrebaseHttpsUser.password).toEqual('');
      expect(component.pullrebaseCredInfoBarVisible).toBeTruthy();
      done();
    });
  });

  it('tests the pullrebaseHttps function and invalid arguments without newData', (done) => {
    const User: HttpsUser = { username: 'username', password: 'noNewData' };
    const Expected: HttpsUser = { username: '', password: '' };

    component.homeLoading = true;
    component.pullrebaseHttpsUser = User;

    component.pullrebaseHttps().then(() => {
      expect(component.pullrebaseHttpsUser.password).toEqual('');
      expect(component.pullrebaseHttpsUser.username).toBe(Expected.username);
      expect(component.pullrebaseHttpsUser.password).toBe(Expected.password);
      expect(component.homeLoading).toBeFalsy();
      done();
    });
  });

  it('tests the resetPullrebaseInputs function', () => {
    const Expected: HttpsUser = { username: '', password: '' };
    component.pullrebaseHttpsUser = Expected;
    component.resetPullrebaseInputs();
    expect(component.pullrebaseHttpsUser.username).toBe(Expected.username);
    expect(component.pullrebaseHttpsUser.password).toBe(Expected.password);
    expect(component.pullrebaseCredInfoBarVisible).toBeFalsy();
    expect(component.homeLoading).toBeFalsy();
  });

  it('tests the closePullrebaseCredInfoBar function', () => {
    component.closePullrebaseCredInfoBar();
    expect(component.pullrebaseCredInfoBarVisible).toBeFalsy();
  });
});
