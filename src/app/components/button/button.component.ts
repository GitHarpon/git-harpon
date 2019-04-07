import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() disabled: Boolean = false;
  @Input() value: String;
  @Input() submit: Boolean = false;
  @Input() large: Boolean = false;
  @Input() smallButton: Boolean = false;
  @Input() type: String = 'primary';
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
    this.buttonClicked.emit(evt);
  }

  getValueTranslation() {
    return this.translateService.instant(this.value.toUpperCase().toString());
  }
}
