import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MockRightPanelService {
    isView: Boolean;
    isViewSubject = new Subject<Boolean>();
    listUnstagedFiles: any[];
    listUnstagedFilesSubject: Subject<any[]>;
    listStagedFiles: any[];
    listStagedFilesSubject: Subject<any[]>;

    constructor() {
        this.isViewSubject = new Subject<Boolean>();
        this.isView = true;
        this.emitIsViewSubject();
        this.listUnstagedFilesSubject = new Subject<any[]>();
        this.listStagedFilesSubject = new Subject<any[]>();
    }

    emitIsViewSubject() {
        this.isViewSubject.next(this.isView);
    }

    setView(view: boolean) {
        this.isView = view;
        this.emitIsViewSubject();
    }

    emitListUnstagedFilesSubject() {
        this.listUnstagedFilesSubject.next(this.listUnstagedFiles);
    }

    emitListStagedFilesSubject() {
        this.listStagedFilesSubject.next(this.listStagedFiles);
    }

    setListFileCommit(listUnstagedFiles: any[], listStagedFiles: any[]) {
        this.listUnstagedFiles = listUnstagedFiles;
        this.listStagedFiles = listStagedFiles;
        this.emitListUnstagedFilesSubject();
        this.emitListStagedFilesSubject();
    }
}
