import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

import { MockTranslateService } from '../../models/MockTranslateService';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';

describe('AccordionComponent', () => {
let component: AccordionComponent;
let fixture: ComponentFixture<AccordionComponent>;
// let accordionEl: DebugElement;

beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [AccordionComponent],
    imports: [
        NgbModule
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
        fixture = TestBed.createComponent(AccordionComponent);
        component = fixture.componentInstance;
        // accordionEl = fixture.debugElement.query(By.css('.gh-accordion'));
    });

    it('tests the component creation', () => {
        expect(component).toBeTruthy();
    });

    it('tests if the component detect the disabled change', () => {
        component.icon = {name: 'fa-laptop', isFab: false};
        fixture.detectChanges();
        component.disabled = true;
        fixture.detectChanges();
        expect(component.disabled).toBe(true);
    });

});
