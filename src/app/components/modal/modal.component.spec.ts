import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


let translations: any = {"CARDS_TITLE": "This is a test"};

class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return translations;
  }
}


describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader},
        })
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
    const classList = modalEl.nativeElement.classList;
    expect(classList).toContain('visible');
  });

  it('tests the visible property with false value', () => {
    component.visible = false;
    fixture.detectChanges();
    const classList = modalEl.nativeElement.classList;
    expect(classList.contains('visible')).toBeFalsy();
  });

  it('tests the openModal function', () => {
    component.closeModal();
    expect(component.visible).toBeFalsy();
  });
});
