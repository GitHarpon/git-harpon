import { Component, OnInit, Input } from '@angular/core';
import { GitService } from '../../providers/git.service';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-file-diff-commit',
  templateUrl: './file-diff-commit.component.html',
  styleUrls: ['./file-diff-commit.component.scss']
})
export class FileDiffCommitComponent {
  @Input() listFiles: any[];
  @Input() componentType: any = 'stage';
  componentHovered: any;
  themePrefSubscription: Subscription;
  currentTheme: string;

  constructor(private gitService: GitService, private themePrefService: ThemePreferencesService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
  }

  getFileNameFromPath(path: string): string {
    const TabString = path.split('/');
    return  TabString[TabString.length - 1];
  }

  addFile(path: any) {
    if (this.componentType == 'unstage') {
      this.gitService.addFile(path);
      this.componentHovered = '';
    }
  }

  removeFile(path: any) {
    if (this.componentType == 'stage') {
      this.gitService.removeFile(path);
      this.componentHovered = '';
    }
  }

  mouseEnter(filePath: any) {
    if (this.componentType == 'unstage' || this.componentType == 'stage') {
      this.componentHovered = filePath;
    }
  }

  mouseLeave() {
    if (this.componentType == 'unstage' || this.componentType == 'stage') {
      this.componentHovered = '';
    }
  }
}
