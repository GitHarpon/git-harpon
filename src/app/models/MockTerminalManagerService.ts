import { Subject } from 'rxjs';
import { ServiceResult } from './ServiceResult';

export class MockTerminalManagerService {
    languages: any[];
    preferencesSubject = new Subject<string>();
    terminalCmd: string;
    terminalName: string;

    constructor() {
        this.terminalCmd = '';
        this.terminalName = '';
    }

    emitPreferencesSubject() {
        this.preferencesSubject.next(this.terminalCmd);
    }

    setCurrentTerminal(newCmd) {
        this.terminalCmd = newCmd;
        this.terminalName = 'terminator';
        this.emitPreferencesSubject();
    }

    getTerminals() {
        return [{key: 'toto', value: 'titi'}];
    }

    openTerminal() {
        return new Promise((resolve, reject) => {
            if (this.terminalName === 'terminator') {
                resolve(new ServiceResult(true, '', ''));
            } else {
                reject(new ServiceResult(false, '', ''));
            }
        });
    }
}
