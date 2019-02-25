import * as gitPromise from 'simple-git/promise';
import * as simpleGit from 'simple-git';
import { Subject } from 'rxjs';
import { ElectronService } from '../providers/electron.service';
import * as  GitUrlParse from 'git-url-parse';
import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MockGitService {
    pathSubject: Subject<any>;
    repoNameSubject: Subject<any>;
    recentProjectSubject: Subject<any>;

    constructor(private translate: TranslateService) {
        this.pathSubject = new Subject<any>();
        this.repoNameSubject = new Subject<any>();
        this.recentProjectSubject = new Subject<any[]>();
    }

    emitPathSubject(path) {
        this.pathSubject.next(path);
    }

    emitRecentProjectSubject(newProject) {
        this.recentProjectSubject.next(newProject);
    }

    emitRepoNameSubject(repo) {
        this.repoNameSubject.next(repo);
    }

    async setPath(newPath) {
        return new Promise<ServiceResult>((resolve, reject) => {
            if (newPath === '/new') {
                this.emitPathSubject(newPath);
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                    this.translate.instant('OPEN.OPENED_REPO')));
            } else {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('OPEN.NOT_GIT_REPO')));
            }
        });
    }

    init(initLocation: string, initName: string) {
        if (initLocation && initName) {
            return new Promise<ServiceResult>((resolve, reject) => {
                if (initLocation === '/new' && initName === '/repo') {
                    this.setPath('/new/repo');
                    resolve(new ServiceResult(true, 'SUCCESS', 'INIT.SUCCESS'));
                } else {
                    reject(new ServiceResult(false, 'ERROR', 'PATH_NOT_FOUND'));
                }
            });
        }
    }
}
