import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { GitService } from '../../providers/git.service';
import { RightPanelService } from '../../providers/right-panel.service';

@Component({
  selector: 'app-send-commit',
  templateUrl: './send-commit.component.html',
  styleUrls: ['./send-commit.component.scss']
})
export class SendCommitComponent implements OnInit, OnDestroy {
  themePrefSubscription: Subscription;
  currentTheme: string;
  listUnstagedFiles: any[];
  listUnstagedFilesSubscription: Subscription;
  listStagedFiles: any[];
  listStagedFilesSubscription: Subscription;

  constructor(private themePrefService: ThemePreferencesService, private gitService: GitService,
    private rightPanelService: RightPanelService) {  }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.listUnstagedFilesSubscription = this.rightPanelService.listUnstagedFilesSubject.subscribe(
      (listUnstagedFiles: any) => {
        this.listUnstagedFiles = listUnstagedFiles;
      });
    this.rightPanelService.emitListUnstagedFilesSubject();

    this.listStagedFilesSubscription = this.rightPanelService.listStagedFilesSubject.subscribe(
      (listStagedFiles: any) => {
        this.listStagedFiles = listStagedFiles;
      });
    this.rightPanelService.emitListStagedFilesSubject();
  }

  addAllFile() {
    this.gitService.addFile('.');
  }

  removeAllFile() {
    this.gitService.removeFile('.');
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
    if (this.listUnstagedFilesSubscription) {
      this.listUnstagedFilesSubscription.unsubscribe();
    }
    if (this.listStagedFilesSubscription) {
      this.listStagedFilesSubscription.unsubscribe();
    }
  }
}
