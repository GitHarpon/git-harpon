import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { GitService } from '../../providers/git.service';
import { CommitDescription } from '../../models/CommitInformations';
import { ClipboardService } from 'ngx-clipboard';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-commit',
  templateUrl: './view-commit.component.html',
  styleUrls: ['./view-commit.component.scss']
})
export class ViewCommitComponent implements OnInit, OnDestroy {
  themePrefSubscription: Subscription;
  currentTheme: string;
  commitHashSubscription: Subscription;
  commitHash: String;
  currentDescription: CommitDescription;
  hashCopied: Boolean;
  parentHashCopied: Boolean;
  commitDate: string;
  loading: Boolean;
  currentTab: string;
  tree: Array<any>;
  listUnstagedFiles: any[];
  listUnstagedFilesSubscription: Subscription;
  listStagedFiles: any[];
  listStagedFilesSubscription: Subscription;

  constructor(private themePrefService: ThemePreferencesService, private rightPanelService: RightPanelService,
    private gitService: GitService, private clipboardService: ClipboardService, private toastr: ToastrService,
    private translateService: TranslateService) {
  }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.commitHashSubscription = this.rightPanelService.commitHashSubject.subscribe(
      (hash: String) => {
        this.commitHash = hash;
        this.setDescription();
      }
    );
    this.rightPanelService.emitCommitHashSubject();

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

    this.currentTab = 'PATH';
  }

  async setDescription() {
    if (this.commitHash) {
      this.loading = true;
      return this.gitService.commitDescription(this.commitHash).then((data) => {
        this.currentDescription = data;
        this.setTree();
        this.setCommitDate();
        this.loading = false;
      }).catch(() => {
        this.toastr.error(this.translateService.instant('ERROR'),
          this.translateService.instant('NO_COMMIT_FOUND'));
        this.loading = false;
      });
    }
    return;
  }

  getCommitSummary() {
    if (this.currentDescription) {
      return this.currentDescription.message.split('\n\n')[0];
    }
    return null;
  }

  countAddedFiles() {
    if (this.currentDescription) {
      return this.currentDescription.files.filter(o => o.status === 'A').length;
    }

    return 0;
  }

  countModifiedFiles() {
    if (this.currentDescription) {
      return this.currentDescription.files.filter(o => o.status === 'M').length;
    }

    return 0;
  }

  countDeletedFiles() {
    if (this.currentDescription) {
      return this.currentDescription.files.filter(o => o.status === 'D').length;
    }

    return 0;
  }

  getCommitDescription() {
    if (this.currentDescription) {
      const Result = this.currentDescription.message.split('\n\n')[1];
      return Result ? Result : '';
    }
    return null;
  }

  setCommitDate() {
    const CommitDate = new Date(this.currentDescription.committer.timestamp * 1000);
    this.commitDate =  moment(CommitDate).format('DD/MM/YYYY @ HH:mm').toString();
  }

  async copyCommitHash() {
    this.clipboardService.copyFromContent(this.currentDescription.oid);
    return this.switchCopyCommitHash();
  }

  async copyParentHash(parentHash) {
    this.clipboardService.copyFromContent(parentHash);
    return this.switchCopyParentHash();
  }

  async switchCopyCommitHash() {
    this.hashCopied = true;
    return setTimeout(time => {
      this.hashCopied = false;
    }, 500);
  }

  async switchCopyParentHash() {
    this.parentHashCopied = true;
    return setTimeout(time => {
      this.parentHashCopied = false;
    }, 500);
  }

  setTree() {
    if (this.currentDescription.files) {
      const Tree = [];

      this.currentDescription.files.forEach(({ status, path }) => {
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

      this.tree = Tree;
    }
  }

  viewChanges() {
    this.rightPanelService.setView(false);
    return true;
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
    if (this.commitHashSubscription) {
      this.commitHashSubscription.unsubscribe();
    }
    if (this.listUnstagedFilesSubscription) {
      this.listUnstagedFilesSubscription.unsubscribe();
    }
    if (this.listStagedFilesSubscription) {
      this.listStagedFilesSubscription.unsubscribe();
    }
  }
}
