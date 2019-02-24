import { ipcRenderer, webFrame, remote, shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { Injectable } from '@angular/core';

@Injectable()
export class MockElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  process: typeof process;
  fs: typeof fs;
  path: typeof path;
  shell: typeof shell;

  constructor() {
    /*if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.shell = window.require('electron').shell;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.path = window.require('path');
      this.process = window.require('process');
    }*/
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
