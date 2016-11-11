import {closePopup} from './store.js';
import {compose, map, filter} from './utils.js';

const preventClickEvent = (e) => {
    e.preventDefault();
    return false;
};

const LanguageLink = (props) => {
    return (<a onClick={props.onClick || preventClickEvent} href={props.lang.url} title={props.lang.title}>{props.lang.name}</a>);
};

export const mapFilteredLangs = ({style = {}, clickHandler = () => {}}) => map((lang, index) => (<li style={style} key={index}>
    <LanguageLink onClick={clickHandler} lang={lang} />
</li>));

export default LanguageLink;