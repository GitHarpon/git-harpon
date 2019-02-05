import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() disabled: Boolean = false;
  @Input() options: Array<any>;
  @Input() value: String;
  @Input() large: Boolean = false;
  @Output() dropdownChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  triggerChange(value) {
    console.log(value);
    this.dropdownChanged.emit(value);
  }

}
