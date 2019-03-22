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
  currentTab: string;
  unstageTree: Array<any>;
  stageTree: Array<any>;

  constructor(private themePrefService: ThemePreferencesService, private gitService: GitService,
    private rightPanelService: RightPanelService) { }

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
        this.setUnstageTree(listUnstagedFiles);
      });
    this.rightPanelService.emitListUnstagedFilesSubject();

    this.listStagedFilesSubscription = this.rightPanelService.listStagedFilesSubject.subscribe(
      (listStagedFiles: any) => {
        this.listStagedFiles = listStagedFiles;
        this.setStageTree(listStagedFiles);
      });
    this.rightPanelService.emitListStagedFilesSubject();

    this.currentTab = 'PATH';
  }

  addAllFile() {
    this.gitService.addFile('.');
  }

  removeAllFile() {
    this.gitService.removeFile('.');
  }

  setUnstageTree(obj) {
    if (obj) {
      const Tree = [];

      obj.forEach(({ status, path }) => {
        const Dirs = path.split('/');
        const File = Dirs.pop();

        Dirs.reduce((level, folder) => {
          let Object = level.find(o => o.folder === folder);
          if (!Object) {
            level.push(Object = { folder, children: [] });
          }
          return Object.children;
        }, Tree)
          .push({ file: File, status });
      });

      this.unstageTree = Tree;
    }
  }

  setStageTree(obj) {
    if (obj) {
      const Tree = [];

      obj.forEach(({ status, path }) => {
        const Dirs = path.split('/');
        const File = Dirs.pop();

        Dirs.reduce((level, folder) => {
          let Object = level.find(o => o.folder === folder);
          if (!Object) {
            level.push(Object = { folder, children: [] });
          }
          return Object.children;
        }, Tree)
          .push({ file: File, status });
      });

      this.stageTree = Tree;
    }
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
