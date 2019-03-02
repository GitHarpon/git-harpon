import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

  @Input() title: String;
  @Input() disabled: Boolean = false;
  @Input() icon: {
    name: String,
    isFab: Boolean
  };
  themePrefSubscription: Subscription;
  currentTheme: string;

  constructor(private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

}
