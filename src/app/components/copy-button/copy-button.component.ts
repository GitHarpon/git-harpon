import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss']
})
export class CopyButtonComponent implements OnInit {

  @Input() inputValue: string;
  @Input() value: string;

  copy(text: string) {
    this._clipboardService.copyFromContent(text);
  }

  constructor(private _clipboardService: ClipboardService) {}


  ngOnInit() {
  }

}
