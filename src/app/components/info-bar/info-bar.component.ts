import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {
  @Input() visible: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
