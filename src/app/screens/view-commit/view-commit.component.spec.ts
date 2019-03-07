import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommitComponent } from './view-commit.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { GitService } from '../../providers/git.service';
import { MockGitService } from '../../models/MockGitService';
import { ButtonComponent } from '../../components/button/button.component';
import { TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../models/MockTranslateService';

describe('ViewCommitComponent', () => {
  /* tslint:disable */
  let component: ViewCommitComponent;
  let fixture: ComponentFixture<ViewCommitComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewCommitComponent,
        ButtonComponent
      ],
      providers: [
        {
          provide: ThemePreferencesService,
          useClass: MockThemePreferencesService
        },
        {
          provide: RightPanelService,
          useClass: MockRightPanelService
        },
        {
          provide: GitService,
          useClass: MockGitService
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
    fixture = TestBed.createComponent(ViewCommitComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('tests the ngOnInit function', () => {
    component.ngOnInit();

    expect(component.themePrefSubscription).toBeDefined();
    expect(component.commitHashSubscription).toBeDefined();
  });

  it('tests the setDescription function', (done) => {
    const Hash = '72267b6ad64858f2db2d597f67004b59e543928b';
    component.commitHash = Hash;

    component.setDescription().then(() => {
      expect(component.currentDescription).toBeDefined();
      expect(component.currentDescription.oid).toBe(Hash);
      done();
    });
  });

  it ('tests the ngOnDestroy function with defined themePrefSubscription', () => {
    component.ngOnInit();
    component.ngOnDestroy();

    expect(component.themePrefSubscription.closed).toBeTruthy();
    expect(component.commitHashSubscription.closed).toBeTruthy();
  });

  it ('tests the ngOnDestroy function with undefined themePrefSubscription', () => {
    component.ngOnDestroy();

    expect(component.themePrefSubscription).toBeUndefined();
    expect(component.commitHashSubscription).toBeUndefined();
  });
});
