'use strict';

const pathToLoadAlbums = '/assets/data/albums.json'

const renderAlbums = contents => {
    create("About me", 'h2', document.querySelector('main'), false)
    create("My Name is Franziska, i am German and I love music.", 'p', document.querySelector('main'), false)
    let favouriteContainer = create(false, 'div', document.querySelector('main'), 'favourite')

    for (const album of contents.albums){
        let elementAlbum = create(false, 'article', favouriteContainer, 'elementAlbum');
        let albumImage = create(false, 'img', elementAlbum, 'albumImage')
        albumImage.src = album.cover

        let albumContainer = create(false, 'div', elementAlbum, 'album')
        let elementAlbumText = create(false, 'div', albumContainer, 'description')

        create(album.position, 'span', elementAlbumText)
        create(album.artist + '<br>' + album.title, 'h3', elementAlbumText)
  
        // create(album.title, 'h3', elementAlbumText)
        create(album.description, 'p', albumContainer)
        

    }
}

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