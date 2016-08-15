module.exports = function(browserVersions, matchOptions) {
    matchOptions = matchOptions || {};
    return function(userAgent) {
        if (!browserVersions || !userAgent) {
            return false;
        }

        const familyVersion = browserVersions[userAgent.family];

        if (!familyVersion) {
            return !!matchOptions.passOtherBrowsers;
        }

        var versionCheck;

        if (typeof familyVersion === 'string') {
            versionCheck = familyVersion;
        } else if (familyVersion.semver) {
            versionCheck = familyVersion.semver;
        }

        return userAgent.satisfies(versionCheck);
    };
};
