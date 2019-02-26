import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TerminalManagerService } from '../providers/terminal-manager.service';
import { ServiceResult } from './ServiceResult';

export class MockTerminalManagerService {
    languages: any[];
    preferencesSubject = new Subject<string>();
    terminalCmd: string;

    constructor() {
        this.terminalCmd = '';
        this.emitPreferencesSubject();
    }

    emitPreferencesSubject() {
        this.preferencesSubject.next(this.terminalCmd);
    }

    setCurrentTerminal(newCmd) {
        this.terminalCmd = newCmd;
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
