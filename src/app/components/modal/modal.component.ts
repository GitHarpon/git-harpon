import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() visible: Boolean = false;
  @Input() large: Boolean;
  @Input() medium: Boolean;
  @Input() title: String;

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.visible = false;
  }

}
