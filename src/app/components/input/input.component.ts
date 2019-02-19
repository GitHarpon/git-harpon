import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() name: String;
  @Input() placeholder: String;
  @Input() readonly: Boolean;
  @Input() disabled: Boolean;
  @Input() type: String = 'text';
  currentValue: String;

  @Output()
  valueChange = new EventEmitter<String>();

  @Input()
  get value() {
    return this.currentValue;
  }

  set value(val) {
    this.currentValue = val;
    this.valueChange.emit(this.currentValue);
  }

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  getPlaceholderTranslation() {
    return this.translateService.instant(this.placeholder.toUpperCase().toString());
  }
}
