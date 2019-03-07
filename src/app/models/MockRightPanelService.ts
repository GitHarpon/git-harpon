import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MockRightPanelService {
    isView: Boolean;
    isViewSubject = new Subject<Boolean>();
    commitHash: String;
    commitHashSubject: Subject<String>;

    constructor() {
        this.isViewSubject = new Subject<Boolean>();
        this.commitHashSubject = new Subject<String>();
        this.isView = true;
        this.emitIsViewSubject();
    }

    emitIsViewSubject() {
        this.isViewSubject.next(this.isView);
    }

    emitCommitHashSubject() {
        this.commitHashSubject.next(this.commitHash);
    }

    setView(view: boolean) {
        this.isView = view;
        this.emitIsViewSubject();
    }

    setCommitHash(hash: String) {
        this.commitHash = hash;
        this.emitCommitHashSubject();
    }
}
