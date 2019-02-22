import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit {

  @Input() name: String;
  @Input() placeholder: String;
  @Input() readonly: Boolean;
  @Input() disabled: Boolean;
  @Input() max: number;
  @Input() min: number;
  currentValue: number;
  form: FormControl;
  themePrefSubscription: Subscription;
  currentTheme: string;

  @Output()
  valueChange = new EventEmitter<number>();

  @Input()
  get value() {
    return this.currentValue;
  }

  set value(val) {
    if (val > this.max) {
      this.form.setValue(this.max);
      this.currentValue = this.max;
    } else if (val < this.min) {
      this.form.setValue(this.min);
      this.currentValue = this.min;
    } else {
      this.currentValue = val;
    }
    this.valueChange.emit(this.currentValue);
  }

  constructor(private translateService: TranslateService, private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  ngOnInit() {
    this.form = new FormControl('');
  }

  getPlaceholderTranslation() {
    return this.translateService.instant(this.placeholder.toUpperCase().toString());
  }
}
