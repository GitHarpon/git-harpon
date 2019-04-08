import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DiffFileInformation } from './DiffFileInformation';

@Injectable()
export class MockRightPanelService {
    isView: Boolean;
    isViewSubject = new Subject<Boolean>();
    commitHash: String;
    commitHashSubject: Subject<String>;
    listUnstagedFiles: any[];
    listUnstagedFilesSubject: Subject<any[]>;
    listStagedFiles: any[];
    listStagedFilesSubject: Subject<any[]>;
    diffViewVisible: Boolean;
    diffViewVisibleSubject: Subject<Boolean>;
    diffFileInformation: DiffFileInformation;
    diffFileInformationSubject: Subject<DiffFileInformation>;

    constructor() {
        this.isViewSubject = new Subject<Boolean>();
        this.commitHashSubject = new Subject<String>();
        this.isView = true;
        this.emitIsViewSubject();
        this.listUnstagedFilesSubject = new Subject<any[]>();
        this.listStagedFilesSubject = new Subject<any[]>();
        this.diffViewVisibleSubject = new Subject<Boolean>();
        this.diffFileInformationSubject = new Subject<DiffFileInformation>();
        this.diffViewVisible = false;
        this.emitDiffViewVisibleSubject();
    }

    emitIsViewSubject() {
        this.isViewSubject.next(this.isView);
    }

    emitCommitHashSubject() {
        this.commitHashSubject.next(this.commitHash);
    }

    setView(view: boolean) {
        this.isView = view;
        this.emitIsViewSubject();
    }

    setCommitHash(hash: String) {
        this.commitHash = hash;
        this.emitCommitHashSubject();
    }

    emitListUnstagedFilesSubject() {
        this.listUnstagedFilesSubject.next(this.listUnstagedFiles);
    }

    emitListStagedFilesSubject() {
        this.listStagedFilesSubject.next(this.listStagedFiles);
    }

    emitDiffViewVisibleSubject() {
        this.diffViewVisibleSubject.next(this.diffViewVisible);
    }

    emitDiffFileInformationSubject() {
        this.diffFileInformationSubject.next(this.diffFileInformation);
    }

    setListFileCommit(listUnstagedFiles: any[], listStagedFiles: any[]) {
        this.listUnstagedFiles = listUnstagedFiles;
        this.listStagedFiles = listStagedFiles;
        this.emitListUnstagedFilesSubject();
        this.emitListStagedFilesSubject();
    }

    setDiffViewVisible(diffViewVisible: boolean) {
        this.diffViewVisible = diffViewVisible;
        this.emitDiffViewVisibleSubject();
    }

    setDiffFileInformationSubject(diffFileInformation: DiffFileInformation) {
        this.diffFileInformation = diffFileInformation;
        this.emitDiffFileInformationSubject();
    }
}
