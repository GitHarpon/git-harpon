import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-send-commit',
  templateUrl: './send-commit.component.html',
  styleUrls: ['./send-commit.component.scss']
})
export class SendCommitComponent implements OnInit, OnDestroy {
  themePrefSubscription: Subscription;
  currentTheme: string;

  constructor(private themePrefService: ThemePreferencesService) {
  }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
  }
}
