import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';
import { TreeItemComponent } from '../tree-item/tree-item.component';
import { ButtonComponent } from '../button/button.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { ElectronService } from '../../providers/electron.service';
import { MockElectronService } from '../../models/MockElectronService';
import { MockGitService } from '../../models/MockGitService';
import { GitService } from '../../providers/git.service';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockTerminalManagerService } from '../../models/MockTerminalManagerService';
import { TerminalManagerService } from '../../providers/terminal-manager.service';
import { MockGraphService } from '../../models/MockGraphService';
import { GraphService } from '../../providers/graph.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ContextMenuModule } from 'ngx-contextmenu';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { ResizableModule } from 'angular-resizable-element';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('TabsComponent', () => {
  /* tslint:disable */
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabsComponent,
        TreeItemComponent,
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
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tests the setter of value', () => {
    const Content = 'content';
    spyOn(component.valueChange, 'emit');
    component.value = Content;
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith(Content);
  });

  it('tests the getter of value', () => {
    const Content = 'content';
    component.value = Content;
    expect(component.value).toBe(Content);
  });

  it('tests the setValue function', () => {
    const Content = 'content2';
    spyOn(component.valueChange, 'emit');
    component.setValue(Content);
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith(Content);
  });
});
