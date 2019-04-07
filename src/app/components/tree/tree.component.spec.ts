import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeComponent } from './tree.component';
import { ButtonComponent } from '../button/button.component';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { MockGitService } from '../../models/MockGitService';
import { GitService } from '../../providers/git.service';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
import { MockTranslateService } from '../../models/MockTranslateService';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LeftPanelService } from '../../providers/left-panel.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { TreeItemComponent } from '../tree-item/tree-item.component';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { GraphService } from '../../providers/graph.service';
import { MockGraphService } from '../../models/MockGraphService';
import { TerminalManagerService } from '../../providers/terminal-manager.service';
import { MockTerminalManagerService } from '../../models/MockTerminalManagerService';
import { ContextMenuModule } from 'ngx-contextmenu';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResizableModule } from 'angular-resizable-element';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

describe('TreeComponent', () => {
  /* tslint:disable */
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TreeComponent,
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
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('tests the isFolder function', () => {
    const Folder = {
        children: [
          {
            repo: 'file1'
          }
        ]
      };
    const Return = component.isFolder(Folder);
    expect(Return).toBeTruthy();
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
