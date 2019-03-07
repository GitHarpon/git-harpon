import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MockLeftPanelService {
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
