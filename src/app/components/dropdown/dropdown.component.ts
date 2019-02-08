import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() disabled: Boolean = false;
  @Input() required: Boolean = false;

  currentValue: string;
  @Input() idKey: String;
  @Input() valueKey: String;

  @Output()
  valueChange = new EventEmitter<string>();
  @Input()
  options: Array<string>;
  @Input()
  get value() {
    return this.currentValue;
  }
  set value(val) {
    if ( !(val == '' && this.required)) {
      this.currentValue = val;
      this.valueChange.emit(val);
    }
  }

  constructor() { }

  getOptKey(option: any) {
    if (this.idKey) {
      return option[this.idKey.toString()];
    }
  }

  isSelected(opt) {
    var valeur = this.getOptKey(opt);
    if (valeur === this.currentValue) {
      return 'selected';
    }
    return '';
  }

  getOptValue(option: any) {
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
    this.currentValue = evt;
    this.valueChange.emit(this.currentValue);
  }

}
