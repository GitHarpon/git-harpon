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
  repoName: any;
  repoNameSubject: Subject<any>;
  gitP: any;
  git: any;

  constructor(private electronService: ElectronService) {
    this.gitP = gitPromise();
    this.git = simpleGit();
    this.pathSubject = new Subject<any>();
    this.repoNameSubject = new Subject<any>();
    this.path = this.electronService.process.cwd();
  }

  emitPathSubject() {
    this.pathSubject.next(this.path);
  }

  emitRepoNameSubject() {
    this.repoNameSubject.next(this.repoName);
  }

  /**
   * Fonction permettant de tester si currentPath est un repo git
   * @param currentPath le chemin à tester
   */
  isRepo(currentPath: string) {
    return gitPromise(currentPath).checkIsRepo();
  }

  /**
   * Fonction permettant de changer le chemin courant
   * @param newPath le nouveau chemin
   */
  setPath(newPath) {
    if (this.isRepo(newPath)) {
      this.path = newPath;
      this.repoName = this.electronService.path.basename(this.path);
      this.electronService.process.chdir(this.path);
      this.git.cwd(this.path);
      this.gitP.cwd(this.path);
      this.emitPathSubject();
      this.emitRepoNameSubject();
      // A traduir
      return new ServiceResult(true, 'Succès', 'Répo ouvert');
    } else {
      return new ServiceResult(false, 'Echec', 'Répo pas ouvert');

    }
  }
}
