import './IE-navigator-languages-polyfill.js';

const {render} = ReactDOM;
const {createStore} = Redux;
const {Provider} = ReactRedux;

import LanguageSwitcher from './LanguageSwitcher.jsx';
import reducer , {selectLang,initLangs} from './store.js';

export default (lang, languages, target, opts = {}) => {
    const store = createStore(reducer);
    store.dispatch(selectLang(lang));
    store.dispatch(initLangs(languages.sort((a,b) => (a.id > b.id))));
    render(
        <Provider store={store}>
            <LanguageSwitcher opts={opts} />
        </Provider>,
        target
    );
};