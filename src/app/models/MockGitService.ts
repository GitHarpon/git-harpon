import * as gitPromise from 'simple-git/promise';
import * as simpleGit from 'simple-git';
import { Subject } from 'rxjs';
import { ElectronService } from '../providers/electron.service';
import * as  GitUrlParse from 'git-url-parse';
import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';

@Injectable()
export class MockGitService {
    pathSubject: Subject<any>;
    repoNameSubject: Subject<any>;
    recentProjectSubject: Subject<any>;

    constructor() {
        this.pathSubject = new Subject<any>();
        this.repoNameSubject = new Subject<any>();
        this.recentProjectSubject = new Subject<any[]>();
    }

    emitPathSubject() {
        this.pathSubject.next('toto');
    }

    emitRecentProjectSubject() {
        this.recentProjectSubject.next(['toto']);
    }

    emitRepoNameSubject() {
        this.repoNameSubject.next('toto');
    }
}
