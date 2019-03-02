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
    // faire deux fonction ici en changeant nom a cahque fois
    component.value = Empty;
    fixture.detectChanges();
    expect(component.value).toEqual(Empty);
  }));

  it('tests the getOptKey function with valid idKey', fakeAsync( () => {
    const Opt = { key: 'test1key', value: 'test1val' };
    const Expected = Opt.key;

    component.idKey = 'key';

    const Result = component.getOptKey(Opt);

    expect(Result).toEqual(Expected);
  }));

  // tester cas else optKey et optValue

  it('tests the getOptValue function with valid valueKey', fakeAsync( () => {
    const Opt = { key: 'test1key', value: 'test1val' };
    const Expected = Opt.value;

    component.valueKey = 'value';

    const Result = component.getOptValue(Opt);

    expect(Result).toEqual(Expected);
  }));

  it('tests the isSelected function with valid currentValue', fakeAsync( () => {
    const Opt = { key: 'test1key', value: 'test1val' };
    const Expected = 'selected';

    component.idKey = 'key';
    component.valueKey = 'value';
    component.value = Opt.key;

    expect(component.isSelected(Opt)).toEqual(Expected);

  }));

  it('tests the isSelected function with valid currentValue', fakeAsync( () => {
    const Opt = { key: 'test1key', value: 'test1val' };
    const BadOpt = { key: 'badkey', value: 'badval' };
    const Expected = '';

    component.idKey = 'key';
    component.valueKey = 'value';
    component.value = BadOpt.key ;

    expect(component.isSelected(Opt)).toEqual(Expected);
  }));
});
