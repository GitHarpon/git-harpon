import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeItemComponent } from './tree-item.component';
import { ButtonComponent } from '../button/button.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { MockGitService } from '../../models/MockGitService';
import { GitService } from '../../providers/git.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
import { MockTranslateService } from '../../models/MockTranslateService';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ElectronService } from '../../providers/electron.service';
import { MockElectronService } from '../../models/MockElectronService';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { GraphService } from '../../providers/graph.service';
import { MockGraphService } from '../../models/MockGraphService';
import { TerminalManagerService } from '../../providers/terminal-manager.service';
import { MockTerminalManagerService } from '../../models/MockTerminalManagerService';
import { ToastrModule } from 'ngx-toastr';
import { ContextMenuModule } from 'ngx-contextmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { ResizableModule } from 'angular-resizable-element';

describe('TreeItemComponent', () => {
  /* tslint:disable */
  let component: TreeItemComponent;
  let fixture: ComponentFixture<TreeItemComponent>;
  let treeEl: DebugElement;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TreeItemComponent,
        ButtonComponent
      ],
      imports: [
        ContextMenuModule,
        FormsModule,
        ContextMenuModule,
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
          provide: TranslateService,
          useClass: MockTranslateService
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
          provide: TerminalManagerService,
          useClass: MockTerminalManagerService
        },
        {
          provide: LeftPanelService,
          useClass: MockLeftPanelService
        },
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeItemComponent);
    component = fixture.componentInstance;
    treeEl = fixture.debugElement.query(By.css('.gh-tree-item'));
  });

  it('should create', () => {
    component.item = { file: 'toto.txt', status: 'A' };
    fixture.detectChanges();
    treeEl.nativeElement.dispatchEvent(new Event('input'));
    expect(component).toBeTruthy();
  });

  it('tests the isFolder function', () => {
    const Folder = {
        children: [
          {
            repo: 'file1'
          }
        ]
      };
    component.item = Folder;
    const Return = component.isFolder();
    expect(Return).toBeTruthy();
  });

  it('tests the toggle function', () => {
    const Folder = {
        children: [
          {
            repo: 'file1'
          }
        ]
      };
    component.item = Folder;
    component.toggle();
    expect(component.isOpen).toBeTruthy();
  });

  it('tests the toggle function and not a folder', () => {
    const Folder = {
      repo: 'file1'
    };
    component.item = Folder;
    component.toggle();
    expect(component.isOpen).toBeFalsy();
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

  it('tests the computeCurrentPath function with file', () => {
    const Folder = {
      file: 'file1'
    };
    component.item = Folder;
    const Result = component.computeCurrentPath();
    expect(Result).toBe(Folder.file);
  });

  it('tests the computeCurrentPath function with folder', () => {
    const Folder = {
      folder: 'folder1',
      children: [
        {
          repo: 'file1'
        }
      ]
    };
    component.item = Folder;
    const Result = component.computeCurrentPath();
    expect(Result).toBe(Folder.folder);
  });

  it('tests the getDepth function', () => {
    const Depth = 0;
    const NewDepth = 0.5;
    const ExpectedReturn = {
      'padding-left': NewDepth + 'em'
    };
    component.depth = Depth;
    const Result = component.getDepth();
    expect(Result).toEqual(ExpectedReturn);
  });

  it('tests the getFolderDepth function with 0 depth', () => {
    const Depth = 0;
    const ExpectedReturn = {
      'padding-left': Depth + 'em'
    };
    component.depth = Depth;
    const Result = component.getFolderDepth();
    expect(Result).toEqual(ExpectedReturn);
  });

  it('tests the getFolderDepth function with depth', () => {
    const Depth = 2;
    const NewDepth = 2.5;
    const ExpectedReturn = {
      'padding-left': NewDepth + 'em'
    };
    component.depth = Depth;
    const Result = component.getFolderDepth();
    expect(Result).toEqual(ExpectedReturn);
  });

  it('tests the openDiffView function', () => {
    const Folder = {
      file: 'file1'
    };
    component.item = Folder;
    component.diffFileInformation = {
      children: '',
      file: '',
      isCurrentCommit: true,
      parent: ''
    };

    component.openDiffView();

    expect(component.diffFileInformation.file).toBeDefined();
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
