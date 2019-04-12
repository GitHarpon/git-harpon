import { Injectable } from '@angular/core';
import * as gitPromise from 'simple-git/promise';
import * as simpleGit from 'simple-git';
import { Subject } from 'rxjs';
import { ElectronService } from './electron.service';
import * as  GitUrlParse from 'git-url-parse';
import { ServiceResult } from '../models/ServiceResult';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-store';
import { HttpsUser } from '../models/HttpsUser';
import * as isomorphic from 'isomorphic-git';
import { CommitDescription } from '../models/CommitInformations';
import { RightPanelService } from './right-panel.service';
import { DiffFileInformation } from '../models/DiffFileInformation';

@Injectable()
export class GitService {
  @LocalStorage({ key: 'recentProject' }) recentProject = [];
  recentProjectSubject: Subject<any[]>;
  httpsUserSubject: Subject<HttpsUser>;
  httpsUser: HttpsUser;
  path: any;
  pathSubject: Subject<any>;
  repoName: any;
  repoNameSubject: Subject<any>;
  branchName: any;
  branchNameSubject: Subject<any>;
  gitP: any;
  git: any;

  constructor(private electronService: ElectronService, private translate: TranslateService,
      private rightPanelService: RightPanelService) {
    this.gitP = gitPromise();
    this.git = simpleGit();
    this.pathSubject = new Subject<any>();
    this.repoNameSubject = new Subject<any>();
    this.recentProjectSubject = new Subject<any[]>();
    this.branchNameSubject = new Subject<any>();
    this.httpsUserSubject = new Subject<HttpsUser>();
    this.setHttpsUser({ username: null, password: null });
    if (this.recentProject[0]) {
      if (this.recentProject[0].path) {
        this.setPath(this.recentProject[0].path);
      } else {
        this.path = this.electronService.process.cwd();
      }
    } else {
      this.path = this.electronService.process.cwd();
    }
  }

  emitPathSubject() {
    this.pathSubject.next(this.path);
  }

  emitRepoNameSubject() {
    this.repoNameSubject.next(this.repoName);
  }

  emitRecentProjectSubject() {
    this.recentProjectSubject.next(this.recentProject.slice());
  }

  emitBranchNameSubject() {
    this.branchNameSubject.next(this.branchName);
  }

  emitHttpsUserSubject() {
    this.httpsUserSubject.next(this.httpsUser);
  }

  setHttpsUser(newUser: HttpsUser) {
    this.httpsUser = newUser;
    this.emitHttpsUserSubject();
  }

  async getDiffFile(diffInformation: DiffFileInformation) {
    if (diffInformation.isCurrentCommit) {
      return this.gitP.raw(['diff', 'HEAD', '--', diffInformation.file]);
    } else {
      if (diffInformation.parent) {
        return this.gitP.raw(['diff', diffInformation.parent, diffInformation.children, '--', diffInformation.file]);
      } else {
        return gitPromise().show([diffInformation.children, '--', diffInformation.file]);
      }
    }
  }

