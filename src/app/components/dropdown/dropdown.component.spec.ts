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
  /* tslint:disable */
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  /* tslint:enable */

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
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the component setter and getter', fakeAsync(() => {
    const Content = 'axuluphrum';

    component.value = Content;

    expect(component.value).toEqual(Content);
  }));

  it('tests the component getter with empty value', fakeAsync(() => {
    const Content = 'axuluphrum';
    const Empty = '';

    component.required = true;
    component.value = Content;
    component.value = Empty;

    expect(component.value).toEqual(Content);
  }));

  it('tests the getOptKey function with valid idKey', fakeAsync( () => {
    const Opt = { key: 'test1key', value: 'test1val' };
    const Expected = Opt.key;
    const Key = 'key';

    component.idKey = Key;

    const Result = component.getOptKey(Opt);

    expect(Result).toEqual(Expected);
  }));

  it('tests the getOptKey function with invalid idKey', fakeAsync( () => {
    const Opt = { key: 'test1key', value: 'test1val' };
    const Expected = null;

    const Result = component.getOptKey(Opt);

    expect(Result).toEqual(Expected);
  }));

  it('tests the getOptValue function with valid valueKey', fakeAsync( () => {
    const Opt = { key: 'test1key', value: 'test1val' };
    const Expected = Opt.value;
    const Value = 'value';

    component.valueKey = Value;

    const Result = component.getOptValue(Opt);

    expect(Result).toEqual(Expected);
  }));

  it('tests the getOptValue function with invalid valueKey', fakeAsync( () => {
    const Opt = { key: 'test1key', value: 'test1val' };
    const Expected = null;

    const Result = component.getOptValue(Opt);

    expect(Result).toEqual(Expected);
  }));

  it('tests the isSelected function with valid currentValue', fakeAsync( () => {
    const Opt = { key: 'test1key', value: 'test1val' };
    const Expected = 'selected';
    const Key = 'key';
    const Value = 'value';

    component.idKey = Key;
    component.valueKey = Value;
    component.value = Opt.key;

    expect(component.isSelected(Opt)).toEqual(Expected);

  }));

  it('tests the isSelected function with invalid currentValue', fakeAsync( () => {
    const Opt = { key: 'test1key', value: 'test1val' };
    const BadOpt = { key: 'badkey', value: 'badval' };
    const Expected = '';
    const Key = 'key';
    const Value = 'value';

    component.idKey = Key;
    component.valueKey = Value;
    component.value = BadOpt.key ;

    expect(component.isSelected(Opt)).toEqual(Expected);
  }));
});
