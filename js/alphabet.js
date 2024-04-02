'use strict';

const pathToLoad = '/assets/data/bands.json';


const renderBands = contents => {
    contents.bandNames.sort((a, b) => {
        return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
    })

    const articles = [];

    for (const band of contents.bandNames) {
        const firstChar = band.name.charAt(0);
        if (!articles[firstChar]) {
            articles[firstChar] = create(false, 'article', elements.alphabetSection);
            create(firstChar, 'h2', articles[firstChar]);
        }
        let elementBand = create(band.name, 'li', articles[firstChar]);
        if (band.highlight) {
            elementBand.classList.add('highlight');
        }
        if (band.interviewLink) {
            create('<a href=' + band.interviewLink + '> Interview</a>', 'a', elementBand)
            elementBand.classList.add('video');
            articles[firstChar].classList.add('video');
        }
        if (band.videoLink) {
            create('<a href=' + band.videoLink + '> Live Video</a>', 'a', elementBand)
            elementBand.classList.add('video');
            articles[firstChar].classList.add('video');
        }
    }
    document.querySelector("#CountTotal").textContent = `That's a total of ${contents.bandNames.length} bands.`;
}

const handleClick = () => {
    const videosAr = document.querySelectorAll('article:not(.video)');
    const videoLi = document.querySelectorAll('li:not(.video)')

    videosAr.forEach(element => element.classList.toggle('hidden'));
    videoLi.forEach(element => element.classList.toggle('hidden'));

    document.querySelector("#CountTotal").classList.toggle('hidden')

    let ButtonText1 = "Show only bands with Video Content";
    let ButtonText2 = "Show all bands"

    if (showVideo.textContent === ButtonText1) {
        showVideo.textContent = ButtonText2;
    } else {
        showVideo.textContent = ButtonText1;
    }
}

const handleLoad = evt => {
    let xhr = evt.target;
    if (xhr.status == 200) {
        const contents = JSON.parse(xhr.response);
        renderBands(contents);
    } else {
        console.warn(xhr.statusText, xhr.responseURL);
    }
}

const initAlphabet = () => {
    elements.alphabetSection = document.querySelector('#alphabet');
    elements.showVideo = document.querySelector('#showVideo');

    const xhr = new XMLHttpRequest();
    xhr.open('get', pathToLoad);
    xhr.addEventListener('load', handleLoad);
    xhr.send();

    elements.showVideo.addEventListener('click', handleClick)
}

document.addEventListener('DOMContentLoaded', initAlphabet)