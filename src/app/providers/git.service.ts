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

  /**
   * Fonction permettant de tester si currentPath est un repo git
   * @param currentPath le chemin à tester
   */
  isRepo(currentPath: string) {
    return gitPromise(currentPath).checkIsRepo();
  }

  init(currentPath: string) {
    return gitPromise(currentPath).init();
  }
}
