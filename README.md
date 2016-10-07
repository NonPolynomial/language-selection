# Language Selection

![ECMAScript 6](https://img.shields.io/badge/ECMAScript-6-green.svg)
![mit-license](https://img.shields.io/badge/License-MIT-blue.svg)

Library for creating language selections

## Usage

### HTML

e.g. 
```html
<div id="app"></div>
```

### JavaScript

e.g.
```js
createLanguageSelection('de', [
    {
        id: 'EN',
        title: 'English',
        name: 'English',
        url:'/en'
    },
    {
        id: 'DE',
        title: 'Deutsch',
        name: 'Deutsch',
        url:'/de'
    },
], document.querySelector('#app'), opts);
```

### Options

```js
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
    // classes for selection list
    langSelectionClasses: 'lang-selection',
    // if set to true, click events are prevented
    simulate: false
}
```

## Dependencies
<a id="dependencies"></a>

* react
* react-addons-create-fragment
* react-dom
* redux
* react-redux

## Build

`npm run build` creates 4 files

* `language_selection.js` - standalone lib with all dependencies
* `language_selection.min.js` - minified version of `language_selection.js`
* `language_selection-lib-only.js` - lib without dependencies (minified)
                                     you have to include the [dependencies](#dependencies) by yourself
* `language_selection-with-polyfills.min.js` - like `language_selection.min.js`, just with [Babel Polyfill][babel-polyfill]

## License

This project is licensed under the terms of the MIT license.

The full license text can be found in [LICENSE](./LICENSE).

[babel-polyfill]: https://babeljs.io/docs/usage/polyfill/