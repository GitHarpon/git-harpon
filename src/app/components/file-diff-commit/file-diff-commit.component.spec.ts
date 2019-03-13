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
import { MockRightPanelService } from '../../models/MockRightPanelService';

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

  it('tests the addFile function with valid componentType', () => {
    const Type = 'unstage';
    const Path = 'src/file1';
    const ComponentHovered = '';
    component.componentHovered = Path;
    component.componentType = Type;
    component.addFile(Path);
    expect(component.componentHovered).toBe(ComponentHovered);
  });

  it('tests the addFile function with invalid componentType', () => {
    const Type = 'stage';
    const Path = '';
    const ComponentHovered = 'src/file1';
    component.componentHovered = ComponentHovered;
    component.componentType = Type;
    component.addFile(Path);
    expect(component.componentHovered).toBe(ComponentHovered);
  });

  it('tests the removeFile function with valid componentType', () => {
    const Type = 'stage';
    const Path = 'src/file1';
    const ComponentHovered = '';
    component.componentHovered = Path;
    component.componentType = Type;
    component.removeFile(Path);
    expect(component.componentHovered).toBe(ComponentHovered);
  });

  it('tests the removeFile function with invalid componentType', () => {
    const Type = 'unstage';
    const Path = '';
    const ComponentHovered = 'src/file1';
    component.componentHovered = ComponentHovered;
    component.componentType = Type;
    component.removeFile(Path);
    expect(component.componentHovered).toBe(ComponentHovered);
  });

  it('tests the mouseEnter function with valid componentType', () => {
    const Type = 'stage';
    const OldPath = 'src/oldfile';
    const NewPath = 'src/newfile1';
    component.componentHovered = OldPath;
    component.componentType = Type;
    component.mouseEnter(NewPath);
    expect(component.componentHovered).toBe(NewPath);
  });

  it('tests the mouseEnter function with invalid componentType', () => {
    const Type = 'something';
    const OldPath = 'src/oldfile';
    const NewPath = 'src/newfile1';
    component.componentHovered = OldPath;
    component.componentType = Type;
    component.mouseEnter(NewPath);
    expect(component.componentHovered).toBe(OldPath);
  });

  it('tests the mouseLeave function with valid componentType', () => {
    const Type = 'stage';
    const OldPath = 'src/oldfile';
    const NewPath = '';
    component.componentHovered = OldPath;
    component.componentType = Type;
    component.mouseLeave();
    expect(component.componentHovered).toBe(NewPath);
  });

  it('tests the mouseLeave function with invalid componentType', () => {
    const Type = 'something';
    const OldPath = 'src/oldfile';
    component.componentHovered = OldPath;
    component.componentType = Type;
    component.mouseLeave();
    expect(component.componentHovered).toBe(OldPath);
  });
});
