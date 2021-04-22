import React, { useRef, useReducer, useEffect } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var LanguageLink = function (_a) {
    var lang = _a.lang, onClick = _a.onClick;
    return (React.createElement("a", { onClick: onClick, href: lang.url, title: lang.title }, lang.name));
};

var initialState = {
    langs: [],
    opened: false,
    langFilter: '',
    selectedLang: '',
};
var reducer = function (state, action) {
    switch (action.type) {
        case 'open_popup':
            return __assign(__assign({}, state), { opened: true });
        case 'close_popup':
            return __assign(__assign({}, state), { opened: false });
        case 'init_langs':
            return __assign(__assign({}, state), { langs: action.langs.sort(function (a, b) { return Number(a.id > b.id); }) });
        case 'filter_langs':
            return __assign(__assign({}, state), { langFilter: action.langFilter });
        case 'select_lang':
            return __assign(__assign({}, state), { selectedLang: action.selectedLang });
        default:
            return state;
    }
};

var LanguageSwitcher = function (_a) {
    var _b = _a.options, _c = _b === void 0 ? {} : _b, _d = _c.classes, classes = _d === void 0 ? [] : _d, _e = _c.selectedLangClasses, selectedLangClasses = _e === void 0 ? ['selected-lang'] : _e, _f = _c.selectionContainerClasses, selectionContainerClasses = _f === void 0 ? [] : _f, _g = _c.inputClasses, inputClasses = _g === void 0 ? [] : _g, _h = _c.inputSpanClasses, inputSpanClasses = _h === void 0 ? [] : _h, _j = _c.langSelectionClasses, langSelectionClasses = _j === void 0 ? ['lang-selection'] : _j, _k = _c.simulate, simulate = _k === void 0 ? false : _k, _l = _c.showInput, showInput = _l === void 0 ? true : _l, _m = _c.enableDuplicates, enableDuplicates = _m === void 0 ? true : _m, _o = _c.filterNavigatorLanguages, filterNavigatorLanguages = _o === void 0 ? false : _o, _p = _c.highlightNavigatorLanguages, highlightNavigatorLanguages = _p === void 0 ? true : _p, langFilter = _a.langFilter, langs = _a.langs, opened = _a.opened, selectedLang = _a.selectedLang;
    var langSwitchRef = useRef(null);
    var _q = useReducer(reducer, __assign(__assign({}, initialState), { langs: langs,
        selectedLang: selectedLang, opened: opened !== null && opened !== void 0 ? opened : false, langFilter: langFilter !== null && langFilter !== void 0 ? langFilter : '' })), state = _q[0], dispatch = _q[1];
    useEffect(function () {
        var closer = function (e) {
            if (!e.defaultPrevented) {
                dispatch({ type: 'close_popup' });
            }
        };
        if (state.opened) {
            document.addEventListener('click', closer);
        }
        return function () {
            if (state.opened) {
                document.removeEventListener('click', closer);
            }
        };
    }, [state.opened]);
    var highlightedLanguageLinks = state.langs
        .filter(function () { return highlightNavigatorLanguages; })
        .filter(function (lang) { return !!~navigator.languages.indexOf(lang.id.toLowerCase()); })
        .filter(function (lang) {
        return !filterNavigatorLanguages ||
            new RegExp('^' + state.langFilter, 'i').test(lang.id) ||
            new RegExp('^' + state.langFilter, 'i').test(lang.title) ||
            new RegExp('^' + state.langFilter, 'i').test(lang.name);
    })
        .map(function (lang, index) { return (React.createElement("li", { style: { fontWeight: 'bold' }, key: index },
        React.createElement(LanguageLink, { onClick: function (e) {
                if (simulate) {
                    e.preventDefault();
                }
                dispatch({
                    type: 'select_lang',
                    selectedLang: lang.id.toLowerCase(),
                });
            }, lang: lang }))); });
    var languageLinks = langs
        .filter(function (lang) {
        return enableDuplicates ||
            !highlightNavigatorLanguages ||
            !~navigator.languages.indexOf(lang.id.toLowerCase());
    })
        .filter(function (lang) {
        return new RegExp('^' + state.langFilter, 'i').test(lang.id) ||
            new RegExp('^' + state.langFilter, 'i').test(lang.title) ||
            new RegExp('^' + state.langFilter, 'i').test(lang.name);
    })
        .map(function (lang, index) { return (React.createElement("li", { key: index },
        React.createElement(LanguageLink, { onClick: function (e) {
                if (simulate) {
                    e.preventDefault();
                }
                dispatch({
                    type: 'select_lang',
                    selectedLang: lang.id.toLowerCase(),
                });
            }, lang: lang }))); });
    var selectedLanguage = state.langs.reduce(function (carry, lang) {
        var _a;
        if (!carry &&
            lang.id.toLowerCase() === ((_a = state.selectedLang) === null || _a === void 0 ? void 0 : _a.toLowerCase())) {
            return lang;
        }
        return carry;
    }, null);
    return (React.createElement("div", { className: classes.join(' '), onClick: function (e) {
            if (!e.isDefaultPrevented()) {
                dispatch({ type: state.opened ? 'close_popup' : 'open_popup' });
            }
        }, ref: langSwitchRef },
        React.createElement("div", { className: selectedLangClasses.join(' ') }, selectedLanguage && React.createElement(LanguageLink, { lang: selectedLanguage })),
        React.createElement("div", { className: selectionContainerClasses.join(' '), style: {
                display: state.opened ? '' : 'none',
            } },
            showInput && (React.createElement(React.Fragment, null,
                React.createElement("input", { className: inputClasses.join(' '), type: "text", onClick: function (e) {
                        e.preventDefault();
                    }, onKeyUp: function (e) {
                        return dispatch({ type: 'filter_langs', langFilter: e.target.value });
                    } }),
                React.createElement("span", { className: inputSpanClasses.join(' ') }))),
            React.createElement("ul", { className: langSelectionClasses.join(' ') },
                highlightedLanguageLinks,
                languageLinks))));
};

export default LanguageSwitcher;
