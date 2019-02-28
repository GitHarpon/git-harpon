import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ElectronService } from './electron.service';
import { ServiceResult } from '../models/ServiceResult';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-store';
import { GitService } from './git.service';

@Injectable()
export class TerminalManagerService {
  @LocalStorage({key: 'terminalName'}) terminalName = '';
  @LocalStorage({key: 'terminalCmd'}) terminalCmd = '';
  currentOs: any;
  preferencesSubject = new Subject<string>();
  pathSubscription: Subscription;
  path: string;

  constructor(private electronService: ElectronService, private translateService: TranslateService,
      private gitService: GitService) {
    this.pathSubscription = this.gitService.pathSubject.subscribe(
      (path: any) => {
        this.path = path;
        console.log('toto : ', this.path);
      });
    this.gitService.emitPathSubject();

    this.preferencesSubject = new Subject<string>();
    this.currentOs = this.electronService.os.type();
    if (this.terminalName == '' || this.terminalCmd == '') {
      this.terminalName = this.getTerminals()[0].value;
      this.terminalCmd = this.getTerminals()[0].key;
    }
  }

  openTerminal(): Promise<ServiceResult> {
    return new Promise((resolve, reject) => {
      this.electronService.childProcess.exec(this.terminalCmd + this.path, (err) => {
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
          { key: 'terminator --working-directory=', value: 'terminator' },
          { key: 'gnome-terminal --working-directory=', value: 'gnome-terminal' },
          { key: 'xterm --working-directory=', value: 'xterm' }
        ];
      case 'Darwin':
        return [
          { key: 'open -a Terminal ', value: 'Terminal' },
          { key: 'open -a iTerm ', value: 'iTerm' },
          { key: 'open -a terminator ', value: 'terminator' }
        ];
      case 'Windows_NT':
        return [
          { key: 'start cmd.exe /k cd ', value: 'cmd' },
          { key: 'start PowerShell.exe /k cd ', value: 'PowerShell' },
          { key: 'start "" "%ProgramFiles%\\Git\\git-bash.exe" /k cd ', value: 'git-bash' }
        ];
      default:
        return [];
    }
  }

  emitPreferencesSubject() {
    this.preferencesSubject.next(this.terminalCmd);
  }

  setCurrentTerminal(newCmd) {
    this.terminalCmd = newCmd;
    this.terminalName = this.getTerminals().filter(o => {
      return o.key === this.terminalCmd;
    })[0].value;
    this.emitPreferencesSubject();
  }
}
