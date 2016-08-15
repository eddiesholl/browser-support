const expect = require('chai').expect;
const versionCheck = require('../lib/version-check');
const useragent = require('useragent');
require('useragent/features');

const versionsChrome15 = {
    Chrome: '15.x'
};
const versionsChrome14 = {
    Chrome: '14.x'
};
const versionsFirefox20 = {
    Firefox: '20.x'
};

var sutChrome14;
var sutChrome15;
var sutMobileSafari;

const chrome15onMac = useragent.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.24 Safari/535.2');
const mobileSafari = useragent.parse('Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4');

beforeEach(function() {
    sutChrome14 = versionCheck(versionsChrome14);
    sutChrome15 = versionCheck(versionsChrome15);
    sutMobileSafariAndOthers = versionCheck(mobileSafari, {
        passOtherBrowsers: true
    });
});

describe('version-check', function() {
    it('handles null min versions', function() {
        const nullChecker = versionCheck();
        expect(nullChecker('foo')).to.be.false;
    });

    it('handles null agent string', function() {
        expect(sutChrome15(null)).to.be.false;
    });

    it('matches chrome simple', function() {
        expect(sutChrome15(chrome15onMac)).to.be.true;
    });

    it('fails safari vs chrome', function() {
        expect(sutChrome15(mobileSafari)).to.be.false;
    });

    it('fails chrome14 vs chrome15', function() {
        expect(sutChrome14(chrome15onMac)).to.be.false;
    });

    it('matches safari when not specified', function() {
        expect(sutMobileSafariAndOthers(chrome15onMac)).to.be.true;
    });
});
