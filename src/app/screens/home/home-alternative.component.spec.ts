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
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
import { MockRouter } from '../../models/MockRouter';
import { MockTerminalManagerService } from '../../models/MockTerminalManagerService';
import { TerminalManagerService } from '../../providers/terminal-manager.service';
import { MockAlternativeElectronService } from '../../models/MockAlternativeElectronService';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { GraphComponent } from '../graph/graph.component';
import { RightPanelComponent } from '../right-panel/right-panel.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { SendCommitComponent } from '../send-commit/send-commit.component';
import { ViewCommitComponent } from '../view-commit/view-commit.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { CommitTextAreaComponent } from '../../components/commit-text-area/commit-text-area.component';
import { ContextMenuModule, ContextMenuComponent, ContextMenuService} from 'ngx-contextmenu';
import { FileDiffCommitComponent } from '../../components/file-diff-commit/file-diff-commit.component';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { GraphService } from '../../providers/graph.service';
import { MockGraphService } from '../../models/MockGraphService';
import { TreeComponent } from '../../components/tree/tree.component';
import { TreeItemComponent } from '../../components/tree-item/tree-item.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { DiffViewComponent } from '../diff-view/diff-view.component';

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
        ViewCommitComponent,
        TextAreaComponent,
        CommitTextAreaComponent,
        FileDiffCommitComponent,
        TreeItemComponent,
        TreeComponent,
        TabsComponent,
        DiffViewComponent
      ],
      imports: [
        ContextMenuModule,
        FormsModule,
        ContextMenuModule,
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
          useClass: MockAlternativeElectronService
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
  });

  it('tests the cloneBrowse function with invalid BrowsePath', () => {
    const Expected = null;
    component.cloneFolder = Expected;
    component.cloneBrowse();

    expect(component.cloneFolder).toBe(Expected);
  });

  it('tests the initBrowse function with invalid BrowsePath', () => {
    const Expected = null;
    component.initLocation = Expected;
    component.initBrowse();

    expect(component.initLocation).toBe(Expected);
  });

  it('tests the openBrowse function with invalid BrowsePath', () => {
    const Expected = null;
    component.openFolder = Expected;
    component.openBrowse();

    expect(component.openFolder).toBe(Expected);
  });
});
