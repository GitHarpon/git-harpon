const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
var expect = require('chai').expect;

require('mocha-sinon');
const chaiAsPromised = require('chai-as-promised');
const name = require('../package.json').name;
const version = require('../package.json').version;

if (process.platform === 'linux') {
    electronPath = path.join(__dirname, '..', 'release', `${name}-${version}.AppImage`);
} else if (process.platform === 'darwin') {
    electronPath = path.join(__dirname, '..', 'release', `${name}.app/Contents/MacOS/${name}`);
} else if (process.platform === 'win32') {
    electronPath = path.join(__dirname, '..', 'release', `${name}-${version}.exe`);
}

var appPath = path.join(__dirname, '..');

var app = new Application({
    path: electronPath,
    args: [appPath]
});

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('Test term-1', function () {
    beforeEach(function () {
        var log = console.log;
        this.sinon.stub(console, 'log').callsFake( function() {
          return log.apply(log, arguments);
        });
        return app.start();
    });
  
    afterEach(function () {
        return app.stop();
    });

    it('Ouverture terminal', function () {
        var btn = app.client.element('#terminal-opener');
        btn.click();

        const util = require('util');
        const exec = util.promisify(require('child_process').exec);

        async function lsExample() {
            var command;
            if (process.platform === 'linux') {
                command = 'ps -aux | grep "[' + localStorage.getItem('terminalName').substr(0,1) + ']' 
                  + localStorage.getItem('terminalName').substr(1) + '"';
                console.log('ps -aux | grep "[' + test.substr(0,1) + ']' + test.substr(1) + '"');


            } else if (process.platform === 'darwin') {
                command = 'ps -A -ww | grep [^]]' + localStorage.getItem('terminalName');
            } else if (process.platform === 'win32') {
                command = 'tasklist | findstr "' + localStorage.getItem('terminalName') + '"';
            }
            
            const { stdout, stderr } = await exec('command');

            return stdout.length;
        }
        var length = lsExample();
        expect(length).to.be.not.equal(0);
    });
});