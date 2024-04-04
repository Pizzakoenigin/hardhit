'use strict';
const pathToLoadGallery = '/assets/data/bands.json';
const imgDescArray = []

const renderGallery = contents => {
    contents.bandNames.sort((a, b) => {
        return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
    })
    const letters = []

    for (let sec of contents.bandNames) {
        if (sec.images) {
            const firstLetter = sec.name.charAt(0)
            if (!letters[firstLetter]) {
                let letterEl = create(firstLetter, 'a', elements.gallery, 'letterNav');
                letters[firstLetter] = letterEl;
                letterEl.href = `#${firstLetter}`;
            }
        }
    }

    for (let sec of contents.bandNames) {
        if (sec.images) {
            let bandEl = create(false, 'div', elements.gallery, `bandEl`)
            bandEl.id = sec.name;
            let headerEl = create(sec.name, 'h2', bandEl, false);
            headerEl.id = sec.name.charAt(0);
            create(sec.description, 'p', bandEl, 'description');
            let divEl = create(false, 'div', bandEl, `bandImg `);

            for (let img of sec.images) {
                imgDescArray.push(sec.name)
                const imgEl = create(false, 'img', divEl,);
                imgEl.src = img.source;
            }
        }
    }
    handleSlidshow();
    handleSearch();
}

const handleSlidshow = () => {
    let arrayImages = Array.from(document.querySelectorAll('.bandImg img'));
    let currentImageIndex = 0;
    arrayImages.forEach((img) => {
        img.addEventListener('click', () => {
            document.querySelector('#slideshow').style.display = "block";
            document.querySelector('#slideshow').style.backgroundImage = `url('${img.src}')`;
            currentImageIndex = arrayImages.indexOf(img);
            elements.imgDescText.innerText = `${imgDescArray[currentImageIndex]}`
            document.querySelector('#slideshow').style.backgroundPosition = "center";
            document.querySelector('#slideshow').style.backgroundRepeat = "no-repeat";
            document.querySelector('#slideshow').style.backgroundSize = "contain";
            document.querySelector('#container').style.display = "none";
        })
    })

    document.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "Escape":
                document.querySelector('#slideshow').style.display = "none";
                document.querySelector('#container').style.display = "block";
                break;
            case "ArrowRight":
                currentImageIndex++;
                if (currentImageIndex >= arrayImages.length) {
                    currentImageIndex = 0
                }
                document.querySelector('#slideshow').style.backgroundImage = `url('${arrayImages[currentImageIndex].src}')`;
                elements.imgDescText.innerText = `${imgDescArray[currentImageIndex]}`
                break;
            case "ArrowLeft":
                currentImageIndex--;
                if (currentImageIndex < 0) {
                    currentImageIndex = arrayImages.length - 1
                }
                document.querySelector('#slideshow').style.backgroundImage = `url('${arrayImages[currentImageIndex].src}')`;
                elements.imgDescText.innerText = `${imgDescArray[currentImageIndex]}`
                break;
        }
    })

    let closingButton = document.querySelector('#closingBtn');
    let prevButton = document.querySelector('#prevBtn');
    let nextButton = document.querySelector('#nextBtn');

    closingButton.addEventListener('click', () => {
        document.querySelector('#slideshow').style.display = "none";
        document.querySelector('#container').style.display = "block";
    })

    prevButton.addEventListener('click', () => {
        currentImageIndex--;
        console.log(currentImageIndex);
        if (currentImageIndex < 0) {
            currentImageIndex = arrayImages.length - 1
        }
        document.querySelector('#slideshow').style.backgroundImage = `url('${arrayImages[currentImageIndex].src}')`;
        elements.imgDescText.innerText = `${imgDescArray[currentImageIndex]}`
    })

    nextButton.addEventListener('click', () => {
        currentImageIndex++;
        console.log(currentImageIndex);
        if (currentImageIndex >= arrayImages.length) {
            currentImageIndex = 0
        }
        document.querySelector('#slideshow').style.backgroundImage = `url('${arrayImages[currentImageIndex].src}')`;
        elements.imgDescText.innerText = `${imgDescArray[currentImageIndex]}`
    })
}

const handleSearch = () => {
    let searchbar = document.querySelector('#searchBand');
    let searchButton = document.querySelector('#searchButton')
    let bandDivs = document.querySelectorAll('.bandEl');
    let foundElements = [];
    searchButton.addEventListener('click', () => {
        for (let i = 0; i < bandDivs.length; i++) {
            if (searchbar.value.toLowerCase() == bandDivs[i].id.toLowerCase()) {
                bandDivs[i].style.display = 'block'
                document.querySelector('#nothingFoundMessage').innerHTML = ''
            }

            else {
                bandDivs[i].style.display = 'none'
                document.querySelector('#nothingFoundMessage').innerHTML = ''
                foundElements.push(i)
            }
        }
        if (foundElements.length === bandDivs.length) {
            document.querySelector('#nothingFoundMessage').innerHTML = 'nothing found'
        }
    }
    )
}

const handleLoad = evt => {
    let xhr = evt.target;
    if (xhr.status == 200) {
        const contents = JSON.parse(xhr.response);
        renderGallery(contents);
    } else {
        console.warn(xhr.statusText, xhr.responseURL);
    }
}

const initGallery = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', pathToLoadGallery);
    xhr.addEventListener('load', handleLoad);
    xhr.send();

    elements.gallery = document.querySelector('#gallery')
    elements.imgDescText = document.querySelector('#imgDescription')
    elements.content = document.querySelector('main')
}

document.addEventListener('DOMContentLoaded', initGallery)