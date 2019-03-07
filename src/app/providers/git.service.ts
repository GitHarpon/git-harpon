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
export class GitService {
  @LocalStorage({ key: 'recentProject' }) recentProject = [];
  recentProjectSubject: Subject<any[]>;
  httpsUserSubject: Subject<HttpsUser>;
  httpsUser: HttpsUser;
  path: any;
  pathSubject: Subject<any>;
  repoName: any;
  repoNameSubject: Subject<any>;
  branchName: any;
  branchNameSubject: Subject<any>;
  gitP: any;
  git: any;

  constructor(private electronService: ElectronService, private translate: TranslateService) {
    this.gitP = gitPromise();
    this.git = simpleGit();
    this.pathSubject = new Subject<any>();
    this.repoNameSubject = new Subject<any>();
    this.recentProjectSubject = new Subject<any[]>();
    this.branchNameSubject = new Subject<any>();
    this.httpsUserSubject = new Subject<HttpsUser>();
    this.setHttpsUser({ username: null, password: null});
    if (this.recentProject[0]) {
      if (this.recentProject[0].path) {
        this.setPath(this.recentProject[0].path);
      } else {
        this.path = this.electronService.process.cwd();
      }
    } else {
      this.path = this.electronService.process.cwd();
    }
  }

  emitPathSubject() {
    this.pathSubject.next(this.path);
  }

  emitRepoNameSubject() {
    this.repoNameSubject.next(this.repoName);
  }

  emitRecentProjectSubject() {
    this.recentProjectSubject.next(this.recentProject.slice());
  }

  emitBranchNameSubject() {
    this.branchNameSubject.next(this.branchName);
  }

  emitHttpsUserSubject() {
    this.httpsUserSubject.next(this.httpsUser);
  }

  setHttpsUser(newUser: HttpsUser) {
    this.httpsUser = newUser;
    this.emitHttpsUserSubject();
  }

