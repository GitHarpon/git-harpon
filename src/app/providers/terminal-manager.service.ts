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
      private translateService: TranslateService,
      private toastr: ToastrService) {
    this.preferencesSubject = new Subject<string>();
    this.currentOs = this.electronService.os.type();
    if (localStorage.getItem('terminalName') == null
        || localStorage.getItem('terminalCmd') == null) {
      switch (this.currentOs) {
        case 'Linux':
          localStorage.setItem('terminalName', 'terminator');
          localStorage.setItem('terminalCmd', 'terminator');
          break;
        case 'Darwin':
          localStorage.setItem('terminalName', 'Terminal');
          localStorage.setItem('terminalCmd', 'open -a Terminal');
          break;
        case 'Windows_NT':
          localStorage.setItem('terminalName', 'cmd');
          localStorage.setItem('terminalCmd', 'start cmd.exe');
          break;
        default:
          break;
      }
    }
  }

  openTerminal(): Promise<ServiceResult> {
    return new Promise((resolve, reject) => {
      this.electronService.childProcess.exec(this.getCurrentTerminalCmd(), (err) => {
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

  getCurrentTerminalName() {
    return localStorage.getItem('terminalName');
  }

  getCurrentTerminalCmd() {
    return localStorage.getItem('terminalCmd');
  }

  setCurrentTerminalName(name) {
    localStorage.setItem('terminalName', name);
  }

  setCurrentTerminalCmd(cmd) {
    localStorage.setItem('terminalCmd', cmd);
  }

  emitPreferencesSubject() {
    this.preferencesSubject.next(this.terminalName);
  }

  setCurrentTerminal(newTerminal: { name: string, cmd: string }) {
    this.terminalName = newTerminal.name;
    this.terminalCmd = newTerminal.cmd;
    // this.setCurrentTerminalName(newTerminal.name);
    // this.setCurrentTerminalCmd(newTerminal.cmd);
    this.emitPreferencesSubject();
  }
}
