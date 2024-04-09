const handleSearch = () => {
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
