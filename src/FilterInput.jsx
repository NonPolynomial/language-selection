import {create} from 'react/lib/ReactFragment';
import {filterLangs} from './store.js';

const createInput = ({props, opts} = {}) => {
    if(!opts.showInput) {
        return [];
    }
    return create({
        input: <input className={(Array.isArray(opts.inputClasses)) ? opts.inputClasses.join(' ') : opts.inputClasses} type="text" onKeyUp={(e) => props.dispatch(filterLangs(e.target.value))} />,
        inputSpan: <span className={(Array.isArray(opts.inputSpanClasses)) ? opts.inputSpanClasses.join(' ') : opts.inputSpanClasses}></span>
    });
};

export default createInput;