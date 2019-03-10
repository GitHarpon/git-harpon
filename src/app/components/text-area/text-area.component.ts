import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {

  @Input() name: String;
  @Input() placeholder: String;
  @Input() readonly: Boolean;
  @Input() rows: Number;
  @Input() cols: Number;
  currentValue: String;
  themePrefSubscription: Subscription;
  currentTheme: string;
  @Output()
  valueChange = new EventEmitter<String>();

  @Input()
  get value() {
    return this.currentValue;
  }

  set value(val) {
    this.currentValue = val;
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

  getPlaceholderTranslation() {
    return this.translateService.instant(this.placeholder.toUpperCase().toString());
  }

}
