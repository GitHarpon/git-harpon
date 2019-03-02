import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  @Input() disabled: Boolean = false;
  @Input() required: Boolean = false;
  themePrefSubscription: Subscription;
  currentTheme: string;

  currentValue: string;
  @Input() idKey: String;
  @Input() valueKey: String;

  @Output()
  valueChange = new EventEmitter<string>();
  @Input()
  options: Array<string>;
  @Input()
  get value(): any {
    return this.currentValue;
  }
  set value(val: any) {
    if ( !(val == '' && this.required)) {
      this.currentValue = val;
      this.valueChange.emit(val);
    }
  }

  constructor(private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
   }

  getOptKey(option: any) {
    if (this.idKey) {
      return option[this.idKey.toString()];
    }
    return null;
  }

  isSelected(opt) {
    const Value = this.getOptKey(opt);
    const Selected = 'selected';
    const Empty = '';
    if (Value === this.currentValue) {
      return Selected;
    }
    return Empty;
  }

  getOptValue(option: any) {
    if (this.valueKey) {
      return option[this.valueKey.toString()];
    }
    return null;
  }
}
