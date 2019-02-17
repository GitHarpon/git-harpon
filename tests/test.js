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

describe('Test Example', function () {
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
  
    it('opens a window', function () {
      return app.client.waitUntilWindowLoaded()
        .getWindowCount().should.eventually.equal(1);
    });
  
    it('tests the title', function () {
      return app.client.waitUntilWindowLoaded()
        .getTitle().should.eventually.equal('GitHarpon');
    });

    // it('test console.log', function() {
    //     app.client.getText('#content').then(function(text) {
    //         console.log(text);
    //     });
    //     return app.client.waitUntilWindowLoaded() 
    //         .getRenderProcessLogs().then((logs)  => { 
    //             expect( console.log.calledWith('coucou mon ptit pote') ).to.be.true;        
    //         });
    // });

    // it('test button change angular', function () {
    //     var btn = app.client.element('#btntest');
    //     var btntext = app.client.getText('#btntest').then(function(text){
    //         expect(text).to.be.equal('test1');
    //     });
    //     btn.click();
    //     btntext = app.client.getText('#btntest').then(function(text){
    //         expect(text).to.be.equal('test2');
    //     });
    // });

    it('Ouverture terminal', function () {
        var btn = app.client.element('#terminalOpener');
        btn.click();
        console.log('test');
        // btntext = app.client.getText('#btntest').then(function(text){
        //     expect(text).to.be.equal('test2');
        // });
    });
});