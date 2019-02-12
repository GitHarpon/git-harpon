import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss']
})
export class CopyButtonComponent implements OnInit {

  @Input() template: string;
  copy: Boolean;


  constructor(private clipboardService: ClipboardService) {}


  ngOnInit() {
  }

  copyToClipboard() {
    this.clipboardService.copyFromContent(this.template);
    this.switchCopy();
  }

  switchCopy() {
    this.copy = true;
    setTimeout(time => {
      this.copy = false;
    }, 500);
  }

}
