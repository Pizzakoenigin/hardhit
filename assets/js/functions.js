'use strict';

const elements = {}

const create = (content = false, type = 'li', parent = false, className = false) => {
    const el = document.createElement(type);
    if (content) el.innerHTML = content;
    if (className) el.className = className;
    if (parent) parent.append(el);

    return el;
}