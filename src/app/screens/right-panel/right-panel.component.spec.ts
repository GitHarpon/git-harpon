import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelComponent } from './right-panel.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { ViewCommitComponent } from '../view-commit/view-commit.component';
import { SendCommitComponent } from '../send-commit/send-commit.component';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { RightPanelService } from '../../providers/right-panel.service';

describe('RightPanelComponent', () => {
  /* tslint:disable */
  let component: RightPanelComponent;
  let fixture: ComponentFixture<RightPanelComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RightPanelComponent,
        ViewCommitComponent,
        SendCommitComponent
      ],
      providers: [
        {
          provide: RightPanelService,
          useClass: MockRightPanelService
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('test the ngOnInit function', () => {
    component.ngOnInit();

    expect(component.isViewSubscription).toBeDefined();
  });

  it ('test the ngOnDestroy function with defined isViewSubscription', () => {
    component.ngOnInit();
    component.ngOnDestroy();

    expect(component.isViewSubscription.closed).toBeTruthy();
  });

  it ('test the ngOnDestroy function with undefined isViewSubscription', () => {
    component.ngOnDestroy();

    expect(component.isViewSubscription).toBeUndefined();
  });
});
