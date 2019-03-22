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
});
