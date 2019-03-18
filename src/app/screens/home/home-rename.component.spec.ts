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
import { NewBranchCouple } from '../../models/NewBranchCouple';
import { MockGraphService } from '../../models/MockGraphService';
import { GraphService } from '../../providers/graph.service';

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

  it('tests the renameBranch function that success with valid arguments', (done) => {
    component.newBranchCouple = new NewBranchCouple();
    component.newBranchCouple.oldBranch = 'valid';
    component.newBranchCouple.newBranch = 'tata';
    component.newBranchName = 'titi';
    const Empty = '';

    component.renameBranch().then(() => {
      expect(component.newBranchCouple.newBranch).toEqual(Empty);
      expect(component.newBranchName).toEqual(Empty);
      done();
    });
  });

  it('tests the renameBranch function that fails with valid arguments', (done) => {
    component.newBranchCouple = new NewBranchCouple();
    component.newBranchCouple.oldBranch = 'toto';
    component.newBranchCouple.newBranch = 'tata';
    component.newBranchName = 'titi';
    const Empty = '';

    component.renameBranch().then(() => {
      expect(component.newBranchCouple.newBranch).toEqual(Empty);
      expect(component.newBranchName).toEqual(Empty);
      done();
    });
  });


  it('tests the renameBranch function with invalid arguments', (done) => {
    component.newBranchCouple = new NewBranchCouple();
    const Empty = '';
    component.newBranchCouple.oldBranch = Empty;
    component.newBranchCouple.newBranch = Empty;
    component.newBranchName = 'titi';

    component.renameBranch().then(() => {
      expect(component.newBranchCouple.newBranch).toEqual('titi');
      expect(component.newBranchName).toEqual('titi');
      done();
    });
  });


});
