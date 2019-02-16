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
export class OpenTerminalService {
  terminalListSubscription: Subscription;
  terminalList: any;
  currentTerminalSubscription: Subscription;
  currentTerminal: {
    name: string,
    cmd: string
  };

  constructor(private electronService: ElectronService,
    private translate: TranslateService,
    private toastr: ToastrService) { }

  openTerminal(): ServiceResult {
    this.electronService.childProcess.exec(this.currentTerminal.cmd, (err) => {
      if (err) {
        return new ServiceResult(false, 'TITRE', 'MESSAGE');
        // this.toastr.error(this.translate.instant('UNKNOWN_TERMINAL') + this.currentTerminal.name, null, {
        //   onActivateTick: true
        // });
      }
    });

    return new ServiceResult(true, 'TITRE', 'MESSAGE');
  }

  test(): ServiceResult {
    this.electronService.childProcess.exec('ls', (err) => {
      console.log('in');
      return new ServiceResult(false, 'TITRE', 'MESSAGE');
    });

    return new ServiceResult(true, 'TITRE', 'MESSAGE');
  }
}
