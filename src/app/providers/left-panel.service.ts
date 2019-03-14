import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class LeftPanelService {
    localBranches: any;
    localBranchesSubject: Subject<any>;

    constructor() {
        this.localBranchesSubject = new Subject<any>();
    }

    setLocalBranches(localBranches) {
        this.localBranches = localBranches;
        this.localBranchesSubject.next(this.localBranches);
    }
}
