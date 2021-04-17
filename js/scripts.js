// IIFE format
let pokemonRep = (() => {

    let pokemonArr = [];

    // API

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //adds a new pokemon to the array

    let add = (pokemon) => { (typeof (pokemon) === 'object') ? pokemonArr.push(pokemon) : console.log("Not a valid data type") };

    //returns the whole array

    let getAll = () => pokemonArr;

    // Filters the list by name and returns the object that gets closer to the search input 

    let findPokemon = () => { pokemonArr.filter((pokemon) => new RegExp('Lu').test(pokemon.name)) }

    //creates a button for each pokemon and shows its details on click

    let addListItem = (pokemon) => {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class', 'btn', 'btn-outline-dark');
        // button.setAttribute('data-toggle', modal);
        button.setAttribute('data-target', pokeModal);
        listItem.appendChild(button);
        listItem.classList.add('group-list-item');
        pokeList.appendChild(listItem);
        button.addEventListener('click', () => { showDetails(pokemon) });
    };

    //show pokemon details on click of the button

    let showDetails = (pokemon) => {
        loadDetails(pokemon).then(() => {
            showModal(pokemon);
            console.log(pokemon)
        });
    };

    //fetches data from the poke API and loads it into the (pokemon) token

    let loadList = () => {
        return fetch(apiUrl).then((res) => {
            return res.json();
        }).then((json) => {
            json.results.forEach((item) => {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch((e) => {
            console.error(e);
        })
    };

    //loads the details of a singular pokemon

    let loadDetails = (item) => {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // creates, renders and then hides a modal 

    // let modalContainer = document.createElement('div');
    // modalContainer.setAttribute('id', 'modal-container');

    const showModal = (pokemon) => {

        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalBody.empty();
        modalTitle.empty();

        let nameElement = $('<h1>' + pokemon.name + '</h1>');

        let imgElement = $('<img>');
        imgElement.addClass('modal-img', 'img-fluid');
        imgElement.attr('src', pokemon.imageUrl);

        let heightElement = $('<p>' + "height: " + pokemon.height + '</p>');
        let typesElement = $('<ul>' + "types: " + pokemon.types + '</ul>');
        typesElement.addClass('list-unstyled');
        let weightElement = $('<p>' + "weight: " + pokemon.weight + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imgElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);

        





        // Clear all existing modal content
        // modalContainer.innerHTML = '';

        // let modal = document.createElement('div');
        // modal.classList.add('modal');

        // // Add the new modal content
        // let closeButtonElement = document.createElement('button');
        // closeButtonElement.classList.add('modal-close', 'btn', 'btn-outline-danger');
        // closeButtonElement.innerText = 'X';
        // closeButtonElement.addEventListener('click', hideModal);

        // let titleElement = document.createElement('h1');
        // titleElement.innerText = pokemon.name;

        // let contentElement = document.createElement('p');
        // contentElement.innerText = "height:" + pokemon.height;

        // let imgElement = document.createElement('img');
        // let pokeImg = pokemon.imageUrl;
        // imgElement.setAttribute('src', pokeImg)
        // imgElement.setAttribute('alt', pokemon.name)

        // modal.appendChild(closeButtonElement);
        // modal.appendChild(titleElement);
        // modal.appendChild(contentElement);
        // modal.appendChild(imgElement);
        // modalContainer.appendChild(modal);
        
        // modalContainer.classList.add('is-visible');

        // document.querySelector('.flex-container').appendChild(modalContainer);
    }

    

    let hideModal = () => {
        document.querySelector('.flex-container').removeChild(modalContainer)
    }

    document.querySelector('.flex-container').appendChild(modalContainer)

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });


    return {
        add: add,
        getAll: getAll,
        findPokemon: findPokemon,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

//iterates through each position of the index

pokemonRep.loadList().then(() => {
    pokemonRep.getAll().forEach((pokemon) => pokemonRep.addListItem(pokemon));
})

//adds a new pokemon to the array

pokemonRep.add({
    name: 'Lugia',
    height: 2,
    weight: 60,
    types: ['legendary', 'fire']
});


console.log(pokemonRep.getAll());
