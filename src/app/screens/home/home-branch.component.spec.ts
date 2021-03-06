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
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';

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
import { FileDiffCommitComponent } from '../../components/file-diff-commit/file-diff-commit.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { CommitTextAreaComponent } from '../../components/commit-text-area/commit-text-area.component';
import { GraphService } from '../../providers/graph.service';
import { MockGraphService } from '../../models/MockGraphService';
import { HttpsUser } from '../../models/HttpsUser';
import { TreeComponent } from '../../components/tree/tree.component';
import { TreeItemComponent } from '../../components/tree-item/tree-item.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { DiffViewComponent } from '../diff-view/diff-view.component';

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

  it('tests the openCreateBranchInfoBar function', () => {
    const SelectedBranchName = 'selectedBranch';
    const RefBranchName = '';
    const NewBranchInfoBarVisibility = false;
    component.referenceBranchName = RefBranchName;
    component.newBranchInfoBarVisible = NewBranchInfoBarVisibility;
    component.openCreateBranchInfoBar(SelectedBranchName);
    expect(component.referenceBranchName).toBe(SelectedBranchName);
    expect(component.newBranchInfoBarVisible).toBeTruthy();
  });

  it('tests the createBranch function', (done) => {
    const NewBranchName = 'newBranch';
    const RefBranchName = 'refBranch';
    const CurrentBranchName = 'currentBranch';
    component.branchName = CurrentBranchName;
    component.newBranchName = NewBranchName;
    component.referenceBranchName = RefBranchName;
    component.newBranchInfoBarVisible = true;

    component.createBranch().then(() => {
      expect(component.homeLoading).toBeFalsy();
      expect(component.branchName).toBe(NewBranchName);
      expect(component.newBranchInfoBarVisible).toBeFalsy();
      done();
    });
  });

  it('tests the createBranch function with an existing new branch name', (done) => {
    const NewBranchName = 'existingBranch';
    const RefBranchName = 'refBranch';
    const CurrentBranchName = 'currentBranch';
    component.branchName = CurrentBranchName;
    component.newBranchName = NewBranchName;
    component.referenceBranchName = RefBranchName;
    component.newBranchInfoBarVisible = true;

    component.createBranch().then(() => {
      expect(component.branchName).toBe(CurrentBranchName);
      expect(component.homeLoading).toBeFalsy();
      expect(component.newBranchInfoBarVisible).toBeTruthy();
      done();
    });
  });

  it('tests the createBranch function with a wrong reference branch name', (done) => {
    const NewBranchName = 'newBranch';
    const RefBranchName = 'wrongRefBranch';
    const CurrentBranchName = 'currentBranch';
    component.branchName = CurrentBranchName;
    component.newBranchName = NewBranchName;
    component.referenceBranchName = RefBranchName;
    component.newBranchInfoBarVisible = true;

    component.createBranch().then(() => {
      expect(component.branchName).toBe(CurrentBranchName);
      expect(component.homeLoading).toBeFalsy();
      expect(component.newBranchInfoBarVisible).toBeTruthy();
      done();
    });
  });

  it('tests the createBranch function with a remote reference branch', (done) => {
    const NewBranchName = 'newBranch';
    const RefBranchName = 'remote/refBranch';
    const CurrentBranchName = 'currentBranch';
    component.branchName = CurrentBranchName;
    component.newBranchName = NewBranchName;
    component.referenceBranchName = RefBranchName;
    component.newBranchInfoBarVisible = true;

    component.createBranch().then(() => {
      expect(component.branchName).toBe(NewBranchName);
      expect(component.homeLoading).toBeFalsy();
      expect(component.newBranchInfoBarVisible).toBeFalsy();
      done();
    });
  });

  it('tests the createBranch function with a wrong remote reference branch', (done) => {
    const NewBranchName = 'newBranch';
    const RefBranchName = 'wrong/refBranch';
    const CurrentBranchName = 'currentBranch';
    component.branchName = CurrentBranchName;
    component.newBranchName = NewBranchName;
    component.referenceBranchName = RefBranchName;
    component.newBranchInfoBarVisible = true;

    component.createBranch().then(() => {
      expect(component.branchName).toBe(CurrentBranchName);
      expect(component.homeLoading).toBeFalsy();
      expect(component.newBranchInfoBarVisible).toBeTruthy();
      done();
    });
  });

  it('tests the branchButtonClicked function', () => {
    const NewBranchInfoBarVisibility = false;
    component.newBranchInfoBarVisible = NewBranchInfoBarVisibility;
    component.branchButtonClicked();
    expect(component.newBranchInfoBarVisible).toBeTruthy();
  });


  it('tests the closeNewBranchInfoBar function', () => {
    const NewBranchInfoBarVisibility = true;
    component.newBranchInfoBarVisible = NewBranchInfoBarVisibility;
    component.closeNewBranchInfoBar();
    expect(component.newBranchInfoBarVisible).toBeFalsy();
  });

  it('tests the openDeleteBranchInfoBar function with a local branch', () => {
    const DeleteBranchName = 'localBranch';
    const DeleteBranchInfoBarVisibility = false;
    const DeleteRemoteBranchCredInfoBarVisibility = false;
    component.deleteBranchInfoBarVisible = DeleteBranchInfoBarVisibility;
    component.deleteRemoteBranchCredInfoBarVisible = DeleteRemoteBranchCredInfoBarVisibility;

    component.openDeleteBranchInfoBar(DeleteBranchName);
    expect(component.deleteBranchName).toBe(DeleteBranchName);
    expect(component.deleteBranchInfoBarVisible).toBeTruthy();
    expect(component.deleteRemoteBranchCredInfoBarVisible).toBeFalsy();
  });

  it('tests the openDeleteBranchInfoBar function with a remote branch', () => {
    const DeleteBranchName = 'remote/branch';
    const DeleteBranchInfoBarVisibility = false;
    const DeleteRemoteBranchCredInfoBarVisibility = false;
    component.deleteBranchInfoBarVisible = DeleteBranchInfoBarVisibility;
    component.deleteRemoteBranchCredInfoBarVisible = DeleteRemoteBranchCredInfoBarVisibility;

    component.openDeleteBranchInfoBar(DeleteBranchName);
    expect(component.deleteBranchName).toBe(DeleteBranchName);
    expect(component.deleteBranchInfoBarVisible).toBeFalsy();
    expect(component.deleteRemoteBranchCredInfoBarVisible).toBeTruthy();
  });

  it('tests the deleteBranch function', (done) => {
    const CurrentBranchName = 'currentBranch';
    const DeleteBranchName = 'deleteBranch';
    const DeleteBranchInfoBarVisibility = false;
    const DeleteRemoteBranchCredInfoBarVisibility = false;
    const HomeLoading = false;
    component.deleteBranchInfoBarVisible = DeleteBranchInfoBarVisibility;
    component.deleteRemoteBranchCredInfoBarVisible = DeleteRemoteBranchCredInfoBarVisibility;
    component.branchName = CurrentBranchName;
    component.deleteBranchName = DeleteBranchName;
    component.homeLoading = HomeLoading;

    component.deleteBranch().then(() => {
      expect(component.deleteBranchInfoBarVisible).toBeFalsy();
      expect(component.deleteRemoteBranchCredInfoBarVisible).toBeFalsy();
      expect(component.homeLoading).toBeFalsy();
      done();
    });
  });

  it('tests the deleteBranch function with a remote branch and valid cred', (done) => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const CurrentBranchName = 'currentBranch';
    const DeleteBranchName = 'remote/branch';
    const DeleteBranchInfoBarVisibility = false;
    const DeleteRemoteBranchCredInfoBarVisibility = true;
    const HomeLoading = false;
    component.currentHttpsUser = User;
    component.deleteBranchInfoBarVisible = DeleteBranchInfoBarVisibility;
    component.deleteRemoteBranchCredInfoBarVisible = DeleteRemoteBranchCredInfoBarVisibility;
    component.branchName = CurrentBranchName;
    component.deleteBranchName = DeleteBranchName;
    component.homeLoading = HomeLoading;

    component.deleteBranch().then(() => {
      expect(component.deleteBranchInfoBarVisible).toBeFalsy();
      expect(component.deleteRemoteBranchCredInfoBarVisible).toBeFalsy();
      expect(component.homeLoading).toBeFalsy();
      done();
    });
  });

  it('tests the deleteBranch function with a remote branch and invalid cred', (done) => {
    const User: HttpsUser = { username: '', password: '' };
    const CurrentBranchName = 'currentBranch';
    const DeleteBranchName = 'remote/branch';
    const DeleteBranchInfoBarVisibility = false;
    const DeleteRemoteBranchCredInfoBarVisibility = true;
    const HomeLoading = false;
    component.currentHttpsUser = User;
    component.deleteBranchInfoBarVisible = DeleteBranchInfoBarVisibility;
    component.deleteRemoteBranchCredInfoBarVisible = DeleteRemoteBranchCredInfoBarVisibility;
    component.branchName = CurrentBranchName;
    component.deleteBranchName = DeleteBranchName;
    component.homeLoading = HomeLoading;

    component.deleteBranch().then(() => {
      expect(component.deleteBranchInfoBarVisible).toBeFalsy();
      expect(component.deleteRemoteBranchCredInfoBarVisible).toBeFalsy();
      expect(component.homeLoading).toBeFalsy();
      done();
    });
  });

  it('tests the deleteBranch function with an invalid branch name', (done) => {
    const User: HttpsUser = { username: 'username', password: 'password' };
    const CurrentBranchName = 'currentBranch';
    const DeleteBranchName = CurrentBranchName;
    const DeleteBranchInfoBarVisibility = false;
    const DeleteRemoteBranchCredInfoBarVisibility = true;
    const HomeLoading = false;
    component.currentHttpsUser = User;
    component.deleteBranchInfoBarVisible = DeleteBranchInfoBarVisibility;
    component.deleteRemoteBranchCredInfoBarVisible = DeleteRemoteBranchCredInfoBarVisibility;
    component.branchName = CurrentBranchName;
    component.deleteBranchName = DeleteBranchName;
    component.homeLoading = HomeLoading;

    component.deleteBranch().then(() => {
      expect(component.deleteBranchInfoBarVisible).toBeFalsy();
      expect(component.deleteRemoteBranchCredInfoBarVisible).toBeFalsy();
      expect(component.homeLoading).toBeFalsy();
      done();
    });
  });

  it('tests the deleteBranch function and invalid arguments alternative', (done) => {
    const User = { username: 'username', password: 'password' };
    const HomeLoading = true;
    const DeleteRemoteBranchCredInfoBarVisibility = true;
    const DeleteRemoteBranchAuthErrored = false;
    component.currentHttpsUser = User;
    component.homeLoading = HomeLoading;
    component.deleteRemoteBranchAuthErrored = DeleteRemoteBranchAuthErrored;
    component.deleteRemoteBranchCredInfoBarVisible = DeleteRemoteBranchCredInfoBarVisibility;
    component.deleteBranch().then(() => {
      expect(component.homeLoading).toBeFalsy();
      expect(component.currentHttpsUser.password).toBe('');
      done();
    });
  });

  it('tests the closeDeleteBranchInfoBar function', () => {
    const DeleteBranchName = 'deleteBranch';
    const DeleteBranchInfoBarVisibility = false;
    const HomeLoading = true;
    component.homeLoading = HomeLoading;
    component.deleteBranchName = DeleteBranchName;
    component.deleteBranchInfoBarVisible = DeleteBranchInfoBarVisibility;

    component.closeDeleteBranchInfoBar();
    expect(component.deleteBranchInfoBarVisible).toBeFalsy();
    expect(component.deleteBranchName).toBe('');
    expect(component.homeLoading).toBeFalsy();
  });

  it('tests the closeDeleteRemoteBranchCredInfoBar function', () => {
    const DeleteRemoteBranchCredInfoBarVisibility = true;
    component.deleteRemoteBranchCredInfoBarVisible = DeleteRemoteBranchCredInfoBarVisibility;
    component.closeDeleteRemoteBranchCredInfoBar();
    expect(component.deleteRemoteBranchCredInfoBarVisible).toBeFalsy();
  });

  it('tests the resetDeleteRemoteBranchInputs function', () => {
    const Expected: HttpsUser = { username: '', password: '' };
    component.resetDeleteRemoteBranchInputs();
    expect(component.currentHttpsUser.username).toBe(Expected.username);
    expect(component.currentHttpsUser.password).toBe(Expected.password);
    expect(component.deleteRemoteBranchAuthErrored).toBeFalsy();
    expect(component.deleteRemoteBranchCredInfoBarVisible).toBeFalsy();
    expect(component.homeLoading).toBeFalsy();
  });

  it('tests the mergeBranch function case branchName != mergeBranchName and fullPath == "goodPath"', (done) => {
    const BranchName = 'branchName';
    const MergeBranchName = 'mergeBranchName';
    const HomeLoading = true;
    const FullPath = 'goodPath';
    component.branchName = BranchName;
    component.homeLoading = HomeLoading;
    component.fullPath = FullPath;

    component.mergeBranch(MergeBranchName).then(() => {
      expect(component.homeLoading).toBeFalsy();
      expect(component.mergeBranchName).toBe('');
      done();
    });
  });

  it('tests the mergeBranch function case branchName != mergeBranchName and fullPath == "conflictPath"', (done) => {
    const BranchName = 'branchName';
    const MergeBranchName = 'mergeBranchName';
    const HomeLoading = true;
    const FullPath = 'conflictPath';
    component.branchName = BranchName;
    component.homeLoading = HomeLoading;
    component.fullPath = FullPath;

    component.mergeBranch(MergeBranchName).then(() => {
      expect(component.homeLoading).toBeFalsy();
      done();
    });
  });

  it('tests the mergeBranch function case branchName != mergeBranchName and fullPath == "otherPath"', (done) => {
    const BranchName = 'branchName';
    const MergeBranchName = 'mergeBranchName';
    const HomeLoading = true;
    const FullPath = 'otherPath';
    component.branchName = BranchName;
    component.homeLoading = HomeLoading;
    component.fullPath = FullPath;

    component.mergeBranch(MergeBranchName).then(() => {
      expect(component.homeLoading).toBeFalsy();
      done();
    });
  });

  it('tests the mergeBranch function case branchName == mergeBranchName', (done) => {
    const BranchName = 'branchName';
    const MergeBranchName = 'branchName';
    const HomeLoading = true;
    const FullPath = 'goodPath';
    component.branchName = BranchName;
    component.homeLoading = HomeLoading;
    component.fullPath = FullPath;

    component.mergeBranch(MergeBranchName).then(() => {
      expect(component.homeLoading).toBeFalsy();
      done();
    });
  });
});
