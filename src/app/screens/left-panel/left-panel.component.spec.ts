import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelComponent } from './left-panel.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';

describe('LeftPanelComponent', () => {
  /* tslint:disable */
  let component: LeftPanelComponent;
  let fixture: ComponentFixture<LeftPanelComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPanelComponent ],
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        })
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
    fixture = TestBed.createComponent(LeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the ngOnInit function', () => {
    component.ngOnInit();
    expect(component.themePrefSubscription.closed).toBeFalsy();
  });

  it('tests the ngOnDestroy function', () => {
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.themePrefSubscription.closed).toBeTruthy();
  });
});
