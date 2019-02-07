import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() disabled: Boolean = false;
  @Input() required: Boolean = false;
  @Input() value: String;
  @Input() idKey: String;
  @Input() valueKey: String;

  @Output()
  optionsChanged = new EventEmitter<Array<string>>();

  @Input()
  options: Array<string>;

  get getOptions() {
    return this.options;
  }
  set setOptions(val) {
    this.options = val;
    this.optionsChanged.emit(this.options);
  }

  constructor() { }

  getKey(option: any) {
    if (this.idKey) {
      return option[this.idKey.toString()];
    }
  }

  getValue(option: any) {
    if (this.valueKey) {
      return option[this.valueKey.toString()];
    }
  }

  ngOnInit() {
    if (this.required) {
      this.options[this.valueKey.toString()];
    }
  }

  triggerChange(evt) {
    this.value = evt.target.value;
    this.optionsChanged.emit(evt);
  }

}
