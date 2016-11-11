import LanguageLink, {mapFilteredLangs} from './LanguageLink.jsx';
import createInput from './FilterInput.jsx';
import {compose, map, filter} from './utils.js';
import {selectLang, openPopup, closePopup, filterLangs} from './store.js';

const INITIAL_OPTS = {
    classes: '',
    selectedLangClasses: 'selected-lang',
    selectionContainerClass: '',
    inputClasses: '',
    inputSpanClasses: '',
    langSelectionClasses: 'lang-selection',
    simulate: false,
    popupCloseDelay: -1,
    showInput: true,
    enableDuplicates: true,
    filterNavigatorLanguages: false,
    highlightNavigatorLanguages: true
};

const createCloser = (dispatcher, except) => {
    const closer = (e) => {
        if(!e.path) {
            e.path = [e.target];
        }
        if(e.path.indexOf(except) === -1) {
            dispatcher(closePopup());
            document.removeEventListener('click',closer);
        }
    };
    return closer;
};

const LanguageSwitcher = (props) => {
    const opts = Object.assign({}, INITIAL_OPTS, props.opts);
    let closer = null;
    let to = null;

    const clicker = () => props.dispatch(openPopup());

    const mouseEnterer = () => {
        document.removeEventListener('click',closer);
        closer = null;
        if(to) {
            clearTimeout(to);
            to = null;
        }
    };

    const mouseLeaver = (e) => {
        closer = createCloser(props.dispatch, e.target);
        document.addEventListener('click', closer);
        if(!!~opts.popupCloseDelay) {
            to = setTimeout(() => {
                props.dispatch(closePopup());
                document.removeEventListener('click',closer);
            }, opts.popupCloseDelay);
        }
    };

    const linkClick = (e) => {
        if(opts.simulate) {
            e.preventDefault();
            return false;
        }
    };

    const input = createInput({props,opts});

    const getHightlightedLangs = compose(
        filter((lang) => opts.highlightNavigatorLanguages),
        filter((lang) => !!~navigator.languages.indexOf(lang.id.toLowerCase())),
        filter((lang) => !opts.filterNavigatorLanguages || new RegExp('^'+props.langFilter,'i').test(lang.id) || new RegExp('^'+props.langFilter,'i').test(lang.title) || new RegExp('^'+props.langFilter,'i').test(lang.name)),
        mapFilteredLangs({
            style: {
                fontWeight: 'bold'
            },
            clickHandler: linkClick
        })
    );

    const getLangs = compose(
        filter((lang) => opts.enableDuplicates || !opts.highlightNavigatorLanguages || !~navigator.languages.indexOf(lang.id.toLowerCase())),
        filter((lang) => new RegExp('^'+props.langFilter,'i').test(lang.id) || new RegExp('^'+props.langFilter,'i').test(lang.title) || new RegExp('^'+props.langFilter,'i').test(lang.name)),
        mapFilteredLangs({
            clickHandler: linkClick
        })
    );

    return (<div className={(Array.isArray(opts.classes)) ? opts.classes.join(' ') : opts.classes} onClick={clicker} onMouseEnter={mouseEnterer} onMouseLeave={mouseLeaver}>
        <div className={(Array.isArray(opts.selectedLangClasses)) ? opts.selectedLangClasses.join(' ') : opts.selectedLangClasses}>
            <LanguageLink lang={props.langs.reduce((carry, lang) => {
                if(!carry && lang.id.toUpperCase() === props.selectedLang.toUpperCase()) {
                    return lang;
                }
                return carry;
            }, null)} />
        </div>
        <div className={(Array.isArray(opts.selectionContainerClass)) ? opts.selectionContainerClass.join(' ') : opts.selectionContainerClass} style={{
                display: props.opened ? '' : 'none'
            }}>
            {input}
            <ul className={(Array.isArray(opts.langSelectionClasses)) ? opts.langSelectionClasses.join(' ') : opts.langSelectionClasses}>
                {getHightlightedLangs(props.langs)}
                {getLangs(props.langs)}
            </ul>
        </div>
    </div>);
};

export default ReactRedux.connect((state) => state)(LanguageSwitcher);