  init(initLocation: string, initName: string) {
    if (initLocation && initName) {
      const PathToRepo = this.electronService.path.join(initLocation, initName);
      return new Promise<ServiceResult>((resolve, reject) => {
        if (this.electronService.fs.existsSync(initLocation)) {
          if (!this.electronService.fs.existsSync(PathToRepo)) {
            this.electronService.fs.mkdirSync(PathToRepo);
          }
          gitPromise(PathToRepo).init()
            .then(() => {
              this.setPath(PathToRepo);

              if (!this.electronService.fs.existsSync(this.electronService.path.join(PathToRepo, 'README.md'))) {
                this.electronService.fs.writeFileSync(this.electronService.path.join(PathToRepo, 'README.md'), initName + '\r\n');
              }

              gitPromise(PathToRepo).add(this.electronService.path.join(PathToRepo, 'README.md')).then(() => {
                gitPromise(PathToRepo).commit('Initial commit').then(() => {
                  resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                    this.translate.instant('INIT.SUCCESS')));
                });
              });
            })
            .catch(() => {
              reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('INIT.FAILED')));
            });
        } else {
          reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant('PATH_NOT_FOUND')));
        }
      });
    }
  }

  async setPath(newPath) {
    return new Promise<ServiceResult>((resolve, reject) => {
      if (this.electronService.fs.existsSync(newPath)) {
        gitPromise(newPath).checkIsRepo()
          .then(isRepo => {
            if (isRepo) {
              gitPromise(newPath).log().then(() => {
                this.rightPanelService.setCommitHash(null);
                this.path = newPath;
                this.repoName = this.electronService.path.basename(this.path);
                this.emitRepoNameSubject();
                this.electronService.process.chdir(this.path);
                this.git.cwd(this.path);
                this.gitP.cwd(this.path);
                this.emitPathSubject();
                this.registerProject(this.repoName, this.path);
                this.updateFilesDiff();
                this.getCurrentBranch();
                this.revParseHEAD().then((data) => {
                  this.rightPanelService.setCommitHash(data.replace('\n', ''));
                });
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                  this.translate.instant('OPEN.OPENED_REPO')));
              }).catch(() => {
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                  this.translate.instant('OPEN.NO_COMMIT')));
              });
            } else {
              reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('OPEN.NOT_GIT_REPO')));
            }
          })
          .catch(() => {
            reject(new ServiceResult(false, this.translate.instant('ERROR'),
              this.translate.instant('OPEN.NOT_GIT_REPO')));
          });
      } else {
        this.deleteProjetWithPath(newPath);
        reject(new ServiceResult(false, this.translate.instant('ERROR'),
          this.translate.instant('OPEN.REPO_NOT_EXIST')));
      }
    });
  }

  async setNewBranch(newBranchName, referenceBranchName) {
    return new Promise<any>((resolve, reject) => {
      if (this.repoName) {
        this.gitP.branch([])
          .then((result) => {
            if (result.all.includes(referenceBranchName) && !result.all.includes(newBranchName)) {
              this.gitP.raw(['checkout', '-b', newBranchName, referenceBranchName])
                .then(() => {
                  this.branchName = newBranchName;
                  this.emitBranchNameSubject();
                  resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                  this.translate.instant('BRANCH.CREATED')));
                })
                .catch(() => {
                  reject(new ServiceResult(false, this.translate.instant('ERROR'),
                  this.translate.instant('BRANCH.NOT_CREATED')));
                });
            } else {
              gitPromise(this.path).branch(['-r'])
                .then((resultbis) => {
                  if (resultbis.all.includes(referenceBranchName) && !result.all.includes(newBranchName)) {
                    this.gitP.raw(['checkout', '-b', newBranchName, referenceBranchName])
                    .then(() => {
                      this.branchName = newBranchName;
                      this.emitBranchNameSubject();
                      resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                      this.translate.instant('BRANCH.CREATED')));
                    })
                    .catch(() => {
                      reject(new ServiceResult(false, this.translate.instant('ERROR'),
                      this.translate.instant('BRANCH.UNCOMMIT')));
                    });
                  } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('BRANCH.ALREADY_EXISTS')));
                  }
                })
                .catch(() => {
                  reject(new ServiceResult(false, this.translate.instant('ERROR'),
                  this.translate.instant('BRANCH.NOT_CREATED')));
                });
            }
          })
          .catch(() => {
            reject(new ServiceResult(false, this.translate.instant('ERROR'),
              this.translate.instant('BRANCH.NOT_CREATED')));
          });
      }
    });
  }

  async applyDeletionBranch(deleteBranchName: string, httpsUser: HttpsUser) {
    return new Promise<ServiceResult>((resolve, reject) => {
      if (deleteBranchName !== this.branchName) {
        this.gitP.branch(['-r'])
          .then((result) => {
            if (result.all.includes(deleteBranchName)) {
              this.gitP.raw(['ls-remote', '--get-url'])
                .then((data) => {
                  const Url = GitUrlParse(data);
                  if (Url.protocol === 'https') {
                    const Remote = `${Url.protocol}://${httpsUser.username}:${httpsUser.password}@${Url.resource}${Url.pathname}`;
                    this.gitP.raw(['push', Remote, '--delete', deleteBranchName.split('/')[1]])
                      .then(() => {
                        this.gitP.raw(['branch', '-d', '-r', deleteBranchName])
                          .then(() => {
                            resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                            this.translate.instant('BRANCH.REMOTE_DELETED'), 'newData'));
                          })
                          .catch((err) => {
                            reject(new ServiceResult(false, this.translate.instant('ERROR'),
                            this.translate.instant('BRANCH.REMOTE_NOT_DELETED')));
                          });
                      })
                      .catch((err) => {
                        var ErrMsg = 'BRANCH.ERROR_DELETION';
                        var AccessDenied = false;
                        if (err.toString().includes('HTTP Basic: Access denied')) {
                          ErrMsg = 'BRANCH.HTTP_ACCESS_DENIED';
                          AccessDenied = true;
                        } else if (err.toString().includes('not valid: is this a git repository ?')) {
                          ErrMsg = 'BRANCH.REPO_NOT_FOUND';
                        } else  if (err.toString().includes('Invalid username or password')) {
                          ErrMsg = 'BRANCH.INVALID_CRED';
                        } else if (err.toString().includes('Could not resolve host:')) {
                          ErrMsg = 'BRANCH.ACCESS_DENIED';
                        }
                        reject(new ServiceResult(false, this.translate.instant('ERROR'),
                          this.translate.instant(ErrMsg), AccessDenied));
                      });
                  } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant('SSH')));
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            } else {
              this.gitP.raw(['branch', '-D', deleteBranchName])
                .then(() => {
                  resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                  this.translate.instant('BRANCH.DELETED')));
                })
                .catch(() => {
                  reject(new ServiceResult(false, this.translate.instant('ERROR'),
                  this.translate.instant('BRANCH.NOT_DELETED')));
                });
            }
          })
          .catch(() => {
            reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant('BRANCH.NOT_DELETED')));
          });
      } else {
        reject(new ServiceResult(false, this.translate.instant('ERROR'),
        this.translate.instant('BRANCH.CURRENT')));
      }
    });
  }


  getCurrentBranch() {
    gitPromise(this.path).branch([])
      .then((result) => {
        if (result.current) {
          this.branchName = result.current;
          this.emitBranchNameSubject();

          return this.branchName;
        }
      });
  }

  async getLocalBranches() {
    return new Promise<any>((resolve, reject) => {
      if (this.repoName) {
        gitPromise(this.path).branch([])
          .then((result) => {
            resolve(result.all);
        });
      }
    });
  }

  async getRemoteBranches() {
    return new Promise<any>((resolve, reject) => {
      if (this.repoName) {
        gitPromise(this.path).branch(['-r'])
          .then((result) => {
            resolve(result.all);
        });
      }
    });
  }

  async renameBranch(oldName: string, newName: string) {
    return new Promise<any>((resolve, reject) => {
      if (this.repoName) {
        gitPromise(this.path).raw(['branch', '-m', oldName, newName])
          .then((result) => {
            resolve(new ServiceResult(true, this.translate.instant('BRANCH.BRANCH_RENAME'),
              this.translate.instant('BRANCH.BRANCH_RENAME_SUCCESS')));
          }).catch((err) => {
            reject(new ServiceResult(false, this.translate.instant('BRANCH.BRANCH_RENAME'),
            this.translate.instant('BRANCH.BRANCH_RENAME_FAILURE')));
          });
      } else {
        reject(new ServiceResult(false, this.translate.instant('BRANCH.BRANCH_RENAME'),
        this.translate.instant('BRANCH.BRANCH_RENAME_FAILURE')));
      }
    });
  }

  checkoutLocalBranch(newBranch) {
    if (newBranch !== this.branchName) {
      return new Promise<ServiceResult>((resolve, reject) => {
        gitPromise(this.path).checkout(newBranch).then(() => {
          this.getCurrentBranch();
          resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
            this.translate.instant('BRANCH.CHECKED_OUT')));
        }).catch((err) => {
          let ErrMsg = 'BRANCH.ERROR';
          if (err.toString().includes('local changes to the following files would be overwritten by checkout')) {
            ErrMsg = 'BRANCH.CHECKED_OUT_CONFLICTS';
          }
          reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant(ErrMsg)));
        });
      });
    }
  }

  checkoutRemoteBranch(remoteBranch, currentBranch, isInLocal) {
    return new Promise<ServiceResult>((resolve, reject) => {
      if (!isInLocal) {
        gitPromise(this.path)
          .raw(['checkout', '-t', remoteBranch]).then((result) => {
          this.getCurrentBranch();
          resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
            this.translate.instant('BRANCH.CHECKED_OUT')));
        }).catch((err) => {
          console.log(err);
          reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant('BRANCH.ERROR')));
        });
      } else {
        let LocalBranch;
        if (remoteBranch.split('/')[1]) {
          LocalBranch = remoteBranch.split('/')[1];
        }
        gitPromise(this.path)
          .raw(['rev-parse', '--symbolic-full-name', '--abbrev-ref', LocalBranch + '@{u}']).then((remote) => {
            if (remote.split('/')[0] === remoteBranch.split('/')[0]) {
              const BranchesDiffs = (LocalBranch === currentBranch) ? [ remoteBranch ] : [ LocalBranch, remoteBranch ];
                gitPromise(this.path).diff(BranchesDiffs).then((isDifferent) => {
                  if (!isDifferent) {
                    gitPromise(this.path).checkout(LocalBranch).then((result) => {
                      this.getCurrentBranch();
                      resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                        this.translate.instant('BRANCH.CHECKED_OUT')));
                    }).catch((err) => {
                      console.log(err);
                      reject(new ServiceResult(false, this.translate.instant('ERROR'),
                        this.translate.instant('ERROR'), remoteBranch));
                    });
                  } else {
                    reject(new ServiceResult(false, this.translate.instant('ERROR'),
                      this.translate.instant('ERROR'), remoteBranch));
                  }
                });
            } else {
              reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('ERROR'), remoteBranch));
            }
          });
        }
      });
    }


  createBranchHere(newBranch, remoteBranch) {
    return new Promise<ServiceResult>((resolve, reject) => {
      this.gitP.raw(['checkout', '-b', newBranch, remoteBranch])
      .then((result) => {
        this.getCurrentBranch();
        resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
            this.translate.instant('BRANCH.CHECKED_OUT')));
      }).catch((err) => {
        console.log(err);
        reject(new ServiceResult(false, this.translate.instant('ERROR'),
          this.translate.instant('BRANCH.ERROR')));
      });
    });
  }


  resetLocalHere(remoteBranch) {
    return new Promise<ServiceResult>((resolve, reject) => {
      const LocalBranch = remoteBranch.split('/')[1];
      gitPromise(this.path).checkout(LocalBranch).then((result) => {
        this.getCurrentBranch();
        gitPromise(this.path).raw(['reset', '--hard', remoteBranch]).then((reset) => {
          resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
            this.translate.instant('BRANCH.CHECKED_OUT')));
        });
      });
    });
  }

  getGraph() {
    return new Promise<any>((resolve, reject) => {
      gitPromise(this.path).log(['--all', '--reverse']).then((result) => {
        resolve(result.all);
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  registerProject(repo: any, path: any) {
    const Project = {
      repo: repo,
      path: path
    };
    for (let Index = 0; Index < this.recentProject.length; Index++) {
      if (this.recentProject[Index].repo === Project.repo
        && this.recentProject[Index].path === Project.path) {
        this.recentProject.splice(Index, 1);
        Index--;
      }
    }
    this.recentProject.splice(0, 0, Project);
    if (this.recentProject.length >= 5) {
      this.recentProject.splice(5, 1);
    }
    this.emitRecentProjectSubject();
  }

  deleteProject(id: number) {
    this.recentProject.splice(id, 1);
    this.emitRecentProjectSubject();
  }

  deleteProjetWithPath(path: any) {
    for (let Index = 0; Index < this.recentProject.length; Index++) {
      if (this.recentProject[Index].path === path) {
        this.recentProject.splice(Index, 1);
        Index--;
      }
    }
    this.emitRecentProjectSubject();
  }

  async cloneHttps(url: GitUrlParse, folder: string, httpsUser: HttpsUser) {
    return new Promise<ServiceResult>((resolve, reject) => {
      let Remote = `https://${httpsUser.username}:${httpsUser.password}@${url.resource}${url.pathname}`;
      gitPromise(folder)
        .clone(Remote, null)
        .then(() => {
          const RepoPath = this.electronService.path.join(folder, url.name);
          gitPromise(RepoPath)
            .raw(['remote', 'set-url', 'origin', url])
            .then(() => {
              resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                this.translate.instant('CLONE.DONE'), RepoPath));
            })
            .catch((err) => {
              reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('CLONE.ERROR')));
            });
        })
        .catch((err) => {
          var ErrMsg = 'CLONE.ERROR';
          var AccessDenied = false;
          if (err.toString().includes('unable to update url base from redirection')) {
            ErrMsg = 'CLONE.UNABLE_TO_UPDATE';
          } else if (err.toString().includes('HTTP Basic: Access denied') ||
            err.toString().includes('Authentication failed for')) {
            ErrMsg = 'CLONE.HTTP_ACCESS_DENIED';
            AccessDenied = true;
          } else if (err.toString().includes('could not create work tree')) {
            ErrMsg = 'CLONE.NOT_WORK_TREE';
          } else if (err.toString().includes('Repository not found')) {
            ErrMsg = 'CLONE.REPO_NOT_FOUND';
          } else if (err.toString().includes('already exists and is not an empty directory')) {
            ErrMsg = 'CLONE.ALREADY_EXISTS';
          } else if (err.toString().includes('Invalid username or password')) {
            ErrMsg = 'CLONE.INVALID_CRED';
          } else if (err.toString().includes('The project you were looking for could not be found.')) {
            ErrMsg = 'CLONE.REPO_NOT_FOUND';
          }
          reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant(ErrMsg), AccessDenied));
        });
    });
  }

  async getUrl(remote: String) {
    return new Promise<ServiceResult>((resolve, reject) => {
      this.gitP.raw(['remote', 'get-url', remote])
      .then((data) => {
        resolve(new ServiceResult(true, this.translate.instant('SUCCESS'), this.translate.instant('SUCCESS'), data));
      }).catch((err) => {
        console.log(err);
        reject(new ServiceResult(false, this.translate.instant('ERROR'), this.translate.instant('ERROR')));
      });
    });
  }

  async pushHttps(folder: string, httpsUser: HttpsUser, branch: string) {
    return new Promise<ServiceResult>((resolve, reject) => {
      this.gitP.raw(['remote', 'get-url', 'origin']).then((data) => {
        const Url = GitUrlParse(data);
        var Remote;
        if (httpsUser.password == '' || httpsUser.username == '') {
          Remote = `https://null:null@${Url.resource}${Url.pathname}`;
        } else {
          Remote = `https://${httpsUser.username}:${httpsUser.password}@${Url.resource}${Url.pathname}`;
        }
        this.gitP.raw(['push', '-u', Remote, branch])
        .then((result) => {
            resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
            this.translate.instant('PUSH.DONE')));
          }).catch((err) => {
            var ErrMsg = 'PUSH.ERROR';
            console.log(err);
            var AccessDenied = false;
            if (err.toString().includes('unable to update url base from redirection')) {
              ErrMsg = 'PUSH.UNABLE_TO_UPDATE';
            } else if (err.toString().includes('HTTP Basic: Access denied')) {
              ErrMsg = 'PUSH.HTTP_ACCESS_DENIED';
              AccessDenied = true;
            } else if (err.toString().includes('could not create work tree')) {
              ErrMsg = 'PUSH.NOT_WORK_TREE';
            } else if (err.toString().includes('Repository not found')) {
              ErrMsg = 'PUSH.REPO_NOT_FOUND';
            } else if (err.toString().includes('Invalid username or password')) {
              ErrMsg = 'PUSH.INVALID_CRED';
              AccessDenied = true;
            } else if (err.toString().includes('denied to')) {
              ErrMsg = 'PUSH.INVALID_CRED';
              AccessDenied = true;
            } else if (err.toString().includes('You are not allowed to push code')) {
              ErrMsg = 'PUSH.INVALID_CRED';
              AccessDenied = true;
            }
            reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant(ErrMsg), AccessDenied));
          });
      }).catch((err) => {
        reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant('PUSH.ERROR')));
      });
    });
  }

  async updateFilesDiff() {
    var ListUnstagedFiles = [];
    var ListStagedFiles = [];
    return await this.gitP.status().then((statusSummary) => {
      const ListFile = statusSummary.files;
      ListFile.forEach(file => {
        if (file.working_dir == 'M' || file.working_dir == 'D') {
          ListUnstagedFiles.push({
            path: file.path,
            status: file.working_dir
          });
        } else if (file.working_dir == '?') {
          ListUnstagedFiles.push({
            path: file.path,
            status: 'A'
          });
        }
        if (file.index == 'M' || file.index == 'D' || file.index == 'A') {
          ListStagedFiles.push({
            path: file.path,
            status: file.index
          });
        }
      });
      this.rightPanelService.setListFileCommit(ListUnstagedFiles, ListStagedFiles);
    });
  }

  addFile(path: any) {
    this.gitP.add(path).then(() => {
      this.updateFilesDiff();
    });
  }

  removeFile(path: any) {
    this.gitP.reset(['--mixed', '--', path]).then(() => {
      this.updateFilesDiff();
    });
  }

  async pushSsh(url: GitUrlParse, folder: string, username: string, password: string, branch: string) {
      console.log('Ssh non pris en charge pour le moment');
      return new Promise<ServiceResult>(() => {});
  }

  async pullrebaseHttps(httpsUser: HttpsUser, branch: string) {
  return new Promise<ServiceResult>((resolve, reject) => {
    this.gitP.raw(['remote', 'get-url', 'origin'])
      .then((data) => {
        const Url = GitUrlParse(data);
        var Remote;
        if (httpsUser.password == '' || httpsUser.username == '') {
          Remote = `https://null:null@${Url.resource}${Url.pathname}`;
        } else {
          Remote = `https://${httpsUser.username}:${httpsUser.password}@${Url.resource}${Url.pathname}`;
        }
        this.gitP.pull(Remote, branch, {'--rebase': 'true'})
          .then((data) => {
            resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
            this.translate.instant('PULL.DONE'), 'newData'));
          })
          .catch((err) => {
            var ErrMsg = 'PULL.ERROR';
            var AccessDenied = false;
            if (err.toString().includes('Authentication failed')) {
              ErrMsg = 'PULL.UNABLE_TO_CONNECT';
              AccessDenied = true;
            }
            reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant(ErrMsg), AccessDenied));
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  async revParseHEAD(): Promise<String> {
    return this.gitP.raw(['rev-parse', 'HEAD']);
  }

  async commitDescription(hash: String) {
    return new Promise<any>((resolve, reject) => {
      isomorphic.log(
        {
          fs: this.electronService.fs,
          dir: this.electronService.process.cwd(),
          depth: 1,
          ref: hash.toString()
        })
        .then((commitInfo) => {
          const Args = hash + '^!';
          gitPromise().show(['-m', '--name-status', '--oneline', hash.toString()])
            .then((result) => {
              const FirstArray = result.split(/\n/);
              FirstArray.shift();
              var SecondArray = FirstArray.map(x => {
                return (x.split(/\s{1}/g));
              });
              const Final = [];
              for (var Elem in SecondArray)  {
                if (Array.isArray(SecondArray[Elem]) && SecondArray[Elem].length === 2) {
                  var Path = '';
                  // Pour gérer les fichiers avec un espace
                  for (var Ind = 1; Ind < SecondArray[Elem].length; Ind++) {
                    Path += SecondArray[Elem][Ind];
                  }
                  Final.push({ status: SecondArray[Elem][0], path: Path});
                } else {
                  break;
                }
              }
              resolve({...commitInfo[0], files: Final});
          })
          .catch(() => reject());
        }).catch(() => reject());
    });
  }

  commitChanges(summary: string, description: any) {
    this.gitP.commit(summary + '\n\n' + description).then(() => {
      this.updateFilesDiff();
    });
    this.revParseHEAD().then((data) => {
      this.rightPanelService.setCommitHash(data.replace('\n', ''));
    });
    this.rightPanelService.setView(true);
  }

  checkChanges() {
    if (this.rightPanelService.listUnstagedFiles.length + this.rightPanelService.listStagedFiles.length
        < 1) {
      this.revParseHEAD().then((data) => {
        this.rightPanelService.setCommitHash(data.replace('\n', ''));
      });
      this.rightPanelService.setView(true);
    }
  }

  /* Fonction merge branche */
  mergeBranches(mergeBranchName: string, fullPath: string) {
    return new Promise<ServiceResult>((resolve, reject) => {
      if (this.branchName !== mergeBranchName) {
        var CommitMessage = 'Merge Branch ' + mergeBranchName + ' into ' + this.branchName;
        gitPromise(fullPath).raw(['merge', mergeBranchName, '-m', CommitMessage])
          .then(() => {
            this.gitP.commit('Merge branch \'' + mergeBranchName + '\' into ' + this.branchName)
              .then(() => {
                resolve(new ServiceResult(true, this.translate.instant('SUCCESS'),
                  this.translate.instant('BRANCH.DONE')));
              })
              .catch((err) => {
                var ErrMsg = 'BRANCH.ERROR_MERGE';
                console.log(err);
                var AccessDenied = false;
                if (err.toString().includes('Committing is not possible because you have unmerged files')) {
                  ErrMsg = 'BRANCH.CONFLICTED';
                }
                reject(new ServiceResult(false, this.translate.instant('ERROR'),
                    this.translate.instant(ErrMsg), AccessDenied));
              });
          })
          .catch((err) => {
            reject(new ServiceResult(false, this.translate.instant('ERROR'),
                this.translate.instant('BRANCH.ERROR_MERGE')));
          });
      } else {
        reject(new ServiceResult(false, this.translate.instant('ERROR'),
            this.translate.instant('BRANCH.MERGE_CURRENT')));
      }
    });
  }
}
