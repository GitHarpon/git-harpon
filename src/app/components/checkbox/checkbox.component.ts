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

  @Input() name: String;
  @Input() disabled: Boolean = false;
  @Output() valueChange = new EventEmitter<Boolean>();
  currentValue: Boolean;
  @Input()
  get value() {
    return this.currentValue;
  }

  set value(val) {
    this.currentValue = val;
    this.valueChange.emit(this.currentValue);
  }

  constructor(private electronService: ElectronService,
    private toastr: ToastrService, private translateService: TranslateService) { }

  ngOnInit() {
  }
}
