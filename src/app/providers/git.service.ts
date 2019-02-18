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
  @LocalStorage({key: 'recentProject'}) recentProject = [];
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
    if (this.recentProject[0].path) {
      this.setPath(this.recentProject[0].path);
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
  
  isRepo(currentPath: string) {
    return gitPromise(currentPath).checkIsRepo();
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
            .then( () => {
              resolve(new ServiceResult(true, 'SUCCESS', 'INIT.SUCCESS'));
            })
            .catch( () => {
              reject(new ServiceResult(false, 'ERROR', 'INIT.FAILED'));
            });
        } else {
          reject(new ServiceResult(false, 'ERROR', 'PATH_NOT_FOUND'));
        }
      });
    }
  }
 
  async setPath(newPath) {
    if (this.electronService.fs.existsSync(newPath)) {
      if (await this.isRepo(newPath)) {
        this.path = newPath;
        this.repoName = this.electronService.path.basename(this.path);
        this.emitRepoNameSubject();
        this.electronService.process.chdir(this.path);
        this.git.cwd(this.path);
        this.gitP.cwd(this.path);
        this.emitPathSubject();
        this.registerProject(this.repoName, this.path);
        return new ServiceResult(true, this.translate.instant('SUCCESS'),
          this.translate.instant('OPEN.OPENED_REPO'));
      } else {
        return new ServiceResult(false, this.translate.instant('ERROR'),
          this.translate.instant('OPEN.NOT_GIT_REPO'));
      }
    } else {
      this.deleteProjetWithPath(newPath);
      return new ServiceResult(false, this.translate.instant('ERROR'),
          this.translate.instant('OPEN.REPO_NOT_EXIST'));
    }
  }

  registerProject(repo: any, path: any) {
    const PROJECT = {
      repo: repo,
      path: path
    };
    for (let INDEX = 0; INDEX < this.recentProject.length; INDEX++) {
      if (this.recentProject[INDEX].repo == PROJECT.repo
          && this.recentProject[INDEX].path == PROJECT.path) {
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
      if (this.recentProject[INDEX].path == path) {
        this.recentProject.splice(INDEX, 1);
        INDEX--;
      }
    }
    this.emitRecentProjectSubject();
  }
}
