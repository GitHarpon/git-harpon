import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-commit-text-area',
  templateUrl: './commit-text-area.component.html',
  styleUrls: ['./commit-text-area.component.scss']
})
export class CommitTextAreaComponent {

  @Input() descPlaceholder: String;
  @Input() summaryPlaceholder: String;
  @Input() readonly: Boolean;
  @Input() rows: Number;
  @Input() cols: Number;
  @Input() descView: Boolean;
  @Input() descRows: Number = 1;
  currentDescValue: String;
  currentSummaryValue: String;
  themePrefSubscription: Subscription;
  currentTheme: string;
  @Output()
  descValueChange = new EventEmitter<String>();
  @Output()
  summaryValueChange = new EventEmitter<String>();

  @Input()
  get descValue() {
    return this.currentDescValue;
  }

  set descValue(val) {
    this.currentDescValue = val;
    this.descValueChange.emit(this.currentDescValue);
  }

  @Input()
  get summaryValue() {
    return this.currentSummaryValue;
  }

  set summaryValue(val) {
    this.currentSummaryValue = val;
    this.summaryValueChange.emit(this.currentSummaryValue);
  }

  constructor(private translateService: TranslateService, private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  getDescPlaceholderTranslation() {
    return this.translateService.instant(this.descPlaceholder.toUpperCase().toString());
  }

  getSummaryPlaceholderTranslation() {
    return this.translateService.instant(this.summaryPlaceholder.toUpperCase().toString());
  }

}
