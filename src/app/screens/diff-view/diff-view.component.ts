import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';
import { RightPanelService } from '../../providers/right-panel.service';
import { DiffFileInformation } from '../../models/DiffFileInformation';
import { GitService } from '../../providers/git.service';
import { Diff2Html } from 'diff2html';

@Component({
  selector: 'app-diff-view',
  templateUrl: './diff-view.component.html',
  styleUrls: ['./diff-view.component.scss']
})
export class DiffViewComponent implements OnInit, OnDestroy {
  themePrefSubscription: Subscription;
  diffFileInformationSubscription: Subscription;
  diffFileInformation: DiffFileInformation;
  currentTheme: string;
  diffViewModel: any;
  loading = true;
  _currentView: string;

  get currentView(): string {
    return this._currentView;
  }

  set currentView(view: string) {
    this._currentView = view;
    this.setDiffViewModel();
  }

  constructor(private themePrefService: ThemePreferencesService, private rightPanelService: RightPanelService,
    private gitService: GitService) { }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.diffFileInformationSubscription = this.rightPanelService.diffFileInformationSubject.subscribe(
      (newObj: DiffFileInformation) => {
        this.diffFileInformation = newObj;
        this.setDiffViewModel();
      }
    );
    this.rightPanelService.emitDiffFileInformationSubject();
    this.currentView = 'INLINE_VIEW';
  }

  async setDiffViewModel() {
    this.loading = true;
    return this.gitService.getDiffFile(this.diffFileInformation)
      .then((data) => {
        const OutputHtml = Diff2Html.getPrettyHtml(data, {
          inputFormat: 'diff',
          showFiles: true,
          matching: 'lines',
          outputFormat: this.currentView === 'INLINE_VIEW' ? '' : 'side-by-side'
        });
        this.diffViewModel = OutputHtml;
        this.loading = false;
      })
      .catch((err) => console.log(err));
  }

  closeDiffView() {
    this.rightPanelService.setDiffViewVisible(false);
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
  }

}
