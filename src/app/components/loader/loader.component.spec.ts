import { async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

import { TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { load } from '@angular/core/src/render3';

describe('LoaderComponent', () => {
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;
    let loaderEl: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LoaderComponent],
        imports: [
        ],
        providers: [
          {
            provide: TranslateService,
            useClass: MockTranslateService
          },
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
      loaderEl = fixture.debugElement.query(By.css('h2.gh-loader_content'));
    });

    it('tests the component creation', () => {
      expect(component).toBeTruthy();
    });

    // it('tests the component loading value', () => {
    //   component.loading = true;
    //   fixture.detectChanges();
    //   expect(component.loading).toBe(true);
    // });

});
