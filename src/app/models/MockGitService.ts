import * as gitPromise from 'simple-git/promise';
import * as simpleGit from 'simple-git';
import { Subject } from 'rxjs';
import { ElectronService } from '../providers/electron.service';
import * as  GitUrlParse from 'git-url-parse';
import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpsUser } from './HttpsUser';
import { RightPanelService } from '../providers/right-panel.service';

@Injectable()
export class MockGitService {
    pathSubject: Subject<any>;
    repoNameSubject: Subject<any>;
    recentProjectSubject: Subject<any>;
    branchNameSubject: Subject<any>;
    httpsUserSubject: Subject<HttpsUser>;
    httpsUser: HttpsUser;
    listUnstagedFilesSubject: Subject<any[]>;
    listStagedFilesSubject: Subject<any[]>;

    constructor(private translate: TranslateService, private rightPanelService: RightPanelService) {
        this.pathSubject = new Subject<any>();
        this.repoNameSubject = new Subject<any>();
        this.recentProjectSubject = new Subject<any[]>();
        this.branchNameSubject = new Subject<any>();
        this.httpsUserSubject = new Subject<HttpsUser>();
        this.listUnstagedFilesSubject = new Subject<any[]>();
        this.listStagedFilesSubject = new Subject<any[]>();
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

    emitBranchNameSubject(branchName) {
        this.branchNameSubject.next(branchName);
    }

    emitHttpsUserSubject() {
        this.httpsUserSubject.next(this.httpsUser);
    }

    emitListUnstagedFilesSubject(listUnstagedFiles) {
        this.listUnstagedFilesSubject.next(listUnstagedFiles);
    }

    emitListStagedFilesSubject(listStagedFiles) {
        this.listStagedFilesSubject.next(listStagedFiles);
    }

    setHttpsUser(newUser: HttpsUser) {
        this.httpsUser = newUser;
        this.emitHttpsUserSubject();
    }

    getCurrentBranch() {
        const Current = 'current';
        return Current;
    }

    getLocalBranches() {
        return new Promise<any>((resolve, reject) => {
            resolve(['hello', 'world']);
        });
    }

    getRemoteBranches() {
        return new Promise<any>((resolve, reject) => {
            resolve(['hello', 'world']);
        });
    }

    checkoutLocalBranch(newBranch) {
        const ConflictedBranch = 'conflicted';
        return new Promise<ServiceResult>((resolve, reject) => {
            if (newBranch === ConflictedBranch) {
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                    this.translate.instant('BRANCH.CHECKED_OUT')));
            } else {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('BRANCH.ERROR')));
            }
        });
    }

    checkoutRemoteBranch(remoteBranch, currentBranch, isInLocal) {
        return new Promise<ServiceResult>((resolve, reject) => {
            if (!isInLocal) {
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
            this.translate.instant('BRANCH.CHECKED_OUT')));
            } else {
                let LocalBranch;
                if (remoteBranch.split('/')[1]) {
                    LocalBranch = remoteBranch.split('/')[1];
                }
                if (LocalBranch === 'toto') {
                    resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                        this.translate.instant('BRANCH.CHECKED_OUT')));
                } else if (LocalBranch === 'newdata') {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant('BRANCH.ERROR'), LocalBranch));
                } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant('BRANCH.ERROR')));
                }
            }
        });
    }

    createBranchHere(newBranch, remoteBranch) {
        return new Promise<ServiceResult>((resolve, reject) => {
            if (newBranch === 'new' && remoteBranch === 'origin/toto') {
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                    this.translate.instant('BRANCH.CHECKED_OUT')));
            } else {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('BRANCH.ERROR')));
            }
        });
    }

    resetLocalHere(remoteBranch) {
        return new Promise<ServiceResult>((resolve, reject) => {
            const LocalBranch = remoteBranch.split('/')[1];
            if (LocalBranch === 'toto') {
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                    this.translate.instant('BRANCH.CHECKED_OUT')));
            } else {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('BRANCH.ERROR')));
            }
        });
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

    async renameBranch(oldName: string, newName: string) {
        return new Promise<any>((resolve, reject) => {
            if ( oldName == 'valid' ) {
                resolve(new ServiceResult(true, this.translate.instant('BRANCH.BRANCH_RENAME_SUCCESS'),
                this.translate.instant('BRANCH.BRANCH_RENAME_SUCCESS')));
            } else {
                reject(new ServiceResult(true, this.translate.instant('BRANCH.BRANCH_RENAME_ERROR'),
                this.translate.instant('BRANCH.BRANCH_RENAME_ERROR')));
            }

        });
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

    updateFilesDiff() {
        var ListUnstagedFiles = [
            {
                path: 'src/file1',
                status: 'M'
            },
            {
                path: 'src/file2',
                status: 'D'
            }
        ];
        var ListStagedFiles = [
            {
                path: 'src/file3',
                status: 'A'
            },
            {
                path: 'src/file4',
                status: 'M'
            }
        ];
        this.rightPanelService.setListFileCommit(ListUnstagedFiles, ListStagedFiles);
    }

    addFile(path: any) {
        this.updateFilesDiff();
    }

    removeFile(path: any) {
        this.updateFilesDiff();
    }

    async pullrebaseHttps(folder: string, httpsUser: HttpsUser, branch: string) {
        return new Promise<ServiceResult>((resolve, reject) => {
            if (folder === 'path') {
                if (httpsUser.username === 'username' && httpsUser.password === 'password') {
                    resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                        this.translate.instant('PULL.DONE')));
                } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('PULL.ERROR')));
                }
            } else {
                if (httpsUser.username === 'username' && httpsUser.password === 'password') {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant('PULL.ERROR'), false));
                } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant('PULL.ERROR'), true));
                }
            }
        });
    }
}
