import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent } from './graph.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';

describe('GraphComponent', () => {
  /* tslint:disable */
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;
  let rightPanelService: RightPanelService;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphComponent, InputComponent, ButtonComponent ],
      imports: [
        FormsModule,
        BrowserModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        })
      ],
      providers: [
        {
          provide: ThemePreferencesService,
          useClass: MockThemePreferencesService
        },
        {
          provide: RightPanelService,
          useClass: MockRightPanelService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    rightPanelService = TestBed.get(RightPanelService);
    fixture.detectChanges();
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the ngOnInit function', () => {
    component.ngOnInit();
    expect(component.themePrefSubscription).toBeDefined();
  });

  it('tests the openViewCommit function', () => {
    component.openViewCommit();

    expect(rightPanelService.isView).toBeTruthy();
  });

  it('tests the openSendCommit function', () => {
    component.openSendCommit();

    expect(rightPanelService.isView).toBeFalsy();
  });

  it('tests the ngOnDestroy function', () => {
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.themePrefSubscription.closed).toBeTruthy();
  });
});
