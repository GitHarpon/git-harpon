import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { GitService } from '../../providers/git.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit, OnDestroy {
  themePrefSubscription: Subscription;
  currentTheme: string;
  listUnstagedFiles: any[];
  listUnstagedFilesSubscription: Subscription;
  listStagedFiles: any[];
  listStagedFilesSubscription: Subscription;

  constructor(private themePrefService: ThemePreferencesService, private gitService: GitService) { }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.listUnstagedFilesSubscription = this.gitService.listUnstagedFilesSubject.subscribe(
      (listUnstagedFiles: any) => {
        this.listUnstagedFiles = listUnstagedFiles;
      });
    this.gitService.emitListUnstagedFilesSubject();

    this.listStagedFilesSubscription = this.gitService.listStagedFilesSubject.subscribe(
      (listStagedFiles: any) => {
        this.listStagedFiles = listStagedFiles;
      });
    this.gitService.emitListStagedFilesSubject();
  }
  
  display() {
    console.log(this.listUnstagedFiles);
    console.log(this.listStagedFiles);
  }

  ngOnDestroy() {
    this.themePrefSubscription.unsubscribe();
  }
}
