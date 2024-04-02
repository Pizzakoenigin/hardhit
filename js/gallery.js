'use strict';

const pathToLoadGallery = '/assets/data/bands.json';
const imgDescArray = []

const renderGallery = contents => {
    contents.bandNames.sort((a, b) => {
        return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
    })
    for (let sec of contents.bandNames) {
        if (sec.images) {
            create(sec.name, 'h2', elements.gallery, false)
            let divEl = create(false, 'div', elements.gallery, 'bandImg')
            for (let img of sec.images) {
                imgDescArray.push(sec.name)
                const imgEl = create(false, 'img', divEl,);
                imgEl.src = img.source;
            }
        }
    }
    handleSlidshow();
}

const handleSlidshow = () => {
    // let imagesSlideShow = 
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
}

document.addEventListener('DOMContentLoaded', initGallery)