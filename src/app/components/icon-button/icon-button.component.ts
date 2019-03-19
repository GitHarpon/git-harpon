import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {

  @Input() value: String;
  @Input() tooltipValue: String;
  @Input() placement: String;
  @Input() disabled: Boolean = false;
  @Input() icon: {
    name: String,
    isFab: Boolean
  };
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();
  themePrefSubscription: Subscription;
  currentTheme: string;


  constructor(private translateService: TranslateService, private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  execClick(evt) {
    if (!this.disabled) {
      this.buttonClicked.emit(evt);
    }
  }

  getValueTranslation() {
    return this.translateService.instant(this.value.toUpperCase().toString());
  }

  getTooltipTranslation() {
    return this.translateService.instant(this.tooltipValue.toUpperCase().toString());
  }
}
