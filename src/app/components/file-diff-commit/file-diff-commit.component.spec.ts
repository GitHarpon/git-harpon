import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDiffCommitComponent } from './file-diff-commit.component';
import { ButtonComponent } from '../button/button.component';
import { MockGitService } from '../../models/MockGitService';
import { GitService } from '../../providers/git.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../models/MockTranslateService';
import { RightPanelService } from '../../providers/right-panel.service';
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';

describe('FileDiffCommitComponent', () => {
  /* tslint:disable */
  let component: FileDiffCommitComponent;
  let fixture: ComponentFixture<FileDiffCommitComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileDiffCommitComponent,
        ButtonComponent
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
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDiffCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tests the getFileNameFromPath function', () => {
    const Path = 'C:/Src/Projet/git-harpon';
    const FileName = 'git-harpon';
    expect(component.getFileNameFromPath(Path)).toBe(FileName);
  });
});
