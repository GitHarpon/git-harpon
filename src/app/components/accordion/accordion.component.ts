import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() title: String;
  @Input() disabled: Boolean = false;
  @Input() icon: {
    name: String,
    isFab: Boolean
  };

  constructor() { }

  ngOnInit() {
  }

}
