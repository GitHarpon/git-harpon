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
import { MockTranslateLoader } from '../../models/MockTranslateLoader';

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
        FileDiffCommitComponent
      ],
      imports: [
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

  it ('test the removeAllFile function', () => {
    const Path = 'src/file1';
    component.ngOnInit();
    component.listUnstagedFiles = [];
    component.removeAllFile();
    expect(component.listUnstagedFiles[0].path).toBe(Path);
  });
});
