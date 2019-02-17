import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input() value: String;
  @Input() tooltipValue: String;
  @Input() placement: String;
  @Input() disabled: Boolean = false;
  @Input() icon: {
    name: String,
    isFab: Boolean
  };
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();


  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  execClick(evt) {
    if (!this.disabled) {
      this.buttonClicked.emit(evt);
    }
  }

  getValueTranslation() {
    return this.translateService.instant(this.value.toUpperCase().toString());
  }

  getTooltipTranslation() {
    return this.translateService.instant(this.tooltipValue.toUpperCase().toString());
  }
}
