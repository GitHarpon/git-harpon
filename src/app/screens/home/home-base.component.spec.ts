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
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
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
import { ViewCommitComponent } from '../view-commit/view-commit.component';
import { SendCommitComponent } from '../send-commit/send-commit.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { CommitTextAreaComponent } from '../../components/commit-text-area/commit-text-area.component';
import { ContextMenuModule, ContextMenuComponent, ContextMenuService} from 'ngx-contextmenu';
import { FileDiffCommitComponent } from '../../components/file-diff-commit/file-diff-commit.component';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { GraphService } from '../../providers/graph.service';
import { MockGraphService } from '../../models/MockGraphService';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { TreeComponent } from '../../components/tree/tree.component';
import { TreeItemComponent } from '../../components/tree-item/tree-item.component';
import { DiffViewComponent } from '../diff-view/diff-view.component';

describe('HomeComponent', () => {
  /* tslint:disable */
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let terminalService: TerminalManagerService;
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
        FileDiffCommitComponent,
        TabsComponent,
        TreeComponent,
        TreeItemComponent,
        DiffViewComponent
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
          provide: LeftPanelService,
          useClass: MockLeftPanelService
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
            provide: LeftPanelService,
            useClass: MockLeftPanelService
        },
        {
          provide: GraphService,
          useClass: MockGraphService
        },
        {
          provide: TerminalManagerService,
          useClass: MockTerminalManagerService
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
    const NewBranchInfoBarVisible = false;
    component.newBranchInfoBarVisible = NewBranchInfoBarVisible;
    component.branchButtonClicked();
    expect(component.newBranchInfoBarVisible).toBeTruthy();
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


  it('tests the openHomeView function with valid repoName and graph', () => {
    const RepoName = '/path';
    const HomeViewVisible = false;
    const Graph = [{
      relation: '*',
      branch: '(HEAD -> master)',
      rev: '33de52923be04d8a7b3aa9049ecb3249255f6a13',
      date: '2019-04-26 16:51:59 +0200',
      author: 'Git Harpon',
      author_email: 'githarpon@gmail.com',
      short_rev: '33de529',
      subject: 'Initial commit'
    }];
    component.repoName = RepoName;
    component.mainPanelVisible = !HomeViewVisible;
    component.leftPanelVisible = HomeViewVisible;
    component.graphVisible = HomeViewVisible;
    component.rightPanelVisible = HomeViewVisible;
    component.graph = Graph;
    component.openHomeView();
    expect(component.mainPanelVisible).toBeFalsy();
    expect(component.leftPanelVisible).toBeTruthy();
    expect(component.graphVisible).toBeTruthy();
    expect(component.rightPanelVisible).toBeTruthy();
  });

  it('tests the openHomeView function with valid repoName and without graph', () => {
    const RepoName = '/path';
    const HomeViewVisible = false;
    component.repoName = RepoName;
    component.mainPanelVisible = !HomeViewVisible;
    component.leftPanelVisible = HomeViewVisible;
    component.graphVisible = HomeViewVisible;
    component.rightPanelVisible = HomeViewVisible;
    component.openHomeView();
    expect(component.mainPanelVisible).toBeFalsy();
    expect(component.leftPanelVisible).toBeTruthy();
    expect(component.graphVisible).toBeTruthy();
    expect(component.rightPanelVisible).toBeTruthy();
  });

  it('tests the openHomeView function without repoName', () => {
    const HomeViewVisible = false;
    component.mainPanelVisible = !HomeViewVisible;
    component.leftPanelVisible = HomeViewVisible;
    component.graphVisible = HomeViewVisible;
    component.rightPanelVisible = HomeViewVisible;
    component.openHomeView();
    expect(component.mainPanelVisible).toBeTruthy();
    expect(component.leftPanelVisible).toBeFalsy();
    expect(component.graphVisible).toBeFalsy();
    expect(component.rightPanelVisible).toBeFalsy();
  });

  it('tests the closeHomeView function', () => {
    const HomeViewVisible = true;
    component.mainPanelVisible = !HomeViewVisible;
    component.leftPanelVisible = HomeViewVisible;
    component.graphVisible = HomeViewVisible;
    component.rightPanelVisible = HomeViewVisible;
    component.closeHomeView();
    expect(component.mainPanelVisible).toBeTruthy();
    expect(component.leftPanelVisible).toBeFalsy();
    expect(component.graphVisible).toBeFalsy();
    expect(component.rightPanelVisible).toBeFalsy();
  });

  it('test the function onFocus with valid parameter', (done) => {
    const RepoName = 'RepoName';
    component.repoName = RepoName;
    component.onFocus().then((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('test the function onFocus with invalid parameter', (done) => {
    component.onFocus().then((result) => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('test the function setCommitHash with valid event', () => {
    component.setCommitHash();

    expect(component.commitHash).toBeDefined();
  });

  it('test the function onKeyUp with valid event', () => {
    const Event = { key: 'Enter' };

    component.onKeyUp(Event);

    expect(component.commitHash).toBeDefined();
  });

  it('test the function onKeyUp with invalid event', () => {
    const Event = { key: 'Something else' };

    component.onKeyUp(Event);
  });
});
