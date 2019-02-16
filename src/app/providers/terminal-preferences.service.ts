import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Subject } from 'rxjs';

@Injectable()
export class TerminalPreferencesService {
    currentOs: any;
    terminalListSubject = new Subject<any[]>();
    terminalList: any;
    currentTerminalSubject = new Subject<any>();
    currentTerminal: {
        name: string,
        cmd: string
    };

    constructor(private electronService: ElectronService) {
        this.currentOs = this.electronService.os.type();
        this.setTerminalList();
        this.setCurrentTerminal(this.terminalList[0]);
    }

    emitTerminalListSubject() {
        this.terminalListSubject.next(this.terminalList.slice());
    }

    emitCurrentTerminalSubject() {
        this.currentTerminalSubject.next(this.currentTerminal);
    }

    setCurrentTerminal(newTerminal: any) {
        this.currentTerminal = newTerminal;
        this.emitCurrentTerminalSubject();
    }

    setTerminalList() {
        let LIST = [];
        switch (this.currentOs) {
            case 'Linux':
                LIST =  [{
                    cmd: 'terminator',
                    name: 'terminator'
                },
                {
                    cmd: 'gnome-terminal',
                    name: 'gnome-terminal'
                },
                {
                    cmd: 'xterm',
                    name: 'xterm'
                },
                {
                    cmd: 'terminal-bidon',
                    name: 'terminal-bidon'
                }];
                break;
            case 'Darwin':
                LIST =  [{
                    cmd: 'open -a Terminal',
                    name: 'Terminal'
                },
                {
                    cmd: 'open -a iTerm',
                    name: 'iTerm'
                },
                {
                    cmd: 'open -a terminator',
                    name: 'terminator'
                },
                {
                    cmd: 'open -a terminal-bidon',
                    name: 'terminal-bidon'
                }];
                break;
            case 'Windows_NT':
                LIST = [{
                    cmd: 'start cmd.exe',
                    name: 'cmd'
                },
                {
                    cmd: 'start PowerShell.exe',
                    name: 'PowerShell'
                },
                {
                    cmd: 'start "" "%ProgramFiles%\\Git\\git-bash.exe"',
                    name: 'Git Bash'
                },
                {
                    cmd: 'start terminal-bidon',
                    name: 'terminal-bidon'
                }];
                break;
            default:
                break;
        }
        this.terminalList = LIST;
        this.emitTerminalListSubject();
    }
}
