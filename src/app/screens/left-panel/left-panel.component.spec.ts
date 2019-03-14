import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelComponent } from './left-panel.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { GitService } from '../../providers/git.service';
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MockGitService } from '../../models/MockGitService';
import { ContextMenuComponent } from 'ngx-contextmenu';

describe('LeftPanelComponent', () => {
  /* tslint:disable */
  let component: LeftPanelComponent;
  let fixture: ComponentFixture<LeftPanelComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          LeftPanelComponent,
          AccordionComponent,
          ContextMenuComponent
      ],
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        }),
        NgbModule
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
          provide: LeftPanelService,
          useClass: MockLeftPanelService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelComponent);
    component = fixture.componentInstance;
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the ngOnInit function', () => {
    component.ngOnInit();

    expect(component.themePrefSubscription).toBeDefined();
    expect(component.branchNameSubscription).toBeDefined();
    expect(component.localBranchesSubscription).toBeDefined();
  });

  it ('test the ngOnDestroy function with defined subscriptions', () => {
    component.ngOnInit();
    component.ngOnDestroy();

    expect(component.themePrefSubscription.closed).toBeTruthy();
    expect(component.branchNameSubscription.closed).toBeTruthy();
    expect(component.localBranchesSubscription.closed).toBeTruthy();
  });

  it ('test the ngOnDestroy function with undefined subscriptions', () => {
    component.ngOnDestroy();

    expect(component.themePrefSubscription).toBeUndefined();
    expect(component.branchNameSubscription).toBeUndefined();
    expect(component.localBranchesSubscription).toBeUndefined();
  });
});
