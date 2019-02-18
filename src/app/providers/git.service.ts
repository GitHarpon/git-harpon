import { Injectable } from '@angular/core';
import * as gitPromise from 'simple-git/promise';
import * as simpleGit from 'simple-git';
import { Subject } from 'rxjs';
import { ElectronService } from './electron.service';
import * as  GitUrlParse from 'git-url-parse';
import { ServiceResult } from '../models/ServiceResult';

@Injectable()
export class GitService {
  path: any;
  pathSubject: Subject<any>;
  gitP: any;
  git: any;

  constructor(private electronService: ElectronService) {
    this.gitP = gitPromise();
    this.git = simpleGit();
    this.pathSubject = new Subject<any>();
    this.path = this.electronService.process.cwd();
  }

  emitPathSubject() {
    this.pathSubject.next(this.path);
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
}
