import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss']
})
export class CopyButtonComponent {

  @Input() template: string;
  copy: Boolean;
  themePrefSubscription: Subscription;
  currentTheme: string;


  constructor(private clipboardService: ClipboardService, private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  async copyToClipboard() {
    this.clipboardService.copyFromContent(this.template);
    return this.switchCopy();
  }

  async switchCopy() {
    this.copy = true;
    return setTimeout(time => {
      this.copy = false;
    }, 500);
  }

}
