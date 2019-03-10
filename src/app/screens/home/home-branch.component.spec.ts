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

describe('HomeComponent', () => {
  /* tslint:disable */
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let leftPanelService: LeftPanelService;
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
    leftPanelService = TestBed.get(LeftPanelService);
  });

  it('tests the createBranch function', (done) => {
    const NewBranchName = 'newBranch';
    const CurrentBranchName = 'currentBranchName';
    const RefBranchName = CurrentBranchName;
    component.branchName = RefBranchName;
    component.newBranchName = NewBranchName;
    component.referenceBranchName = RefBranchName;
    component.newBranchInfoBarVisible = true;

    component.createBranch().then(() => {
      expect(component.homeLoading).toBeFalsy();
      expect(component.newBranchInfoBarVisible).toBeFalsy();
      done();
    });
  });

  it('tests the createBranch function with an existing new branch name', (done) => {
    const LocalBranches = {1: 'branch', 2: 'currentBranchName'};
    const CurrentBranchName = 'currentBranchName';
    const RefBranchName = CurrentBranchName;
    const NewBranchName = CurrentBranchName;
    component.branchName = CurrentBranchName;
    component.newBranchName = NewBranchName;
    component.referenceBranchName = RefBranchName;
    leftPanelService.localBranches = LocalBranches;
    component.newBranchInfoBarVisible = true;

    component.createBranch().then(() => {
      expect(leftPanelService.localBranches).not.toContain(NewBranchName);
      expect(component.homeLoading).toBeFalsy();
      expect(component.newBranchInfoBarVisible).toBeTruthy();
      done();
    });
  });

  it('tests the createBranch function with a wrong reference branch name', (done) => {
    const NewBranchName = 'newBranch';
    const RefBranchName = 'wrong';
    const CurrentBranchName = 'currentBranchName';
    component.branchName = CurrentBranchName;
    component.newBranchName = NewBranchName;
    component.referenceBranchName = RefBranchName;
    component.newBranchInfoBarVisible = true;

    component.createBranch().then(() => {
      expect(component.branchName).not.toBe(NewBranchName);
      expect(component.homeLoading).toBeFalsy();
      expect(component.newBranchInfoBarVisible).toBeTruthy();
      done();
    });
  });

  it('tests the closeNewBranchInfoBar function', () => {
    const NewBranchInfoBarVisible = true;
    component.newBranchInfoBarVisible = NewBranchInfoBarVisible;
    component.closeNewBranchInfoBar();
    expect(component.newBranchInfoBarVisible).toBeFalsy();
  });

});