  init(initLocation: string, initName: string) {
    if (initLocation && initName) {
      const PathToRepo = this.electronService.path.join(initLocation, initName);
      return new Promise<ServiceResult>((resolve, reject) => {
        if (this.electronService.fs.existsSync(initLocation)) {
          if (!this.electronService.fs.existsSync(PathToRepo)) {
            this.electronService.fs.mkdirSync(PathToRepo);
          }
          gitPromise(PathToRepo).init()
            .then(() => {
              this.setPath(PathToRepo);
              resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
              this.translate.instant('INIT.SUCCESS')));
            })
            .catch(() => {
              reject(new ServiceResult(false, this.translate.instant('ERROR'),
              this.translate.instant('INIT.FAILED')));
            });
        } else {
          reject(new ServiceResult(false, this.translate.instant('ERROR'),
          this.translate.instant('PATH_NOT_FOUND')));
        }
      });
    }
  }

  async setPath(newPath) {
    return new Promise<ServiceResult>((resolve, reject) => {
      if (this.electronService.fs.existsSync(newPath)) {
        gitPromise(newPath).checkIsRepo()
          .then(isRepo => {
            if (isRepo) {
              this.path = newPath;
              this.repoName = this.electronService.path.basename(this.path);
              this.emitRepoNameSubject();
              this.electronService.process.chdir(this.path);
              this.git.cwd(this.path);
              this.gitP.cwd(this.path);
              this.emitPathSubject();
              this.registerProject(this.repoName, this.path);

              gitPromise(this.path).branch([])
                .then((result) => {
                  if (result.current) {
                    this.branchName = result.current;
                    this.emitBranchNameSubject();
                  }
                });

              resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                this.translate.instant('OPEN.OPENED_REPO')));

            } else {
              reject(new ServiceResult(false, this.translate.instant('ERROR'),
              this.translate.instant('OPEN.NOT_GIT_REPO')));
            }
          })
          .catch(() => {
            reject(new ServiceResult(false, this.translate.instant('ERROR'),
              this.translate.instant('OPEN.NOT_GIT_REPO')));
          });
      } else {
        this.deleteProjetWithPath(newPath);
        reject(new ServiceResult(false, this.translate.instant('ERROR'),
          this.translate.instant('OPEN.REPO_NOT_EXIST')));
      }
    });
  }

  async getLocalBranches() {
    return new Promise<any>((resolve, reject) => {
      if (this.repoName) {
        gitPromise(this.path).branchLocal()
          .then((result) => {
            resolve(result.all);
        });
      } else {
        reject(null);
      }
    });
  }

  async getRemoteBranches() {
    return new Promise<any>((resolve, reject) => {
      if (this.repoName) {
        gitPromise(this.path).branch(['-r'])
          .then((result) => {
            resolve(result.all);
        });
      } else {
        reject(null);
      }
    });
  }

  registerProject(repo: any, path: any) {
    const Project = {
      repo: repo,
      path: path
    };
    for (let Index = 0; Index < this.recentProject.length; Index++) {
      if (this.recentProject[Index].repo === Project.repo
        && this.recentProject[Index].path === Project.path) {
        this.recentProject.splice(Index, 1);
        Index--;
      }
    }
    this.recentProject.splice(0, 0, Project);
    if (this.recentProject.length >= 5) {
      this.recentProject.splice(5, 1);
    }
    this.emitRecentProjectSubject();
  }

  deleteProject(id: number) {
    this.recentProject.splice(id, 1);
    this.emitRecentProjectSubject();
  }

  deleteProjetWithPath(path: any) {
    for (let Index = 0; Index < this.recentProject.length; Index++) {
      if (this.recentProject[Index].path === path) {
        this.recentProject.splice(Index, 1);
        Index--;
      }
    }
    this.emitRecentProjectSubject();
  }

  async cloneHttps(url: GitUrlParse, folder: string, httpsUser: HttpsUser) {
    return new Promise<ServiceResult>((resolve, reject) => {
      let Remote = `https://${httpsUser.username}:${httpsUser.password}@${url.resource}${url.pathname}`;
      gitPromise(folder)
        .clone(Remote, null)
        .then(() => {
          const RepoPath = this.electronService.path.join(folder, url.name);
          gitPromise(RepoPath)
            .raw(['remote', 'set-url', 'origin', url])
            .then(() => {
              resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                this.translate.instant('CLONE.DONE'), RepoPath));
            })
            .catch((err) => {
              console.log(err);
              reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('CLONE.ERROR')));
            });
        })
        .catch((err) => {
          var ErrMsg = 'CLONE.ERROR';
          var AccessDenied = false;
          if (err.toString().includes('unable to update url base from redirection')) {
            ErrMsg = 'CLONE.UNABLE_TO_UPDATE';
          } else if (err.toString().includes('HTTP Basic: Access denied') ||
              err.toString().includes('Authentication failed for')) {
            ErrMsg = 'CLONE.HTTP_ACCESS_DENIED';
            AccessDenied = true;
          } else if (err.toString().includes('could not create work tree')) {
            ErrMsg = 'CLONE.NOT_WORK_TREE';
          } else if (err.toString().includes('Repository not found')) {
            ErrMsg = 'CLONE.REPO_NOT_FOUND';
          } else if (err.toString().includes('already exists and is not an empty directory')) {
            ErrMsg = 'CLONE.ALREADY_EXISTS';
          } else if (err.toString().includes('Invalid username or password')) {
            ErrMsg = 'CLONE.INVALID_CRED';
          } else if (err.toString().includes('The project you were looking for could not be found.')) {
            ErrMsg = 'CLONE.REPO_NOT_FOUND';
          }
          reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant(ErrMsg), AccessDenied));
        });
    });
  }

  async pushHttps(folder: string, httpsUser: HttpsUser, branch: string) {
    return new Promise<ServiceResult>((resolve, reject) => {
      var Remote;
      gitPromise(folder).raw(['remote', 'get-url', 'origin']).then((data) => {
        const Credentials = httpsUser.username + ':' + httpsUser.password + '@';
        var RemoteArray = [];
        RemoteArray = data.split('://');
        Remote = RemoteArray[0] + '://' + Credentials + RemoteArray[1];
      }).catch((err) => { console.error(err); });

      gitPromise(folder).push(Remote, branch, [])
      .then(() => {
          resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
          this.translate.instant('PUSH.DONE')));
        }).catch((err) => {
        var ErrMsg = 'PUSH.ERROR';
        var AccessDenied = false;
        if (err.toString().includes('unable to update url base from redirection')) {
          ErrMsg = 'PUSH.UNABLE_TO_UPDATE';
        } else if (err.toString().includes('HTTP Basic: Access denied')) {
          ErrMsg = 'PUSH.HTTP_ACCESS_DENIED';
        } else if (err.toString().includes('could not create work tree')) {
          ErrMsg = 'PUSH.NOT_WORK_TREE';
        } else if (err.toString().includes('Repository not found')) {
          ErrMsg = 'PUSH.REPO_NOT_FOUND';
        } else if (err.toString().includes('Invalid username or password')) {
          ErrMsg = 'PUSH.INVALID_CRED';
        }
        reject(new ServiceResult(false, this.translate.instant('ERROR'),
        this.translate.instant(ErrMsg), AccessDenied));
      });
    });
  }

  async pushSsh(url: GitUrlParse, folder: string, username: string, password: string, branch: string) {
      console.log('Ssh non pris en charge pour le moment');
      return new Promise<ServiceResult>(() => {});
  }

}
