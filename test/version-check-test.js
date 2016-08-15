const expect = require('chai').expect;
const versionCheck = require('../lib/version-check');

describe('version-check', function() {
    it('handles null min versions', function() {
        const nullChecker = versionCheck();
        expect(nullChecker('foo')).to.be.false;
    });
});
