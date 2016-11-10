'use strict';
import LanguageLink from './LanguageLink.jsx';
import {create} from 'react/lib/ReactFragment';
import {selectLang, openPopup, closePopup, filterLangs} from './store.js';

const INITIAL_OPTS = {
    classes: '',
    selectedLangClasses: 'selected-lang',
    selectionContainerClass: '',
    inputClasses: '',
    inputSpanClasses: '',
    langSelectionClasses: 'lang-selection',
    simulate: false,
    popupCloseDelay: 250,
    showInput: true,
    enableDuplicates: true,
    filterNavigatorLanguages: false
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

const createInput = ({props, opts} = {}) => {
    if(!opts.showInput) {
        return [];
    }
    return create({
        input: <input className={(Array.isArray(opts.inputClasses)) ? opts.inputClasses.join(' ') : opts.inputClasses} type="text" onKeyUp={(e) => props.dispatch(filterLangs(e.target.value))} />,
        inputSpan: <span className={(Array.isArray(opts.inputSpanClasses)) ? opts.inputSpanClasses.join(' ') : opts.inputSpanClasses}></span>
    });
};

const LanguageSwitcher = (props) => {
    const opts = Object.assign({}, INITIAL_OPTS, props.opts);
    let closer = null;

    const clicker = () => props.dispatch(openPopup());

    const mouseEnterer = () => {
        document.removeEventListener('click',closer);
        closer = null;
    };

    const mouseLeaver = (e) => {
        closer = createCloser(props.dispatch, e.target);
        document.addEventListener('click', closer);
    };

    const linkClick = (e) => {
        if(opts.simulate) {
            e.preventDefault();
            return false;
        }
    };

    const input = createInput({props,opts});

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
                {
                    props.langs
                    .filter((lang) => !!~navigator.languages.indexOf(lang.id.toLowerCase()))
                    .filter((lang) => !opts.filterNavigatorLanguages || new RegExp('^'+props.langFilter,'i').test(lang.id) || new RegExp('^'+props.langFilter,'i').test(lang.title) || new RegExp('^'+props.langFilter,'i').test(lang.name))
                    .map((lang, index) => (<li style={{
                        fontWeight: 'bold'
                    }} key={index}>
                        <LanguageLink onClick={linkClick} lang={lang} />
                    </li>))
                }
                {
                    props.langs
                    .filter((lang) => opts.enableDuplicates || !~navigator.languages.indexOf(lang.id.toLowerCase()))
                    .filter((lang) => new RegExp('^'+props.langFilter,'i').test(lang.id) || new RegExp('^'+props.langFilter,'i').test(lang.title) || new RegExp('^'+props.langFilter,'i').test(lang.name))
                    .map((lang, index) => (<li key={index}>
                        <LanguageLink onClick={linkClick} lang={lang} />
                    </li>))
                }
            </ul>
        </div>
    </div>);
};

export default ReactRedux.connect((state) => state)(LanguageSwitcher);