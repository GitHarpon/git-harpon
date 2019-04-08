import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GitService } from '../../providers/git.service';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { Subscription } from 'rxjs';
import { DiffFileInformation } from '../../models/DiffFileInformation';
import { RightPanelService } from '../../providers/right-panel.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnDestroy {

  @Input() tree: any;
  @Input() componentType: any = 'stage';
  @Input() diffFileInformation: DiffFileInformation;
  currentTheme: string;
  themePrefSubscription: Subscription;

  constructor(private themePrefService: ThemePreferencesService, private gitService: GitService,
    private rightPanelService: RightPanelService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
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

  isFolder(item) {
    return item.children && item.children.length;
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
