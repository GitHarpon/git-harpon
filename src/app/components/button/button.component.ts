import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() disabled: Boolean = false;
  @Input() value: String;
  @Input() submit: Boolean = false;
  @Input() large: Boolean = false;
  @Input() type: String = 'primary';
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  execClick(evt) {
    this.buttonClicked.emit(evt);
  }
}