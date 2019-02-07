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
  @Input() options: Array<String>;
  @Input() value: String;
  @Output() dropdownChanged: EventEmitter<any> = new EventEmitter<any>();
  // ng model pour two way binding

  constructor() { }

  ngOnInit() {
    if (this.required) {
      this.value = this.options[0];
    }
  }

  triggerChange(evt) {
    this.value = evt.target.value;
    this.dropdownChanged.emit(evt);
  }

}
