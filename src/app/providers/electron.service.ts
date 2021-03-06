import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, shell, OpenExternalOptions } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as process from 'process';
import * as url from 'url';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  process: typeof process;
  fs: typeof fs;
  path: typeof path;
  os: typeof os;
  shell: typeof shell;
  url: typeof url;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.shell = window.require('electron').shell;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.path = window.require('path');
      this.process = window.require('process');
      this.url = window.require('url');
      this.os = window.require('os');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  browse() {
    const PATH = this.remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (PATH !== undefined) {
      return PATH[0];
    }
    return null;
  }

  pathJoin(...paths: string[]): string {
    return this.path.join(...paths).toString();
  }

  fsExistsSync(pathToCheck: fs.PathLike): boolean {
    return this.fs.existsSync(pathToCheck);
  }

  shellOpenExternal(link: string, options?: OpenExternalOptions, callback?: (error: Error) => void): boolean {
    return this.shell.openExternal(link);
  }
}
