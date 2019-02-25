import { Injectable } from '@angular/core';
import * as gitPromise from 'simple-git/promise';
import * as simpleGit from 'simple-git';
import { Subject } from 'rxjs';
import { ElectronService } from './electron.service';
import * as  GitUrlParse from 'git-url-parse';
import { ServiceResult } from '../models/ServiceResult';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-store';

@Injectable()
export class GitService {
  @LocalStorage({ key: 'recentProject' }) recentProject = [];
  recentProjectSubject: Subject<any[]>;
  path: any;
  pathSubject: Subject<any>;
  repoName: any;
  repoNameSubject: Subject<any>;
  gitP: any;
  git: any;

  constructor(private electronService: ElectronService, private translate: TranslateService) {
    this.gitP = gitPromise();
    this.git = simpleGit();
    this.pathSubject = new Subject<any>();
    this.repoNameSubject = new Subject<any>();
    this.recentProjectSubject = new Subject<any[]>();
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

  init(initLocation: string, initName: string) {
    if (initLocation && initName) {
      const PATHTOREPO = this.electronService.path.join(initLocation, initName);
      return new Promise<ServiceResult>((resolve, reject) => {
        if (this.electronService.fs.existsSync(initLocation)) {
          if (!this.electronService.fs.existsSync(PATHTOREPO)) {
            this.electronService.fs.mkdirSync(PATHTOREPO);
          }

          gitPromise(PATHTOREPO).init()
            .then(() => {
              this.setPath(PATHTOREPO);
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

  registerProject(repo: any, path: any) {
    const PROJECT = {
      repo: repo,
      path: path
    };
    for (let INDEX = 0; INDEX < this.recentProject.length; INDEX++) {
      if (this.recentProject[INDEX].repo === PROJECT.repo
        && this.recentProject[INDEX].path === PROJECT.path) {
        this.recentProject.splice(INDEX, 1);
        INDEX--;
      }
    }
    this.recentProject.splice(0, 0, PROJECT);
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
    for (let INDEX = 0; INDEX < this.recentProject.length; INDEX++) {
      if (this.recentProject[INDEX].path === path) {
        this.recentProject.splice(INDEX, 1);
        INDEX--;
      }
    }
    this.emitRecentProjectSubject();
  }

  async cloneHttps(url: GitUrlParse, folder: string, username: string, password: string) {
    return new Promise<ServiceResult>((resolve, reject) => {
      const REMOTE = `https://${username}:${password}@${url.resource}${url.pathname}`;
      gitPromise(folder)
        .clone(REMOTE, null)
        .then(() => {
          const REPOPATH = this.electronService.path.join(folder, url.name);
          gitPromise(REPOPATH)
            .raw(['remote', 'set-url', 'origin', url])
            .then(() => {
              resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                this.translate.instant('CLONE.DONE'), REPOPATH));
            })
            .catch((err) => {
              console.log(err);
              reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('CLONE.ERROR')));
            });
        })
        .catch((err) => {
          var ERRMSG = 'CLONE.ERROR';
          if (err.toString().includes('unable to update url base from redirection')) {
            ERRMSG = 'CLONE.UNABLE_TO_UPDATE';
          } else if (err.toString().includes('HTTP Basic: Access denied')) {
            ERRMSG = 'CLONE.HTTP_ACCESS_DENIED';
          } else if (err.toString().includes('could not create work tree')) {
            ERRMSG = 'CLONE.NOT_WORK_TREE';
          } else if (err.toString().includes('Repository not found')) {
            ERRMSG = 'CLONE.REPO_NOT_FOUND';
          } else if (err.toString().includes('already exists and is not an empty directory')) {
            ERRMSG = 'CLONE.ALREADY_EXISTS';
          } else if (err.toString().includes('Invalid username or password')) {
            ERRMSG = 'CLONE.INVALID_CRED';
          }
          reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant(ERRMSG)));
        });
    });
  }
}
