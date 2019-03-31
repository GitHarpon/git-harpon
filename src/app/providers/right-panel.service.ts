import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RightPanelService {
  isView: Boolean;
  isViewSubject = new Subject<Boolean>();
  listUnstagedFiles: any[];
  listUnstagedFilesSubject: Subject<any[]>;
  listStagedFiles: any[];
  listStagedFilesSubject: Subject<any[]>;
  commitHash: String;
  commitHashSubject: Subject<String>;
  diffViewVisible: Boolean;
  diffViewVisibleSubject = new Subject<Boolean>();

  constructor() {
    this.commitHashSubject = new Subject<String>();
    this.isViewSubject = new Subject<Boolean>();
    this.isView = true;
    this.emitIsViewSubject();
    this.listUnstagedFilesSubject = new Subject<any[]>();
    this.listStagedFilesSubject = new Subject<any[]>();
    /*this.diffViewVisible = false;
    this.diffViewVisibleSubject = new Subject<Boolean>();
    this.emitDiffViewVisibleSubject();*/
  }

  emitIsViewSubject() {
    this.isViewSubject.next(this.isView);
  }

  emitListUnstagedFilesSubject() {
    this.listUnstagedFilesSubject.next(this.listUnstagedFiles);
  }

  emitListStagedFilesSubject() {
    this.listStagedFilesSubject.next(this.listStagedFiles);
  }

  /*emitDiffViewVisibleSubject() {
    this.diffViewVisibleSubject.next(this.diffViewVisible);
  }*/

  setView(view: boolean) {
    this.isView = view;
    this.emitIsViewSubject();
  }

  /*setDiffViewVisible(diffViewVisible: boolean) {
    this.diffViewVisible = diffViewVisible;
    this.emitDiffViewVisibleSubject();
  }*/

  setListFileCommit(listUnstagedFiles: any[], listStagedFiles: any[]) {
    this.listUnstagedFiles = listUnstagedFiles;
    this.listStagedFiles = listStagedFiles;
    this.emitListUnstagedFilesSubject();
    this.emitListStagedFilesSubject();
  }

  emitCommitHashSubject() {
    this.commitHashSubject.next(this.commitHash);
  }


  setCommitHash(hash: String) {
    this.commitHash = hash;
    this.emitCommitHashSubject();
  }
}
