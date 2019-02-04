import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  colorList: Array<String>;
  fsList: Array<String>;

  constructor() { }

  ngOnInit() {
    this.colorList = [
      'dark-blue',
      'light-blue',
      'dark-green',
      'light-green',
      'disabled-green',
      'dark-red',
      'light-red',
      'dark-grey',
      'light-grey',
      'blue-grey',
      'white',
      'muted-white',
      'dark'
    ];

    this.fsList = [
      'fs-xsmall',
      'fs-small',
      'fs-medium',
      'fs-large',
      'fs-xlarge'
    ];
  }


}
