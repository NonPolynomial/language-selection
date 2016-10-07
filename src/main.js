'use strict';
import './IE-navigator-languages-polyfill.js';

let {render} = ReactDOM;
let {createStore} = Redux;
let {Provider} = ReactRedux;

import LanguageSwitcher from './LanguageSwitcher.js';
import reducer , {selectLang,initLangs} from './store.js';

export default (lang, languages, target, opts = {}) => {
    let store = createStore(reducer);
    store.dispatch(selectLang(lang));
    store.dispatch(initLangs(languages.sort((a,b) => (a.id > b.id))));
    render(
        <Provider store={store}>
            <LanguageSwitcher opts={opts} />
        </Provider>,
        target
    );
};