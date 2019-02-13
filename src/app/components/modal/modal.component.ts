import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() large: Boolean;
  @Input() medium: Boolean;
  @Input() fullscreen: Boolean;
  @Input() title: String;
  currentVisible: Boolean;

  @Output()
  visibleChange = new EventEmitter<Boolean>();

  @Input()
  get visible() {
    return this.currentVisible;
  }

  set visible(visible) {
    this.currentVisible = visible;
    this.visibleChange.emit(this.currentVisible);
  }

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.visible = false;
  }

}
