# Language Selection

![ECMAScript 6](https://img.shields.io/badge/ECMAScript-6-green.svg)
![mit-license](https://img.shields.io/badge/License-MIT-blue.svg)

Library for creating language selections

## Usage

```js
import LanguageSwitch from '@nonpolynomial/language-switch/lib/es'

/**
 * default options
 * @type {Object}
 */
let opts = {
    // classes for root element (app wrapper)
    classes: '',
    // classes for selected language wrapper
    selectedLangClasses: 'selected-lang',
    // classes for selection wrapper
    selectionContainerClass: '',
    // classes for filter input
    inputClasses: '',
    // added a span for e.g. search icons
    // classes for this span
    inputSpanClasses: '',
    // automatically close language selection on mouseleave after given number of milliseconds
    // -1 means disabled
    popupCloseDelay: -1,
    // classes for selection list
    langSelectionClasses: 'lang-selection',
    // show input for filter languages
    showInput: true,
    // filter highlighted languages
    filterNavigatorLanguages: false,
    // hightlight navigator languages, when found in given language array
    highlightNavigatorLanguages: true
    // show language links, even when its already highlighted as a navigator language
    enableDuplicates: true,
    // if set to true, click events are prevented
    simulate: false
};

<LanguageSwitch lang="de" langs={[{id: 'en', name: 'English', title: 'English', url: '#/en' }]} options={opts} />
```

## License

This project is licensed under the terms of the MIT license.

The full license text can be found in [LICENSE](./LICENSE).

[babel-polyfill]: https://babeljs.io/docs/usage/polyfill/
