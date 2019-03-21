import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GitService } from '../../providers/git.service';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnDestroy {

  @Input() tree: any;
  @Input() componentType: any = 'stage';
  componentHovered: any;
  currentTheme: string;
  themePrefSubscription: Subscription;

  constructor(private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  isFolder(item) {
    return item.children && item.children.length;
  }

  mouseEnter(filePath: any) {
    if (this.componentType === 'unstage' || this.componentType === 'stage') {
      this.componentHovered = filePath;
    }
  }

  mouseLeave() {
    if (this.componentType === 'unstage' || this.componentType === 'stage') {
      this.componentHovered = '';
    }
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
  }

}
