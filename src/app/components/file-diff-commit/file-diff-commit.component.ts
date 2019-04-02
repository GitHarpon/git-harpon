import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GitService } from '../../providers/git.service';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';

@Component({
  selector: 'app-file-diff-commit',
  templateUrl: './file-diff-commit.component.html',
  styleUrls: ['./file-diff-commit.component.scss']
})
export class FileDiffCommitComponent implements OnDestroy {
  @Input() listFiles: any[];
  @Input() componentType: any = 'stage';
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

  limitFileName(path: string): string {
    const FileNameLimit = 34;
    if (path.length > FileNameLimit) {
      let ShortenedPath = '';
      ShortenedPath += path.substr(0, FileNameLimit / 2);
      ShortenedPath += '...';
      ShortenedPath += path.substr(path.length - FileNameLimit / 2, FileNameLimit / 2);
      return ShortenedPath;
    }
    return path;
  }

  addFile(path: any) {
    if (this.componentType == 'unstage') {
      this.gitService.addFile(path);
      return true;
    }
    return false;
  }

  removeFile(path: any) {
    if (this.componentType == 'stage') {
      this.gitService.removeFile(path);
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
  }
}
