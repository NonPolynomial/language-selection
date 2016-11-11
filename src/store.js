const INITIAL = {
    langs: [],
    opened: false,
    langFilter: ''
};

export let openPopup = () => ({
    type: 'OPEN_POPUP'
});

export let closePopup = () => ({
    type: 'CLOSE_POPUP'
});

export let initLangs = (langs) => ({
    type: 'INIT_LANGS',
    langs
});

export let filterLangs = (str) => ({
    type: 'FILTER_LANGS',
    str
});

export let selectLang = (lang) => ({
    type: 'SELECT_LANG',
    lang
});

export default (state = INITIAL, action) => {
    switch(action.type) {
        case 'OPEN_POPUP':
            return Object.assign({}, state, {
                opened: true
            });
        case 'CLOSE_POPUP':
            return Object.assign({}, state, {
                opened: false
            });
        case 'INIT_LANGS':
            return Object.assign({}, state, {
                langs: action.langs
            });
        case 'FILTER_LANGS':
            return Object.assign({}, state, {
                langFilter: action.str
            });
        case 'SELECT_LANG':
            return Object.assign({}, state, {
                selectedLang: action.lang
            });
        default:
            return state;
    }
};