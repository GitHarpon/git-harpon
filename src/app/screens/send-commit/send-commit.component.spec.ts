import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCommitComponent } from './send-commit.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { ButtonComponent } from '../../components/button/button.component';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { GitService } from '../../providers/git.service';
import { MockGitService } from '../../models/MockGitService';
import { MockTranslateService } from '../../models/MockTranslateService';
import { FileDiffCommitComponent } from '../../components/file-diff-commit/file-diff-commit.component';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { TreeComponent } from '../../components/tree/tree.component';
import { TreeItemComponent } from '../../components/tree-item/tree-item.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { CommitTextAreaComponent } from '../../components/commit-text-area/commit-text-area.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

describe('SendCommitComponent', () => {
  /* tslint:disable */
  let component: SendCommitComponent;
  let fixture: ComponentFixture<SendCommitComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SendCommitComponent,
        ButtonComponent,
        FileDiffCommitComponent,
        TreeItemComponent,
        TreeComponent,
        TabsComponent,
        CommitTextAreaComponent
      ],
      imports: [
        NgbModule,
        FormsModule,
        ClipboardModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        }),
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
          provide: TranslateService,
          useClass: MockTranslateService
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCommitComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('tests the ngOnInit function', () => {
    component.ngOnInit();

    expect(component.themePrefSubscription).toBeDefined();
  });

  it ('tests the ngOnDestroy function with defined themePrefSubscription', () => {
    component.ngOnInit();
    component.ngOnDestroy();

    expect(component.themePrefSubscription.closed).toBeTruthy();
  });

  it ('tests the ngOnDestroy function with undefined themePrefSubscription', () => {
    component.ngOnDestroy();

    expect(component.themePrefSubscription).toBeUndefined();
  });

  it ('test the addAllFile function', () => {
    const Path = 'src/file3';
    component.ngOnInit();
    component.listStagedFiles = [];
    component.addAllFile();
    expect(component.listStagedFiles[0].path).toBe(Path);
  });

  it ('test the commitChanges function', () => {
    component.ngOnInit();
    component.listStagedFiles = [];
    component.addAllFile();
    component.commitChanges();
    expect(component.listStagedFiles[0]).toBeUndefined();
  });

  it ('test the removeAllFile function', () => {
    const Path = 'src/file1';
    component.ngOnInit();
    component.listUnstagedFiles = [];
    component.removeAllFile();
    expect(component.listUnstagedFiles[0].path).toBe(Path);
  });
});
