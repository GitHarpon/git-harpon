import { Injectable } from '@angular/core';
import * as gitPromise from 'simple-git/promise';
import * as simpleGit from 'simple-git';
import { Subject } from 'rxjs';
import { ElectronService } from './electron.service';
import * as  GitUrlParse from 'git-url-parse';
import { ServiceResult } from '../models/ServiceResult';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'ngx-store';

@Injectable()
export class TerminalManagerService {
  @LocalStorage({key: 'terminalName'}) terminalName = '';
  @LocalStorage({key: 'terminalCmd'}) terminalCmd = '';
  currentOs: any;
  preferencesSubject = new Subject<string>();

  constructor(private electronService: ElectronService,
      private translateService: TranslateService) {
    this.preferencesSubject = new Subject<string>();
    this.currentOs = this.electronService.os.type();
    if (this.terminalName == '' || this.terminalCmd == '') {
      this.terminalName = this.getTerminals()[0].value;
      this.terminalCmd = this.getTerminals()[0].key;
    }
  }

  openTerminal(): Promise<ServiceResult> {
    return new Promise((resolve, reject) => {
      this.electronService.childProcess.exec(this.terminalCmd, (err) => {
        if (err) {
          reject(new ServiceResult(false,
            this.translateService.instant('TERMINAL.UNKNOWN'),
            this.translateService.instant('TERMINAL.MESSAGE')));
        } else {
          resolve(new ServiceResult(true, '', ''));
        }
      });
    });
  }


  getTerminals() {
    switch (this.currentOs) {
      case 'Linux':
        return [
          { key: 'terminator', value: 'terminator' },
          { key: 'gnome-terminal', value: 'gnome-terminal' },
          { key: 'xterm', value: 'xterm' }
        ];
      case 'Darwin':
        return [
          { key: 'open -a Terminal', value: 'Terminal' },
          { key: 'open -a iTerm', value: 'iTerm' },
          { key: 'open -a terminator', value: 'terminator' }
        ];
      case 'Windows_NT':
        return [
          { key: 'start cmd.exe', value: 'cmd' },
          { key: 'start PowerShell.exe', value: 'PowerShell' },
          { key: 'start "" "%ProgramFiles%\\Git\\git-bash.exe"', value: 'Git Bash' }
        ];
      default:
        return [];
    }
  }

  emitPreferencesSubject() {
    this.preferencesSubject.next(this.terminalCmd);
  }

  setCurrentTerminal(newTerminal: { name: string, cmd: string }) {
    this.terminalName = newTerminal.name;
    this.terminalCmd = newTerminal.cmd;
    this.emitPreferencesSubject();
  }
}