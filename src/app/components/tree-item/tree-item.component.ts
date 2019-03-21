import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GitService } from '../../providers/git.service';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent implements OnDestroy {
  @Input() item: any;
  @Input() depth: number;
  @Input() currentPath: String = '';
  @Input() componentType: any = 'stage';
  isOpen: boolean;
  currentTheme: string;
  themePrefSubscription: Subscription;


  constructor(private themePrefService: ThemePreferencesService, private electronService: ElectronService,
    private gitService: GitService) {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();
    this.isOpen = false;
  }

  isFolder() {
    return this.item.children && this.item.children.length;
  }

  toggle() {
    if (this.isFolder()) {
      this.isOpen = !this.isOpen;
    }
  }

  addFile(path: any) {
    if (this.componentType == 'unstage') {
      this.gitService.addFile(path);
    }
  }

  removeFile(path: any) {
    if (this.componentType == 'stage') {
      this.gitService.removeFile(path);
    }
  }

  computeCurrentPath() {
    const FileName = this.isFolder() ? this.item.folder : this.item.file;
    return this.electronService.path.join(this.currentPath.toString(), FileName );
  }

  getDepth() {
    const Depth = this.depth + 0.5;
    return { 'padding-left': Depth + 'em'};
  }

  getFolderDepth() {
    const Depth = this.depth === 0 ? 0 : this.depth + 0.5;
    return { 'padding-left': Depth + 'em'};
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
  }

}
