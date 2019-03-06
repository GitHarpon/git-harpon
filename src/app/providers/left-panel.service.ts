import { Injectable } from '@angular/core';
import * as gitPromise from 'simple-git/promise';
import * as simpleGit from 'simple-git';
import { Subject } from 'rxjs';
import { ElectronService } from './electron.service';
import * as  GitUrlParse from 'git-url-parse';
import { ServiceResult } from '../models/ServiceResult';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-store';
import { HttpsUser } from '../models/HttpsUser';

@Injectable()
export class LeftPanelService {
    localBranches: any;
    localBranchesSubject: Subject<any>;

    constructor() {
        this.localBranchesSubject = new Subject<any>();
    }

    updateLocalBranches(updatedLocalBranches) {
        this.localBranches = updatedLocalBranches;
        this.localBranchesSubject.next(this.localBranches);
    }
}
