import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCommitComponent } from './send-commit.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { ButtonComponent } from '../../components/button/button.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GitService } from '../../providers/git.service';
import { MockGitService } from '../../models/MockGitService';
import { MockTranslateService } from '../../models/MockTranslateService';

describe('SendCommitComponent', () => {
  /* tslint:disable */
  let component: SendCommitComponent;
  let fixture: ComponentFixture<SendCommitComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SendCommitComponent,
        ButtonComponent
      ],
      imports: [
        TranslateModule
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCommitComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('test the ngOnInit function', () => {
    component.ngOnInit();

    expect(component.themePrefSubscription).toBeDefined();
  });

  it ('test the ngOnDestroy function with defined themePrefSubscription', () => {
    component.ngOnInit();
    component.ngOnDestroy();

    expect(component.themePrefSubscription.closed).toBeTruthy();
  });

  it ('test the ngOnDestroy function with undefined themePrefSubscription', () => {
    component.ngOnDestroy();

    expect(component.themePrefSubscription).toBeUndefined();
  });
});
