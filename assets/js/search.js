const handleSearch = () => {
    let searchbar = document.querySelector('#searchBand');
    let searchButton = document.querySelector('#searchButton')
    let bandDivs = document.querySelectorAll('.bandEl');


    searchbar.addEventListener('input', () => {
        searchbar.value = searchbar.value.replace(/[^A-Za-z0-9]/g, '');
    })

    searchButton.addEventListener('click', () => {
        // console.log(searchbar.value);
        let foundElements = [];
        for (let i = 0; i < bandDivs.length; i++) {
            // console.log(bandDivs[i].id);
            if (searchbar.value.toLowerCase() == bandDivs[i].id.toLowerCase()) {
                bandDivs[i].style.display = 'block';
                document.querySelector('#nothingFoundMessage').innerHTML = ''

            }

            else {
                bandDivs[i].style.display = 'none';
                document.querySelector('#nothingFoundMessage').innerHTML = '';
                foundElements.push(i)
            }
        }
        if (foundElements.length === bandDivs.length) {
            console.log('check');
            document.querySelector('#nothingFoundMessage').innerHTML = 'nothing found';
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
