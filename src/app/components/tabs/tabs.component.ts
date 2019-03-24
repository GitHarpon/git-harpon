import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  currentValue: String;
  themePrefSubscription: Subscription;
  currentTheme: string;
  @Input() data: Array<any>;
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

  setValue(newVal) {
    this.currentValue = newVal;
    this.valueChange.emit(this.currentValue);
  }

  constructor(private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.themePrefSubscription.unsubscribe();
  }

}
