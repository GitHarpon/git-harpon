import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MockLeftPanelService {
    localBranches: any;
    localBranchesSubject: Subject<any>;
    remoteBranches: any;
    remoteBranchesSubject: Subject<any>;
    loadingVisibleSubject: Subject<any>;

    constructor() {
        this.localBranchesSubject = new Subject<any>();
        this.remoteBranchesSubject = new Subject<any>();
        this.loadingVisibleSubject = new Subject<any>();
    }

    setLocalBranches() {
        this.localBranchesSubject.next(this.localBranches);
    }

    setRemoteBranches() {
        this.remoteBranchesSubject.next(this.remoteBranches);
    }

    setLoadingVisible(loadingVisible) {
        this.loadingVisibleSubject.next(loadingVisible);
    }
}
