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
  @Output() emitter: EventEmitter<Event>;

  constructor() {
  }

  ngOnInit() {
    this.emitter = new EventEmitter<Event>();
  }

  execClick(evt) {
    this.emitter.emit(evt);
  }
}
