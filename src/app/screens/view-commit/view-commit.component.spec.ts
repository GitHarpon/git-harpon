import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommitComponent } from './view-commit.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { GitService } from '../../providers/git.service';
import { MockGitService } from '../../models/MockGitService';
import { ButtonComponent } from '../../components/button/button.component';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockTranslateService } from '../../models/MockTranslateService';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommitTextAreaComponent } from '../../components/commit-text-area/commit-text-area.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { FileDiffCommitComponent } from '../../components/file-diff-commit/file-diff-commit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { ClipboardService, ClipboardModule } from 'ngx-clipboard';
import { CommitDescription } from '../../models/CommitInformations';

describe('ViewCommitComponent', () => {
  /* tslint:disable */
  let component: ViewCommitComponent;
  let fixture: ComponentFixture<ViewCommitComponent>;
  let TemplateCommit: CommitDescription;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewCommitComponent,
        ButtonComponent,
        LoaderComponent,
        TextAreaComponent,
        CommitTextAreaComponent,
        FileDiffCommitComponent,
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
          provide: RightPanelService,
          useClass: MockRightPanelService
        },
        {
          provide: GitService,
          useClass: MockGitService
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        ClipboardService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCommitComponent);
    component = fixture.componentInstance;
    TemplateCommit = {
      oid: 'd9159aa643063b627939dd434b4134371b1dcf0b',
      message: 'Hello world',
      tree: '0f154817e0dd2cc13bb8312082565ee9296fc293',
      parent: [
          'e35d4be0cb6bbe7e852d6e9160b3a023f1b537d3'
      ],
      author: {
        name: 'toto',
        email: 'toto@mail.com',
        timestamp: 1552840891,
        timezoneOffset: -60
      },
      committer: {
        name: 'toto',
        email: 'toto@mail.com',
        timestamp: 1552840891,
        timezoneOffset: -60
      },
      gpgsig: null,
      files: [
          {status: 'M', path: 'src/app/modified.txt'},
          {status: 'A', path: 'src/app/added'},
          {status: 'D', path: 'src/deleted.txt'}
      ]
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('tests the ngOnInit function', () => {
    const Hash = '72267b6ad64858f2db2d597f67004b59e543928b';
    component.commitHash = Hash;
    component.ngOnInit();

    expect(component.themePrefSubscription).toBeDefined();
    expect(component.commitHashSubscription).toBeDefined();
  });

  it ('tests the getCommitSummary function with valid currentDescription', () => {
    component.currentDescription = this.TemplateCommit;

    expect(component.getCommitSummary).toBe(TemplateCommit.message.split('\n\n')[0]);
  });

  it ('tests the getCommitSummary function with invalid currentDescription', () => {
    component.currentDescription = null;

    expect(component.getCommitSummary).toBeNull();
  });

  it ('tests the getCommitDescription function with valid currentDescription', () => {
    component.currentDescription = this.TemplateCommit;

    const Result;

    expect(component.getCommitDescription).toBe(TemplateCommit.message.split('\n\n')[0]);
  });

  it ('tests the getCommitDescription function with invalid currentDescription', () => {
    component.currentDescription = null;

    expect(component.getCommitDescription).toBeNull();
  });

  it('tests the setDescription function', (done) => {
    const Hash = '72267b6ad64858f2db2d597f67004b59e543928b';
    component.commitHash = Hash;

    component.setDescription().then(() => {
      expect(component.currentDescription).toBeDefined();
      expect(component.currentDescription.oid).toBe(Hash);
      done();
    });
  });

  it ('tests the ngOnDestroy function with defined themePrefSubscription', () => {
    component.ngOnInit();
    component.ngOnDestroy();

    expect(component.themePrefSubscription.closed).toBeTruthy();
    expect(component.commitHashSubscription.closed).toBeTruthy();
  });

  it ('tests the ngOnDestroy function with undefined themePrefSubscription', () => {
    component.ngOnDestroy();

    expect(component.themePrefSubscription).toBeUndefined();
    expect(component.commitHashSubscription).toBeUndefined();
  });
});
