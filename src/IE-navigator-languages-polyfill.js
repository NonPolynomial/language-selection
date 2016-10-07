'use strict';
var getLangFromLocaleString = function(localeStr) {
    var lang = /^(.{2})\-.{2}$/g.exec(localeStr);
    if (lang) {
        return lang[1];
    }
    return false;
};

if (!navigator.languages) {
    navigator.languages = (function() {
        var langs = [];
        var lang;
        if (navigator.language) {
            langs.push(navigator.language);
            lang = getLangFromLocaleString(navigator.language);
            if (lang) {
                langs.push(lang);
            }
        } else if (navigator.userLanguage) {
            langs.push(navigator.userLanguage);
            lang = getLangFromLocaleString(navigator.userLanguage);
            if (lang) {
                langs.push(lang);
            }
        } else if (navigator.browserLanguage) {
            langs.push(navigator.browserLanguage);
            lang = getLangFromLocaleString(navigator.browserLanguage);
            if (lang) {
                langs.push(lang);
            }
        }
        return langs;
    })();
}