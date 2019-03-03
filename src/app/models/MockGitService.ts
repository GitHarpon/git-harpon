import * as gitPromise from 'simple-git/promise';
import * as simpleGit from 'simple-git';
import { Subject } from 'rxjs';
import { ElectronService } from '../providers/electron.service';
import * as  GitUrlParse from 'git-url-parse';
import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpsUser } from './HttpsUser';

@Injectable()
export class MockGitService {
    pathSubject: Subject<any>;
    repoNameSubject: Subject<any>;
    recentProjectSubject: Subject<any>;
    httpsUserSubject: Subject<HttpsUser>;
    httpsUser: HttpsUser;

    constructor(private translate: TranslateService) {
        this.pathSubject = new Subject<any>();
        this.repoNameSubject = new Subject<any>();
        this.recentProjectSubject = new Subject<any[]>();
        this.httpsUserSubject = new Subject<HttpsUser>();
        this.setHttpsUser({ username: null, password: null});
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

    emitHttpsUserSubject() {
        this.httpsUserSubject.next(this.httpsUser);
    }

    setHttpsUser(newUser: HttpsUser) {
        this.httpsUser = newUser;
        this.emitHttpsUserSubject();
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
                    this.setPath(initLocation);
                    resolve(new ServiceResult(true, 'SUCCESS', 'INIT.SUCCESS'));
                } else {
                    reject(new ServiceResult(false, 'ERROR', 'PATH_NOT_FOUND'));
                }
            });
        }
    }

    async cloneHttps(url: GitUrlParse, folder: string, httpsUser: HttpsUser) {
        return new Promise<ServiceResult>((resolve, reject) => {
            if (url && folder === 'path') {
                if (httpsUser.username === 'username' && httpsUser.password === 'password') {
                    const REPOPATH = '/path';
                    resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                        this.translate.instant('CLONE.DONE'), REPOPATH));
                } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('CLONE.ERROR')));
                }
            } else {
                if (httpsUser.username === 'username' && httpsUser.password === 'password') {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant('CLONE.ERROR'), false));
                } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant('CLONE.ERROR'), true));
                }
            }
        });
    }
}
