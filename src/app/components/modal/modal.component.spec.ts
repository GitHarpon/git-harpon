import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { LoaderComponent } from '../loader/loader.component';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent, LoaderComponent ],
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
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalEl = fixture.debugElement.query(By.css('div.gh-modal'));
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the visible property with true value', () => {
    component.visible = true;
    fixture.detectChanges();
    const ClassList = modalEl.nativeElement.classList;
    expect(ClassList).toContain('visible');
  });

  it('tests the visible property with false value', () => {
    component.visible = false;
    fixture.detectChanges();
    const ClassList = modalEl.nativeElement.classList;
    expect(ClassList.contains('visible')).toBeFalsy();
  });

  it('tests the openModal function', () => {
    component.closeModal();
    expect(component.visible).toBeFalsy();
  });
});
