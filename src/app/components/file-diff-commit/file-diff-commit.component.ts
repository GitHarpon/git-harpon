import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GitService } from '../../providers/git.service';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { DiffFileInformation } from '../../models/DiffFileInformation';

@Component({
  selector: 'app-file-diff-commit',
  templateUrl: './file-diff-commit.component.html',
  styleUrls: ['./file-diff-commit.component.scss']
})
export class FileDiffCommitComponent implements OnDestroy {
  @Input() listFiles: any[];
  @Input() componentType: any = 'stage';
  @Input() diffFileInformation: DiffFileInformation;

  themePrefSubscription: Subscription;
  currentTheme: string;

  constructor(private gitService: GitService, private themePrefService: ThemePreferencesService,
    private rightPanelService: RightPanelService) {
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

  openDiffView(path) {
    this.diffFileInformation.file = path;
    this.rightPanelService.setDiffViewVisible(true);
    this.rightPanelService.setDiffFileInformationSubject(this.diffFileInformation);
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
  }
}
