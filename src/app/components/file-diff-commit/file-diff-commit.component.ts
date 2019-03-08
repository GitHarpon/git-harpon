import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-diff-commit',
  templateUrl: './file-diff-commit.component.html',
  styleUrls: ['./file-diff-commit.component.scss']
})
export class FileDiffCommitComponent implements OnInit {
  @Input() listFiles: any[];
  @Input() componentType: string;
  componentHovered: any;

  constructor() { }

  ngOnInit() {
  }

  getFileNameFromPath(path: string): string {
    const TabString = path.split('/');
    return  TabString[TabString.length - 1];
  }

  addFile(truc: any) {
    console.log(this.componentType);
    if (this.componentType == 'unstage') {
      console.log(truc);
    } else if (this.componentType == 'unstage') {

    }
  }

  mouseEnter(filePath: any) {
    this.componentHovered = filePath;
  }

  mouseLeave() {
    this.componentHovered = '';
  }
}
