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
    console.log(electronPath);
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

describe('Test open repository', function () {
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
    
    it('should open the repository', function() {
        /*var btn = app.client.waitUntilWindowLoaded().element('#project-manager');
        btn.click();*/
        return app.client.waitUntilWindowLoaded()
            .click('#project-manager')
            .click('#mat-tab-label-0-0')
            .setValue('.open-input input', 'toto')
            .waitUntilTextExists()
            .element('.open-browse input').isEnabled().should.be.equal(true);
        //console.log(t);
        /*var openTab = app.client.waitUntilWindowLoaded().element('#mat-tab-label-0-0');
        openTab.click();*/
        // var input = app.client.waitUntilWindowLoaded().element('.open-input input');
        // input.setValue('toto');
        //return app.client.waitUntilWindowLoaded().element('.open-input input').getValue().should.be.equal('toto');
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
});