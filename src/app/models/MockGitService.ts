import * as gitPromise from 'simple-git/promise';
import * as simpleGit from 'simple-git';
import { Subject } from 'rxjs';
import { ElectronService } from '../providers/electron.service';
import * as  GitUrlParse from 'git-url-parse';
import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpsUser } from './HttpsUser';
import { CommitDescription } from './CommitInformations';
import { RightPanelService } from '../providers/right-panel.service';
import { LeftPanelService } from '../providers/left-panel.service';
import { DiffFileInformation } from './DiffFileInformation';

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
    branchName: any;

    constructor(private translate: TranslateService, private leftPanelService: LeftPanelService,
        private rightPanelService: RightPanelService) {
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

    async getUrl(remote: String) {
        return new Promise<any>((resolve, reject) => {
            if (remote == 'origin') {
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                this.translate.instant('SUCCESS'), 'https://github.com/toto/myrepository'));
            } else if (remote == 'originssh') {
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                this.translate.instant('SUCCESS'), 'ssh://github.com/toto/myrepository'));
            } else if (remote == 'origininvalidproto') {
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                this.translate.instant('SUCCESS'), 'toto://github.com/toto/myrepository'));
            } else if (remote == 'originnonewdata') {
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                this.translate.instant('SUCCESS')));
            } else {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('ERROR')));
            }
        });
    }

    async setNewBranch(newBranchName: string, referenceBranchName: string) {
        return new Promise<any>((resolve, reject) => {
            if (newBranchName === 'newBranch' && !referenceBranchName.includes('wrong')) {
                this.branchName = newBranchName;
                this.emitBranchNameSubject(this.branchName);
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                    this.translate.instant('BRANCH.CREATED')));
            } else if (referenceBranchName.includes('remote/')) {
                this.branchName = newBranchName;
                this.emitBranchNameSubject(this.branchName);
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                    this.translate.instant('BRANCH.CREATED')));
            } else if (newBranchName === 'existingBranch') {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('BRANCH.NOT_CREATED')));
            } else if (referenceBranchName.includes('wrong')) {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('BRANCH.NOT_CREATED')));
            } else {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('BRANCH.NOT_CREATED')));
            }
        });
    }

    async applyDeletionBranch(deleteBranchName: string, httpsUser: HttpsUser) {
        return new Promise<ServiceResult>((resolve, reject) => {
            if (deleteBranchName !== 'currentBranch') {
                if (deleteBranchName.includes('remote/')) {
                    if (httpsUser.username === 'username' && httpsUser.password === 'password') {
                        resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                            this.translate.instant('BRANCH.REMOTE_DELETED')));
                    } else {
                        reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant('BRANCH.REMOTE_NOT_DELETED')));
                    }
                } else if (deleteBranchName === 'deleteBranch') {
                    resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                            this.translate.instant('BRANCH.DELETED')));
                }
            } else {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('BRANCH.CURRENT')));
            }
        });
    }

    async getDiffFile(diffInformation: DiffFileInformation) {
        return new Promise<String>((resolve, reject) => {
            if (diffInformation.isCurrentCommit) {
                resolve('toto');
            } else {
                reject('toto');
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

    async pushHttps(folder: string, httpsUser: HttpsUser, branch: string) {
        return new Promise<ServiceResult>((resolve, reject) => {
            if (folder === 'path') {
                if (httpsUser.username === 'username' && httpsUser.password === 'password' && branch === 'master') {
                    resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                        this.translate.instant('PUSH.DONE')));
                } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('PUSH.ERROR')));
                }
            } else {
                if (httpsUser.username === 'username' && httpsUser.password === 'password') {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('PUSH.ERROR'), false));
                } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant('PUSH.ERROR'), true));
                    }
                }
            });
    }

    async revParseHEAD(): Promise<String> {
        return new Promise<String>((resolve, reject) => {
            // hash au hasard
            resolve('72267b6ad64858f2db2d597f67004b59e543928b');
        });
    }

    async commitDescription(hash: String) {
        return new Promise<CommitDescription>((resolve, reject) => {
            if (hash === '72267b6ad64858f2db2d597f67004b59e543928b') {
                resolve({
                    oid: 'd9159aa643063b627939dd434b4134371b1dcf0b',
                    message: 'Hello world',
                    tree: '0f154817e0dd2cc13bb8312082565ee9296fc293',
                    parent: [
                        'e35d4be0cb6bbe7e852d6e9160b3a023f1b537d3'
                    ],
                    author: {
                    name: 'toto',
                    email: 'toto@mail.com',
                    timestamp: 1552840891,
                    timezoneOffset: -60
                    },
                    committer: {
                    name: 'toto',
                    email: 'toto@mail.com',
                    timestamp: 1552840891,
                    timezoneOffset: -60
                    },
                    gpgsig: null,
                    files: [
                        {status: 'M', path: 'src/app/modified.txt'},
                        {status: 'A', path: 'src/app/added'},
                        {status: 'D', path: 'src/deleted.txt'}
                    ]
                });
            } else {
                reject();
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

    async pullrebaseHttps(httpsUser: HttpsUser, branch: string) {
        return new Promise<ServiceResult>((resolve, reject) => {
            if (httpsUser.username === 'username' && httpsUser.password === 'password') {
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                    this.translate.instant('PULL.DONE')));
            } else if (httpsUser.username === 'username' && httpsUser.password === 'newData') {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('PULL.ERROR'), 'newData'));
            } else {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('PULL.ERROR')));
            }
        });
    }

    commitChanges(summary: string, description: any) {
        var ListUnstagedFiles = [];
        var ListStagedFiles = [];
        this.rightPanelService.setListFileCommit(ListUnstagedFiles, ListStagedFiles);
    }

    async mergeBranches(mergeBranchName: string, fullPath: string) {
        return new Promise<ServiceResult>((resolve, reject) => {
            if (this.branchName !== mergeBranchName) {
                var ErrMsg = 'BRANCH.ERROR_MERGE';
                var AccessDenied = false;
                if (fullPath == 'goodPath') {
                    resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                        this.translate.instant('BRANCH.MERGE')));
                } else if (fullPath == 'conflictPath') {
                    ErrMsg = 'BRANCH.CONFLICTED';
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant(ErrMsg), AccessDenied));
                } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant('BRANCH.ERROR_MERGE')));
                }
            } else {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('BRANCH.MERGE_CURRENT')));
            }
        });
    }
}
