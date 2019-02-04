import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() classes: String = 'white';
  @Input() border: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
