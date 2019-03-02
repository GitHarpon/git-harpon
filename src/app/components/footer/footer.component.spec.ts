import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ElectronService } from '../../providers/electron.service';
import { MockElectronService } from '../../models/MockElectronService';
import { Router } from '@angular/router';
import { MockRouter } from '../../models/MockRouter';
import { RouterTestingModule } from '@angular/router/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader},
        }),
        NgbModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        {
          provide: ThemePreferencesService,
          useClass: MockThemePreferencesService
        },
        {
          provide: ElectronService,
          useClass: MockElectronService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the ngOnInit function', () => {
    component.ngOnInit();
    expect(component.version).toBeDefined();
    expect(component.production).toBeDefined();
  });

  it('tests the openGithub function', () => {
    expect(component.openGithub()).toBeTruthy();
  });

  it('tests the getHomeTranslation function', () => {
    const ExpectedTranslation = 'HOME';
    expect(component.getHomeTranslation()).toBe(ExpectedTranslation);
  });
});
