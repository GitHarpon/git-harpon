import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { GitService } from '../../providers/git.service';
import { CommitDescription } from '../../models/CommitInformations';
import { ClipboardService } from 'ngx-clipboard';

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
        console.log('toto');
        if (this.commitHash && this.commitHash !== '') {
          console.log('tata');
          this.setDescription();
        }
      }
    );
    this.rightPanelService.emitCommitHashSubject();

    this.gitService.revParseHEAD().then((data) => {
      this.commitHash = data.replace('\n', '');
      this.setDescription();
    });
    // gérer cas dans open ou pas de commit
  }

  async setDescription() {
    return this.gitService.commitDescription(this.commitHash).then((data) => {
      this.currentDescription = data;
    });
  }

  async copyCommitHash() {
    this.clipboardService.copyFromContent(this.currentDescription.oid);
    return this.switchCopyCommitHash();
  }

  async switchCopyCommitHash() {
    this.hashCopied = true;
    return setTimeout(time => {
      this.hashCopied = false;
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
