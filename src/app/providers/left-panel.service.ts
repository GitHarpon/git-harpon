import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GitService } from './git.service';

@Injectable()
export class LeftPanelService {
    localBranches: any;
    localBranchesSubject: Subject<any>;
    remoteBranches: any;
    remoteBranchesSubject: Subject<any>;

    constructor(private gitService: GitService) {
        this.localBranchesSubject = new Subject<any>();
        this.remoteBranchesSubject = new Subject<any>();
    }

    setLocalBranches() {
        this.gitService.getLocalBranches().then((localBranches) => {
        this.localBranches = localBranches.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        this.localBranchesSubject.next(this.localBranches);
        });
    }

    setRemoteBranches() {
        this.gitService.getRemoteBranches().then((remoteBranches) => {
            this.remoteBranches = remoteBranches.reduce((r, str) => {
                const [key, value] = str.split('/');
                if (!r[key]) {
                    r[key] = [];
                }
                r[key].push(value);
                r[key] = r[key].sort(function (a, b) {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                });
                return r;
              }, {}
            );
    
            this.remoteBranchesSubject.next(this.remoteBranches);
        });

    }
}
