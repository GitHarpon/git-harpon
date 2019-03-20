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
import { TranslateService } from '@ngx-translate/core';
import { LeftPanelService } from '../../providers/left-panel.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { TreeItemComponent } from '../tree-item/tree-item.component';

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
      providers: [
        {
          provide: ThemePreferencesService,
          useClass: MockThemePreferencesService
        }
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
});
