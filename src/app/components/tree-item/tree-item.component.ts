import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GitService } from '../../providers/git.service';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent implements OnDestroy {
  @Input() item: any;
  isOpen: boolean;
  currentTheme: string;
  themePrefSubscription: Subscription;
  @Input() depth: number;

  constructor(private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
    this.isOpen = false;
  }

  isFolder() {
    return this.item.children && this.item.children.length;
  }

  toggle() {
    if (this.isFolder()) {
      this.isOpen = !this.isOpen;
    }
  }

  getDepth() {
    const Depth = this.depth + 0.5;
    return { 'padding-left': Depth + 'em'};
  }
  
  getFileDepth() {
    const Depth = this.depth === 0 ? 0 : this.depth + 0.5;
    return { 'padding-left': Depth + 'em'};
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
  }

}
