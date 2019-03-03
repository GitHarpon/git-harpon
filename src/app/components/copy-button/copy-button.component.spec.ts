import { async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';

import { CopyButtonComponent } from './copy-button.component';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { ClipboardService, ClipboardModule } from 'ngx-clipboard';

describe('CopyButtonComponent', () => {
  /* tslint:disable */
  let component: CopyButtonComponent;
  let fixture: ComponentFixture<CopyButtonComponent>;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CopyButtonComponent],
      imports: [
        FormsModule,
        ClipboardModule
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
        ClipboardService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyButtonComponent);
    component = fixture.componentInstance;
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the switchcopy function immediatly', (done) => {
    component.switchCopy().then(() => {
      expect(component.copy).toBeTruthy();
      done();
    });
  });

  it('test the copyToClipboard function', (done) => {
    const Content = true;
    const Template = 'Hello world';

    component.template = Template;
    component.copyToClipboard().then(() => {
      expect(component.copy).toBeTruthy();
      expect(component.template).toEqual(Template);
      done();
    });
  });
});
