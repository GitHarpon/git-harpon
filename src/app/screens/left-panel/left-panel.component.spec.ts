import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelComponent } from './left-panel.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { GitService } from '../../providers/git.service';
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MockGitService } from '../../models/MockGitService';
import { ContextMenuModule, ContextMenuComponent, ContextMenuService} from 'ngx-contextmenu';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockLanguagePreferencesService } from '../../models/MockLanguagePreferenceService';
import { LanguagePreferencesService } from '../../providers/language-preferences.service';
import { MockTranslateService } from '../../models/MockTranslateService';
import { NewBranchCouple } from '../../models/NewBranchCouple';
import { TreeComponent } from '../../components/tree/tree.component';
import { TreeItemComponent } from '../../components/tree-item/tree-item.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { ButtonComponent } from '../../components/button/button.component';

describe('LeftPanelComponent', () => {
  /* tslint:disable */
  let component: LeftPanelComponent;
  let fixture: ComponentFixture<LeftPanelComponent>;
  let leftPanelEl: DebugElement;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          LeftPanelComponent,
          AccordionComponent,
          LoaderComponent,
          TreeItemComponent,
          TreeComponent,
          ButtonComponent
      ],
      imports: [
        ContextMenuModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        }),
        ToastrModule.forRoot(),
        NgbModule,
        BrowserAnimationsModule,
        ContextMenuModule
      ],
      providers: [
        {
          provide: ThemePreferencesService,
          useClass: MockThemePreferencesService
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
          provide: LanguagePreferencesService,
          useClass: MockLanguagePreferencesService
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        ToastrService,
        ContextMenuService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelComponent);
    component = fixture.componentInstance;
    leftPanelEl = fixture.debugElement.query(By.css('.left-panel'));
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the ngOnInit function', () => {
    component.ngOnInit();

    expect(component.themePrefSubscription).toBeDefined();
    expect(component.branchNameSubscription).toBeDefined();
    expect(component.localBranchesSubscription).toBeDefined();
    expect(component.loadingVisibleSubscription).toBeDefined();
  });

  it ('test the checkoutLocalBranch function with local not as current and not conflicted branches', (done) => {
    const LocalBranch = 'local';
    const CurrentBranch = 'current';
    const Visibility = true;
    component.currentBranch = CurrentBranch;
    component.loadingVisible = Visibility;
    component.checkoutLocalBranch(LocalBranch).then(() => {
      expect(component.loadingVisible).toBeFalsy();
      done();
    });
  });

  it ('test the checkoutLocalBranch function with local not as current and conflicted branches', (done) => {
    const LocalBranch = 'conflicted';
    const CurrentBranch = 'current';
    const Visibility = true;
    component.currentBranch = CurrentBranch;
    component.loadingVisible = Visibility;
    component.checkoutLocalBranch(LocalBranch).then(() => {
      expect(component.loadingVisible).toBeFalsy();
      done();
    });
  });

  it ('test the checkoutLocalBranch function with local as current', (done) => {
    const LocalBranch = 'current';
    const CurrentBranch = 'current';
    const Visibility = true;
    component.currentBranch = CurrentBranch;
    component.loadingVisible = Visibility;
    component.checkoutLocalBranch(LocalBranch);
    done();
  });

  it ('test the checkoutRemoteBranch function with branch not in local', (done) => {
    const RemoteBranch = 'origin/test';
    const CurrentBranch = 'current';
    const LocalBranches = ['master', 'toto'];
    const Visibility = true;
    component.currentBranch = CurrentBranch;
    component.localBranches = LocalBranches;
    component.loadingVisible = Visibility;
    component.checkoutRemoteBranch(RemoteBranch).then(() => {
      expect(component.loadingVisible).toBeFalsy();
      done();
    });
  });

  it ('test the checkoutRemoteBranch function with branch in local and valid', (done) => {
    const RemoteBranch = 'origin/toto';
    const CurrentBranch = 'current';
    const LocalBranches = ['master', 'toto'];
    const Visibility = true;
    component.currentBranch = CurrentBranch;
    component.localBranches = LocalBranches;
    component.loadingVisible = Visibility;
    component.checkoutRemoteBranch(RemoteBranch).then(() => {
      expect(component.loadingVisible).toBeFalsy();
      done();
    });
  });

  it ('test the checkoutRemoteBranch function with branch in local and no data back', (done) => {
    const RemoteBranch = 'origin/other';
    const CurrentBranch = 'current';
    const LocalBranches = ['master', 'toto', 'other'];
    const Visibility = true;
    component.currentBranch = CurrentBranch;
    component.localBranches = LocalBranches;
    component.loadingVisible = Visibility;
    component.checkoutRemoteBranch(RemoteBranch).then(() => {
      expect(component.loadingVisible).toBeFalsy();
      done();
    });
  });

  it ('test the checkoutRemoteBranch function with branch in local and data back', (done) => {
    const RemoteBranch = 'origin/newdata';
    const CurrentBranch = 'current';
    const LocalBranches = ['master', 'toto', 'newdata'];
    const Visibility = true;
    component.currentBranch = CurrentBranch;
    component.localBranches = LocalBranches;
    component.loadingVisible = Visibility;
    spyOn(component.checkoutInfoBarChange, 'emit');
    component.checkoutRemoteBranch(RemoteBranch).then(() => {
      expect(component.checkoutInfoBarChange.emit).toHaveBeenCalledWith(RemoteBranch);
      done();
    });
  });

  it ('test the openCreateBranchInfoBar function with a local branch', () => {
    const LocalBranch = 'localBranch';
    spyOn(component.createBranchInfoBar, 'emit');
    component.openCreateBranchInfoBar(LocalBranch);
    fixture.detectChanges();
    expect(component.createBranchInfoBar.emit).toHaveBeenCalledWith(LocalBranch);
  });

  it ('test the openCreateBranchInfoBar function with a remote branch', () => {
    const RemoteBranch = 'origin/newData';
    spyOn(component.createBranchInfoBar, 'emit');
    component.openCreateBranchInfoBar(RemoteBranch);
    fixture.detectChanges();
    expect(component.createBranchInfoBar.emit).toHaveBeenCalledWith(RemoteBranch);
  });


  it('test the renameBranch function', () => {
    const OldBranch = 'toto';
    component.newBranchCouple = new NewBranchCouple();
    component.newBranchCouple.oldBranch = 'titi';
    component.renameBranch(OldBranch);
    expect(component.newBranchCouple.oldBranch).toEqual(OldBranch);
  });

  it ('test the openDeleteBranchInfoBar function with a local branch', () => {
    const LocalBranch = 'localBranch';
    spyOn(component.deleteBranchInfoBar, 'emit');
    component.openDeleteBranchInfoBar(LocalBranch);
    fixture.detectChanges();
    expect(component.deleteBranchInfoBar.emit).toHaveBeenCalledWith(LocalBranch);
  });

  it ('test the openDeleteBranchInfoBar function with a remote branch', () => {
    const RemoteBranch = 'origin/newData';
    spyOn(component.deleteBranchInfoBar, 'emit');
    component.openDeleteBranchInfoBar(RemoteBranch);
    fixture.detectChanges();
    expect(component.deleteBranchInfoBar.emit).toHaveBeenCalledWith(RemoteBranch);
  });

  it ('test the mergeBranchInto function', () => {
    const LocalBranch = 'localBranch';
    spyOn(component.mergeBranch, 'emit');
    component.mergeBranchInto(LocalBranch);
    fixture.detectChanges();
    expect(component.mergeBranch.emit).toHaveBeenCalledWith(LocalBranch);
  });

  it ('test the ngOnDestroy function with defined subscriptions', () => {
    component.ngOnInit();
    component.ngOnDestroy();

    expect(component.themePrefSubscription.closed).toBeTruthy();
    expect(component.branchNameSubscription.closed).toBeTruthy();
    expect(component.localBranchesSubscription.closed).toBeTruthy();
    expect(component.loadingVisibleSubscription.closed).toBeTruthy();
  });

  it ('test the ngOnDestroy function with undefined subscriptions', () => {
    component.ngOnDestroy();

    expect(component.themePrefSubscription).toBeUndefined();
    expect(component.branchNameSubscription).toBeUndefined();
    expect(component.localBranchesSubscription).toBeUndefined();
    expect(component.loadingVisibleSubscription).toBeUndefined();
  });
});
