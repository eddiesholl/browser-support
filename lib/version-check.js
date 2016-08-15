module.exports = function(browserVersions, matchOptions) {
    matchOptions = matchOptions || {};
    return function(userAgent) {
        if (!browserVersions || !userAgent) {
            return false;
        }

        const familyVersion = browserVersions[userAgent.family];
        const passBecauseUnknown = matchOptions.passOtherBrowsers && !familyVersion;

        if (passBecauseUnknown) {
            return true;
        }

        return userAgent.satisfies(familyVersion);
    };
};
