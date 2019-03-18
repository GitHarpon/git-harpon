import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelComponent } from './right-panel.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { ViewCommitComponent } from '../view-commit/view-commit.component';
import { SendCommitComponent } from '../send-commit/send-commit.component';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { RightPanelService } from '../../providers/right-panel.service';
import { ButtonComponent } from '../../components/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { FileDiffCommitComponent } from '../../components/file-diff-commit/file-diff-commit.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { CommitTextAreaComponent } from '../../components/commit-text-area/commit-text-area.component';
import { NgbTooltip, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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
        SendCommitComponent,
        ButtonComponent,
        FileDiffCommitComponent,
        LoaderComponent,
        TextAreaComponent,
        CommitTextAreaComponent,
        FileDiffCommitComponent
      ],
      imports: [
        TranslateModule,
        NgbModule,
        FormsModule
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

  it ('tests the ngOnInit function', () => {
    component.ngOnInit();

    expect(component.isViewSubscription).toBeDefined();
  });

  it ('tests the ngOnDestroy function with defined isViewSubscription', () => {
    component.ngOnInit();
    component.ngOnDestroy();

    expect(component.isViewSubscription.closed).toBeTruthy();
  });

  it ('tests the ngOnDestroy function with undefined isViewSubscription', () => {
    component.ngOnDestroy();

    expect(component.isViewSubscription).toBeUndefined();
  });
});
