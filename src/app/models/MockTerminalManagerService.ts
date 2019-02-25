import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TerminalManagerService } from '../providers/terminal-manager.service';
import { ServiceResult } from './ServiceResult';

export class MockTerminalManagerService {
    languages: any[];
    preferencesSubject = new Subject<string>();
    terminalName: string;
    terminalCmd: string;

    constructor() {
        this.terminalName = '';
        this.terminalCmd = '';
        this.emitPreferencesSubject();
    }

    emitPreferencesSubject() {
        this.preferencesSubject.next(this.terminalName);
    }

    setCurrentTerminal(newTerminal: { name: string, cmd: string }) {
        this.terminalName = newTerminal.name;
        this.terminalCmd = newTerminal.cmd;
        this.emitPreferencesSubject();
    }

    getTerminals() {
        return [{key: 'toto', value: 'titi'}];
    }

    openTerminal() {
        return new Promise((resolve, reject) => {
            resolve(new ServiceResult(true, '', ''));
        });
    }
}
