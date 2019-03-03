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
  let component: CopyButtonComponent;
  let fixture: ComponentFixture<CopyButtonComponent>;
  let inputEl: DebugElement;

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
    inputEl = fixture.debugElement.query(By.css('input.gh-copy-button'));
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

  it('test the copy function', (done) => {
    const Content = true;
    const Template = 'Hello world';

    component.template = Template;
    expect(component.copyToClipboard()).toBeTruthy();
    done();
  });
});
