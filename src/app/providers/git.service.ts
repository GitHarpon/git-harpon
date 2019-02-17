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

  /**
   * Fonction permettant d'initialiser un repo git
   * @param initLocation le chemin qui contiendra le projet
   * @param initName le nom du projet
   */
  init(initLocation: string, initName: string) {

    if (initLocation && initName) {
      const PATHTOREPO = this.electronService.path.join(initLocation, initName);
      return new Promise<ServiceResult>((resolve, reject) => {
        // Si l'emplacement existe
        if (this.electronService.fs.existsSync(initLocation)) {
          if (!this.electronService.fs.existsSync(PATHTOREPO)) {
            // Répertoire existe pas encore donc on le créé et on init dedans
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
