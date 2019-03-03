import { async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';

describe('LoaderComponent', () => {
    /* tslint:disable */
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;

    /* tslint:enable */
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LoaderComponent],
        imports: [
          TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useClass: MockTranslateLoader},
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
      fixture = TestBed.createComponent(LoaderComponent);
      component = fixture.componentInstance;

    });

    it('tests the component creation', () => {
      expect(component).toBeTruthy();
    });

    it('tests the component loading value', () => {
      component.loading = true;
      expect(component.loading).toBe(true);
    });

});
