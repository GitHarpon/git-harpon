// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { GraphComponent } from './graph.component';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { MockTranslateLoader } from '../../models/MockTranslateLoader';
// import { ThemePreferencesService } from '../../providers/theme-preferences.service';
// import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';

// describe('GraphComponent', () => {
//   /* tslint:disable */
//   let component: GraphComponent;
//   let fixture: ComponentFixture<GraphComponent>;
//   /* tslint:enable */

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ GraphComponent ],
//       imports: [
//         TranslateModule.forRoot({
//           loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
//         })
//       ],
//       providers: [
//         {
//           provide: ThemePreferencesService,
//           useClass: MockThemePreferencesService
//         }
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(GraphComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('tests the component creation', () => {
//     expect(component).toBeTruthy();
//   });

//   it('tests the ngOnInit function', () => {
//     component.ngOnInit();
//     expect(component.themePrefSubscription.closed).toBeFalsy();
//   });

//   it('tests the ngOnDestroy function', () => {
//     component.ngOnInit();
//     component.ngOnDestroy();
//     expect(component.themePrefSubscription.closed).toBeTruthy();
//   });
// });
