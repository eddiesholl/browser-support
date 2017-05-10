const useragent = require('useragent');
require('useragent/features');

const versionCheck = require('./version-check');

module.exports = function(browserVersions, matchOptions) {
    const versionChecker = versionCheck(browserVersions, matchOptions);
    return function(req, res, next) {
        const source = req.headers['user-agent'];
        const ua = useragent.parse(source);

        req.useragent = ua;

        const isSupported = versionChecker(ua);
        req.isBrowserSupported = isSupported;
        next();
    };
};
