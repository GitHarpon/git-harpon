import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
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
}
