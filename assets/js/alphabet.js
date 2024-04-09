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
        // let bandLink = create(false, 'a', articles[firstChar], `bandLink`)
        let elementBand = create(band.name, 'li', articles[firstChar], `bandEl`);
        elementBand.id = band.name.toLowerCase();
        // bandLink.href = band.name
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
    textSearch();
}

const textSearch = () => {
    let searchbar = document.querySelector('#searchBand');
    let searchButton = document.querySelector('#searchButton')
    let bandDivs = document.querySelectorAll('.bandEl');


    searchbar.addEventListener('input', () => {
        searchbar.value = searchbar.value.replace(/[^A-Za-z0-9]/g, '');
    })

    searchButton.addEventListener('click', () => {
        let foundElements = [];
        for (let i = 0; i < bandDivs.length; i++) {
            if (searchbar.value.toLowerCase() == bandDivs[i].id.toLowerCase()) {
                let offset = 100; //necessary bc of the sticky header
                let targetElement = bandDivs[i];
                let targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                })
                bandDivs[i].style.transition = 'background-color 0.6s ease-in-out, color 0.6s ease-in-out, padding 0.6s ease-in-out';
                bandDivs[i].style.backgroundColor = 'red';
                bandDivs[i].style.color = 'white'
                bandDivs[i].style.padding = '0.2em'
                setTimeout(() => {
                    bandDivs[i].style.backgroundColor = 'transparent';
                    bandDivs[i].style.color = 'black'
                    bandDivs[i].style.padding = '0'
                }, 3000)
            }

            else {
                document.querySelector('#nothingFoundMessage').innerHTML = '';
                foundElements.push(i)
            }
        }
        if (foundElements.length === bandDivs.length) {
            console.log('check');
            document.querySelector('#nothingFoundMessage').innerHTML = `haven't seen that band (yet)`;
            create('reset', 'button', document.querySelector('#nothingFoundMessage'), 'resetButton');
            handleReset();
        }
    }
    )

    const handleReset = () => {
        let resetButton = document.querySelector('#nothingFoundMessage');
        resetButton.addEventListener('click', () => {
            location.reload()
        })
    }
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