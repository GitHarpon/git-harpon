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

@Injectable()
export class TerminalManagerService {
  currentOs: any;
  terminalListSubscription: Subscription;
  terminalList: any;
  currentTerminalSubscription: Subscription;
  terminalListSubject = new Subject<any[]>();
  currentTerminalSubject = new Subject<any>();
  currentTerminal: {
    name: string,
    cmd: string
  };

  constructor(private electronService: ElectronService,
    private translateService: TranslateService,
    private toastr: ToastrService) {
    this.currentOs = this.electronService.os.type();
    this.setTerminalList();
    this.setCurrentTerminal(this.terminalList[0]);
  }

  openTerminal(): Promise<ServiceResult> {
    return new Promise((resolve, reject) => {
      this.electronService.childProcess.exec(this.currentTerminal.cmd, (err) => {
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

  setCurrentTerminal(newTerminal: any) {
    this.currentTerminal = newTerminal;
    this.emitCurrentTerminalSubject();
  }

  emitTerminalListSubject() {
    this.terminalListSubject.next(this.terminalList.slice());
  }

  emitCurrentTerminalSubject() {
    this.currentTerminalSubject.next(this.currentTerminal);
  }

  setTerminalList() {
    let List = [];
    switch (this.currentOs) {
      case 'Linux':
        List = [{
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
        }];
        break;
      case 'Darwin':
        List = [{
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
        }];
        break;
      case 'Windows_NT':
        List = [{
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
        }];
        break;
      default:
        break;
    }
    this.terminalList = List;
    this.emitTerminalListSubject();
  }
}
