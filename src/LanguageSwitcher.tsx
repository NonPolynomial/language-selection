import React, {
  BaseSyntheticEvent as Event,
  FC,
  useEffect,
  useReducer,
  useRef,
} from 'react';

import LanguageLink from './LanguageLink';
import { initialState, reducer } from './store';

type Language = {
  id: string;
  name: string;
  title: string;
  url: string;
};

type LanguageSwitcherProps = {
  options?: {
    classes?: string[];
    selectedLangClasses?: string[];
    selectionContainerClasses?: string[];
    inputClasses?: string[];
    inputSpanClasses?: string[];
    langSelectionClasses?: string[];
    simulate?: boolean;
    popupCloseDelay?: number;
    showInput?: boolean;
    enableDuplicates?: boolean;
    filterNavigatorLanguages?: boolean;
    highlightNavigatorLanguages?: boolean;
  };
  langs: Language[];
  langFilter?: string;
  opened?: boolean;
  selectedLang: string;
};

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  options: {
    classes = [],
    selectedLangClasses = ['selected-lang'],
    selectionContainerClasses = [],
    inputClasses = [],
    inputSpanClasses = [],
    langSelectionClasses = ['lang-selection'],
    simulate = false,
    showInput = true,
    enableDuplicates = true,
    filterNavigatorLanguages = false,
    highlightNavigatorLanguages = true,
  } = {},
  langFilter,
  langs,
  opened,
  selectedLang,
}) => {
  const langSwitchRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    langs,
    selectedLang,
    opened: opened ?? false,
    langFilter: langFilter ?? '',
  });

  useEffect(() => {
    const closer = (e: MouseEvent) => {
      if (!e.defaultPrevented) {
        dispatch({ type: 'close_popup' });
      }
    };

    if (state.opened) {
      document.addEventListener('click', closer);
    }

    return () => {
      if (state.opened) {
        document.removeEventListener('click', closer);
      }
    };
  }, [state.opened]);

  const highlightedLanguageLinks = state.langs
    .filter(() => highlightNavigatorLanguages)
    .filter((lang) => !!~navigator.languages.indexOf(lang.id.toLowerCase()))
    .filter(
      (lang) =>
        !filterNavigatorLanguages ||
        new RegExp('^' + state.langFilter, 'i').test(lang.id) ||
        new RegExp('^' + state.langFilter, 'i').test(lang.title) ||
        new RegExp('^' + state.langFilter, 'i').test(lang.name),
    )
    .map((lang, index) => (
      <li style={{ fontWeight: 'bold' }} key={index}>
        <LanguageLink
          onClick={(e) => {
            if (simulate) {
              e.preventDefault();
            }
            dispatch({
              type: 'select_lang',
              selectedLang: lang.id.toLowerCase(),
            });
          }}
          lang={lang}
        />
      </li>
    ));

  const languageLinks = langs
    .filter(
      (lang) =>
        enableDuplicates ||
        !highlightNavigatorLanguages ||
        !~navigator.languages.indexOf(lang.id.toLowerCase()),
    )
    .filter(
      (lang) =>
        new RegExp('^' + state.langFilter, 'i').test(lang.id) ||
        new RegExp('^' + state.langFilter, 'i').test(lang.title) ||
        new RegExp('^' + state.langFilter, 'i').test(lang.name),
    )
    .map((lang, index) => (
      <li key={index}>
        <LanguageLink
          onClick={(e) => {
            if (simulate) {
              e.preventDefault();
            }
            dispatch({
              type: 'select_lang',
              selectedLang: lang.id.toLowerCase(),
            });
          }}
          lang={lang}
        />
      </li>
    ));

  const selectedLanguage = state.langs.reduce<Language | null>(
    (carry, lang) => {
      if (
        !carry &&
        lang.id.toLowerCase() === state.selectedLang?.toLowerCase()
      ) {
        return lang;
      }
      return carry;
    },
    null,
  );
  return (
    <div
      className={classes.join(' ')}
      onClick={(e) => {
        if (!e.isDefaultPrevented()) {
          dispatch({ type: state.opened ? 'close_popup' : 'open_popup' });
        }
      }}
      ref={langSwitchRef}
    >
      <div className={selectedLangClasses.join(' ')}>
        {selectedLanguage && <LanguageLink lang={selectedLanguage} />}
      </div>
      <div
        className={selectionContainerClasses.join(' ')}
        style={{
          display: state.opened ? '' : 'none',
        }}
      >
        {showInput && (
          <>
            <input
              className={inputClasses.join(' ')}
              type="text"
              onClick={(e) => {
                e.preventDefault();
              }}
              onKeyUp={(e: Event) =>
                dispatch({ type: 'filter_langs', langFilter: e.target.value })
              }
            />
            <span className={inputSpanClasses.join(' ')}></span>
          </>
        )}
        <ul className={langSelectionClasses.join(' ')}>
          {highlightedLanguageLinks}
          {languageLinks}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
