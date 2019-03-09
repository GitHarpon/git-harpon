import { Component, OnInit, Input } from '@angular/core';
import { GitService } from '../../providers/git.service';

@Component({
  selector: 'app-file-diff-commit',
  templateUrl: './file-diff-commit.component.html',
  styleUrls: ['./file-diff-commit.component.scss']
})
export class FileDiffCommitComponent implements OnInit {
  @Input() listFiles: any[];
  @Input() componentType: string;
  componentHovered: any;

  constructor(private gitService: GitService) { }

  ngOnInit() {
  }

  getFileNameFromPath(path: string): string {
    const TabString = path.split('/');
    return  TabString[TabString.length - 1];
  }

  addFile(path: any) {
    if (this.componentType == 'unstage') {
      this.gitService.addFile(path);
      this.componentHovered = '';
    }
  }

  removeFile(path: any) {
    if (this.componentType == 'stage') {
      this.gitService.removeFile(path);
      this.componentHovered = '';
    }
  }

  mouseEnter(filePath: any) {
    if (this.componentType == 'unstage' || this.componentType == 'stage') {
      this.componentHovered = filePath;
    }
  }

  mouseLeave() {
    if (this.componentType == 'unstage' || this.componentType == 'stage') {
      this.componentHovered = '';
    }
  }
}
