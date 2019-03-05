import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RightPanelService {
    isView: Boolean;
    isViewSubject = new Subject<Boolean>();

    constructor() {
        this.isViewSubject = new Subject<Boolean>();
        this.isView = true;
        this.emitIsViewSubject();
    }

    emitIsViewSubject() {
        this.isViewSubject.next(this.isView);
    }

    setView(view: boolean) {
        this.isView = view;
        this.emitIsViewSubject();
    }
}
