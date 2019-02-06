import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() value: String;
  @Input() result: Boolean;
  @Input() checkBox: String;
  @Input() checked: Boolean;
  @Input() disabled: Boolean = false;
  // @Output() checkedBox: EventEmitter<any> = new EventEmitter<any>();

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  triggerValue(val) {
    this.value = val.target.checked;
  }

  getValueTranslation() {
    return this.translateService.instant(this.value.toUpperCase().toString());
  }

}
