import { async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      imports: [
        FormsModule
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
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input.gh-dropdown'));
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the component value and accessors', fakeAsync(() => {
    const Content = 'axuluphrum';
    const Empty = '';
    component.value = Content;
    fixture.detectChanges();
    expect(component.value).toEqual(Content);
    component.value = Empty;
    fixture.detectChanges();
    expect(component.value).toEqual(Empty);
  }));

  it('tests the optkey', fakeAsync( () => {
    const Opts: Array<any> = [
      { key: 'test1key', value: 'test1val' },
      { key: 'test2key', value: 'test2val' }
    ];
    component.options = Opts;
    component.idKey = 'key';
    component.valueKey = 'value';
    component.currentValue = 'test1val';
    fixture.detectChanges();
    expect(component.getOptKey(Opts)).toEqual('test1key');
    expect(component.getOptValue(Opts)).toEqual('test1val');
  }));

  it('tests isSelected', fakeAsync( () => {
    const Opts: Array<any> = [
      { key: 'test1key', value: 'test1val' },
      { key: 'test2key', value: 'test2val' }
    ];
    const OptSel1: any = { key: 'test1key', value: 'test1val'};
    const OptSel2: any = { key: 'test2key', value: 'test2val'};
    component.idKey = 'key';
    component.valueKey = 'value';
    component.currentValue = 'test1val';
    component.options = Opts;
    fixture.detectChanges();
    expect(component.isSelected(OptSel1)).toEqual('selected');
    expect(component.isSelected(OptSel2)).toEqual('');
  }));

});
