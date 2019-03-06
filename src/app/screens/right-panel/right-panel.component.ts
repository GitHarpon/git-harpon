import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RightPanelService } from '../../providers/right-panel.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit, OnDestroy {
  isViewSubscription: Subscription;
  isView: Boolean;

  constructor(private rightPanelService: RightPanelService) { }

  ngOnInit() {
    this.isViewSubscription = this.rightPanelService.isViewSubject.subscribe(
      (view: Boolean) => {
        this.isView = view;
      }
    );
    this.rightPanelService.emitIsViewSubject();
  }
  
  display() {
    console.log(this.listUnstagedFiles);
    console.log(this.listStagedFiles);
  }

  ngOnDestroy() {
    if (this.isViewSubscription) {
      this.isViewSubscription.unsubscribe();
    }
  }
}
