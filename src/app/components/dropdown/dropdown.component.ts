import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() disabled: Boolean = false;
  @Input() required: Boolean = false;
  @Input() large: Boolean = false;
  @Input() options: Array<any>;
  @Input() value: String;
  @Output() dropdownChanged: EventEmitter<any> = new EventEmitter<any>();
  // ng model pour two way binding
  // regarder disabled fonctionnement

  constructor() { }

  ngOnInit() {
  }

  triggerChange(value) {
    this.dropdownChanged.emit(value);
  }

}
