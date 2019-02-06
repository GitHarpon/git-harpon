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

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.visible = false;
  }

}
