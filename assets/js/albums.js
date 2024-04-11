'use strict';

const pathToLoadAlbums = '/assets/data/albums.json'

const renderAlbums = contents => {
    create("About me", 'h1', document.querySelector('.main'), false)
    create("My Name is Franziska, i am German and I love music.", 'p', document.querySelector('.main'), false)

    create("My 10 favourite albums", 'h1', document.querySelector('.main'), false)
    let favouriteContainer = create(false, 'div', document.querySelector('.main'), 'favourite')

    for (const album of contents.albums) {
        let elementAlbum = create(false, 'div', favouriteContainer, 'elementAlbum');
        let albumImage = create(false, 'img', elementAlbum, 'albumImage')
        albumImage.src = album.cover
        let albumContainer = create(false, 'div', elementAlbum, 'album')
        let elementAlbumText = create(false, 'div', albumContainer, 'description')

        create(album.position, 'span', elementAlbumText)
        create(album.artist + '<br>' + album.title, 'h3', elementAlbumText)
        create(album.description, 'p', albumContainer)
    }
    displayAlbums()
}

const displayAlbums = () => {
    const container = document.querySelector('.favourite');
    const elements = document.querySelectorAll('.elementAlbum');
    const scrollTop = container.scrollTop;

    document.addEventListener('scroll', () => {
        console.log('scrolling');
        console.log(window.scrollY, window.pageYOffset);



        elements[9].style.transform = `translateX(-${window.scrollY}px)`;





    })
}

// container.addEventListener('scroll', function() {
//     const scrollTop = container.scrollTop;
//     const containerHeight = container.clientHeight;

//     elements.forEach(function(element, index) {
//       const elementOffsetTop = element.offsetTop;
//       const translation = Math.max(0, scrollTop - elementOffsetTop + containerHeight);
//       element.style.transform = `translateX(-${translation}px)`;
//     });
//   });

//   console.log(scrollTop,elements.length);

//     for(let i = 0; i < elements.length; i ++){
//         elements[i].style.transform = `translateX(-${scrollTop}px)`;
//     }


//   elements.forEach(function(element, index) {
//     if (index === 0) {
//       element.style.transform = `translateX(-${scrollTop}px)`;
//     } else {
//       element.style.transform = 'translateX(0%)';
//     }
//   });
// });





// let albums = document.querySelectorAll('.elementAlbum')
// albums.forEach((album) => observer.observe(album))
// for (let i = 0; i < albums.length; i++){
//     albums.sstyle.zIndex = i;
// }


// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('stacked');
//             entry.target.classList.remove('removed');
//         } else {
//             entry.target.classList.add('removed');
//             entry.target.classList.remove('stacked');
//         }
//     })
// })

const handleLoad = evt => {
    let xhr = evt.target;
    if (xhr.status == 200) {
        const contents = JSON.parse(xhr.response);
        renderAlbums(contents);
    } else {
        console.warn(xhr.statusText, xhr.responseURL);
    }
}

const initAlbums = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', pathToLoadAlbums);
    xhr.addEventListener('load', handleLoad);
    xhr.send();
}

document.addEventListener('DOMContentLoaded', initAlbums)