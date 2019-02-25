import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TerminalManagerService } from '../providers/terminal-manager.service';

export class MockTerminalManagerService {
    languages: any[];
    preferencesSubject = new Subject<string>();

    constructor(private terminalManagerService: TerminalManagerService) {
        terminalManagerService.terminalName = 'test';
        this.emitPreferencesSubject();
    }

    emitPreferencesSubject() {
        this.preferencesSubject.next(this.terminalManagerService.terminalName);
    }

    setCurrentTerminal(newTerminal: { name: string, cmd: string }) {
        this.terminalManagerService.terminalName = newTerminal.name;
        this.emitPreferencesSubject();
    }
}
