const useragent = require('useragent');
require('useragent/features');

const versionCheck = require('./version-check');

module.exports = function(browserVersions) {
    const versionChecker = versionCheck(browserVersions);
    return function(req, res) {
        const source = req.headers['user-agent'];
        const ua = useragent.parse(source);

        req.useragent = ua;

        const isSupported = versionChecker(ua);
        req.isBrowserSupported = isSupported;
    };
};
