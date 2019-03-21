import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { GitService } from '../../providers/git.service';
import { CommitDescription } from '../../models/CommitInformations';
import { ClipboardService } from 'ngx-clipboard';
import * as moment from 'moment';

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

  constructor(private themePrefService: ThemePreferencesService, private rightPanelService: RightPanelService,
    private gitService: GitService, private clipboardService: ClipboardService) {
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

    this.currentTab = 'PATH';
  }

  async setDescription() {
    if (this.commitHash) {
      this.loading = true;
      return this.gitService.commitDescription(this.commitHash).then((data) => {
        this.currentDescription = data;
        this.setCommitDate();
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

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
    if (this.commitHashSubscription) {
      this.commitHashSubscription.unsubscribe();
    }
  }
}
