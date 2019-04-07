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

  it('tests the addFile function with valid parameter', () => {
    const Path = 'C:/Src/Projet/git-harpon';
    const ComponentType = 'unstage';
    component.componentType = ComponentType;
    const Return = component.addFile(Path);
    expect(Return).toBeTruthy();
  });

  it('tests the addFile function with invalid parameter', () => {
    const Path = 'C:/Src/Projet/git-harpon';
    const ComponentType = 'stage';
    component.componentType = ComponentType;
    const Return = component.addFile(Path);
    expect(Return).toBeFalsy();
  });

  it('tests the removeFile function with valid parameter', () => {
    const Path = 'C:/Src/Projet/git-harpon';
    const ComponentType = 'stage';
    component.componentType = ComponentType;
    const Return = component.removeFile(Path);
    expect(Return).toBeTruthy();
  });

  it('tests the removeFile function with invalid parameter', () => {
    const Path = 'C:/Src/Projet/git-harpon';
    const ComponentType = 'unstage';
    component.componentType = ComponentType;
    const Return = component.removeFile(Path);
    expect(Return).toBeFalsy();
  });

  it('tests the openDiffView function', () => {
    const Path = 'path/to/file';
    component.diffFileInformation = {
      children: '',
      file: '',
      isCurrentCommit: true,
      parent: ''
    };

    component.openDiffView(Path);

    expect(component.diffFileInformation.file).toBe(Path);
  });

  it('tests the ngOnDestroy function with valid themePrefSubscription', () => {
    component.ngOnDestroy();
    expect(component.themePrefSubscription.closed).toBeTruthy();
  });



  it('tests the ngOnDestroy function with valid themePrefSubscription', () => {
    component.themePrefSubscription = undefined;
    component.ngOnDestroy();
    expect(component.themePrefSubscription).toBeUndefined();
  });
});
