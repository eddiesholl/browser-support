const expect = require('chai').expect;
const supportedBrowsers = require('../lib');
const useragent = require('useragent');
require('useragent/features');

const versionsChrome15 = {
    Chrome: '15.x'
};
const versionsChrome14 = {
    Chrome: '14.x'
};

var sutChrome14;
var sutChrome15;
var sutMobileSafariAndOthers;
var sRes;
var sNext;
var sChrome15onMacReq;
var sMobileSafariReq;
var sNullUaReq;

beforeEach(function() {
    sNullUaReq = {
        headers: {
            'user-agent': null
        }
    };
    sMobileSafariReq = {
        headers: {
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4'
        }
    };
    sChrome15onMacReq = {
        headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.24 Safari/535.2'
        }
    };
    sNext = function(error) { expect(error).to.be.undefined; };
    sRes = {};
    sutChrome14 = supportedBrowsers(versionsChrome14);
    sutChrome15 = supportedBrowsers(versionsChrome15);
    sutMobileSafariAndOthers = supportedBrowsers(useragent.parse(sMobileSafariReq.headers['user-agent']), {
        passOtherBrowsers: true
    });
});

describe('supported-browsers', function() {
    it('handles null min versions', function() {
        const nullChecker = supportedBrowsers();
        nullChecker(sChrome15onMacReq, sRes, sNext);
        expect(sChrome15onMacReq.isBrowserSupported).to.be.false;
    });

    it('handles null agent string', function() {
        sutChrome15(sNullUaReq, sRes, sNext);
        expect(sNullUaReq.isBrowserSupported).to.be.false;
    });

    it('matches chrome simple', function() {
        sutChrome15(sChrome15onMacReq, sRes, sNext);
        expect(sChrome15onMacReq.isBrowserSupported).to.be.true;
    });

    it('fails safari vs chrome', function() {
        sutChrome15(sMobileSafariReq, sRes, sNext);
        expect(sMobileSafariReq.isBrowserSupported).to.be.false;
    });

    it('fails chrome14 vs chrome15', function() {
        sutChrome14(sChrome15onMacReq, sRes, sNext);
        expect(sChrome15onMacReq.isBrowserSupported).to.be.false;
    });

    it('matches safari when not specified', function() {
        sutMobileSafariAndOthers(sChrome15onMacReq, sRes, sNext);
        expect(sChrome15onMacReq.isBrowserSupported).to.be.true;
    });
});
