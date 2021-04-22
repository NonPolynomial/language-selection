type State = {
  langs: {
    id: string;
    name: string;
    title: string;
    url: string;
  }[];
  opened: boolean;
  langFilter: string;
  selectedLang: string;
};

type Action =
  | { type: 'open_popup' | 'close_popup' }
  | { type: 'init_langs'; langs: State['langs'] }
  | { type: 'filter_langs'; langFilter: State['langFilter'] }
  | { type: 'select_lang'; selectedLang: State['selectedLang'] };

export const initialState: State = {
  langs: [],
  opened: false,
  langFilter: '',
  selectedLang: '',
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'open_popup':
      return { ...state, opened: true };
    case 'close_popup':
      return { ...state, opened: false };
    case 'init_langs':
      return {
        ...state,
        langs: action.langs!.sort((a, b) => Number(a.id > b.id)),
      };
    case 'filter_langs':
      return { ...state, langFilter: action.langFilter };
    case 'select_lang':
      return { ...state, selectedLang: action.selectedLang };
    default:
      return state;
  }
};
