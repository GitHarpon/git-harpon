import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ElectronService } from '../../providers/electron.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  // @Input() value: String;
  @Input() result: Boolean;
  // @Input() checkBox: String;
  @Input() checked: Boolean = false;
  @Input() disabled: Boolean = false;
  currentValue: Boolean;
  @Output() checkedBox = new EventEmitter<any>();

  constructor(private electronService: ElectronService,
    private toastr: ToastrService, private translateService: TranslateService) { }

  ngOnInit() {
  }

  @Input()
  get current() {
    return this.currentValue;
  }

  set current(val) {
    this.currentValue = !val;
    this.checkedBox.emit(this.currentValue);
}

  // triggerValue(val) {
  //   this.result = val.target.checked;
  // }
  // triggerValue(value) {
  //   this.checkedBox.emit(value);
  // }

  // getValueTranslation() {
  //   return this.translateService.instant(this.value.toUpperCase().toString());
  // }

}
