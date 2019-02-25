import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() large: Boolean;
  @Input() medium: Boolean;
  @Input() fullscreen: Boolean;
  @Input() title: String;
  @Input() loading: Boolean = false;
  currentVisible: Boolean;

  @Output()
  visibleChange = new EventEmitter<Boolean>();
  themePrefSubscription: Subscription;
  currentTheme: string;

  @Input()
  get visible() {
    return this.currentVisible;
  }

  set visible(visible) {
    this.currentVisible = visible;
    this.visibleChange.emit(this.currentVisible);
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

  closeModal() {
    if (!this.loading) {
      this.visible = false;
    }
  }

}
