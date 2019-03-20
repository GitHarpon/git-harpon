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
import { TranslateService } from '@ngx-translate/core';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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
    fixture = TestBed.createComponent(TreeItemComponent);
    component = fixture.componentInstance;
    treeEl = fixture.debugElement.query(By.css('li'));
  });

  it('should create', () => {
    component.item = { file: 'toto.txt', status: 'A' };
    fixture.detectChanges();
    treeEl.nativeElement.dispatchEvent(new Event('input'));
    expect(component).toBeTruthy();
  });
});
