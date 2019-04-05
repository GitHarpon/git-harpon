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
import { SendCommitComponent } from '../send-commit/send-commit.component';
import { ViewCommitComponent } from '../view-commit/view-commit.component';
import { ContextMenuModule, ContextMenuComponent, ContextMenuService} from 'ngx-contextmenu';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { GraphService } from '../../providers/graph.service';
import { MockGraphService } from '../../models/MockGraphService';
import { LeftPanelService } from '../../providers/left-panel.service';
import { CommitTextAreaComponent } from '../../components/commit-text-area/commit-text-area.component';
import { FileDiffCommitComponent } from '../../components/file-diff-commit/file-diff-commit.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
import { TreeItemComponent } from '../../components/tree-item/tree-item.component';
import { TreeComponent } from '../../components/tree/tree.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { DiffViewComponent } from '../diff-view/diff-view.component';

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
          TreeItemComponent,
          TreeComponent,
          TabsComponent,
          DiffViewComponent
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

    component.currentHttpsUser = User;
    component.homeLoading = true;
    component.pushCredInfoBarVisible = true;
    component.remoteAlias = Origin;

    component.pushSubmit();
    expect(component.remoteAlias).toEqual(Origin);
    expect(component.homeLoading).toBeTruthy;
  });

  it('tests the pushSubmit with newData set, ssh case', () => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const Originssh = 'originssh';

    component.currentHttpsUser = User;
    component.homeLoading = true;
    component.pushCredInfoBarVisible = true;
    component.remoteAlias = Originssh;

    component.pushSubmit();
    expect(component.remoteAlias).toEqual(Originssh);
  });

  it('tests the pushSubmit with newData set and invalid protocol', () => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const Origininvalidproto = 'origininvalidproto';

    component.currentHttpsUser = User;
    component.homeLoading = true;
    component.pushCredInfoBarVisible = true;
    component.remoteAlias = Origininvalidproto;

    component.pushSubmit();
    expect(component.remoteAlias).toEqual(Origininvalidproto);
  });

  it('tests the pushSubmit without newData set, reject case', () => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const OriginNodata = 'toto';

    component.currentHttpsUser = User;
    component.homeLoading = true;
    component.pushCredInfoBarVisible = true;
    component.remoteAlias = OriginNodata;

    component.pushSubmit();
    expect(component.remoteAlias).toEqual(OriginNodata);
  });

  it('tests the pushSubmit without newData set, resolve case', () => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const OriginNoNewdata = 'originnonewdata';

    component.currentHttpsUser = User;
    component.homeLoading = true;
    component.pushCredInfoBarVisible = true;
    component.remoteAlias = OriginNoNewdata;

    component.pushSubmit();
    expect(component.remoteAlias).toEqual(OriginNoNewdata);
  });


  it('tests the pushHttps function and valid arguments', (done) => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const Branch = 'master';
    const Folder = 'path';
    component.fullPath = Folder;
    component.branchName = Branch;
    component.currentHttpsUser = User;
    component.homeLoading = false;
    component.pushCredInfoBarVisible = true;
    component.pushHttps().then(() => {
      expect(component.pushCredInfoBarVisible).toBeFalsy();
      expect(component.homeLoading).toBeFalsy();
      done();
    });
  });

  it('tests the pushHttps function and invalid arguments', (done) => {
    const User = { username: '', password: '' };
    const Visible = true;
    component.currentHttpsUser = User;
    component.homeLoading = Visible;
    component.pushAuthErrored = false;
    component.pushCredInfoBarVisible = Visible;
    component.pushHttps().then(() => {
      expect(component.pushAuthErrored).toBeTruthy();
      expect(component.homeLoading).toBeTruthy();
      done();
    });
  });

  it('tests the pushHttps function and invalid arguments alternative', (done) => {
    const User = { username: 'username', password: 'password' };
    const InvalidPath = 'invalid';
    const Visible = true;
    const InvalidBranch = 'not_master';

    component.fullPath = InvalidPath;
    component.currentHttpsUser = User;
    component.homeLoading = Visible;
    component.pushAuthErrored = false;
    component.branchName = InvalidBranch;
    component.pushCredInfoBarVisible = Visible;
    component.pushHttps().then(() => {
      expect(component.homeLoading).toBeFalsy();
      expect(component.currentHttpsUser.password).toBeFalsy();
      expect(component.currentHttpsUser.username).toBeFalsy();
      done();
    });
  });


  it('tests the resetPushInputs function', () => {
    const Expected: HttpsUser = { username: '', password: '' };
    component.resetPushInputs();
    expect(component.currentHttpsUser.username).toBe(Expected.username);
    expect(component.currentHttpsUser.password).toBe(Expected.password);
    expect(component.pushCredInfoBarVisible).toBeFalsy();
    expect(component.homeLoading).toBeFalsy();
  });

  it('tests the closePushCredInfoBar function', () => {
    component.closePushCredInfoBar();
    expect(component.pushCredInfoBarVisible).toBeFalsy();
  });


});
