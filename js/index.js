'use strict';

const pathToLoadPreview = '/assets/data/index.json';

const renderPreview = contents => {
    for (let sec of contents.sections){
        create(sec.title, 'h2', elements.teaser, false )
        create(sec.summary, 'p', elements.teaser, false)
        let downloadEl = create(' Download', 'a', elements.teaser, false)
        downloadEl.href = sec.download
        let divEl = create(false, 'div', elements.teaser, 'preview')
        for (let img of sec.images){
            const imgEl = create(false, 'img', divEl, 'previewImg');
            imgEl.src = img.source;
        }
    }
}

const handleLoadPreview = evt => {
    let xhr = evt.target;
    if (xhr.status == 200) {
        const contents = JSON.parse(xhr.response);
        renderPreview(contents);
    } else {
        console.warn(xhr.statusText, xhr.responseURL);
    }
}

const initPreview = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', pathToLoadPreview);
    xhr.addEventListener('load', handleLoadPreview);
    xhr.send();
    // elements.preview = document.querySelector('#five');
    elements.teaser = document.querySelector('#teaser')
}

document.addEventListener('DOMContentLoaded', initPreview)