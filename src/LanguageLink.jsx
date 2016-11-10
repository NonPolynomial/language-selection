'use strict';
import {closePopup} from './store.js';

const preventClickEvent = (e) => {
    e.preventDefault();
    return false;
};

export default (props) => {
    return (<a onClick={props.onClick || preventClickEvent} href={props.lang.url} title={props.lang.title}>{props.lang.name}</a>);
};