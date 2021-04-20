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
    let findPokemon = () => {
        let input, filter, ul, li, button, i, txtValue;
        input = document.getElementById("search-pokemon");
        filter = input.value.toUpperCase();
        ul = document.getElementById("pokemons");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            button = li[i].getElementsByTagName("button")[0];
            txtValue = button.textContent || button.innerText;
            if (txtValue.indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    } 
    //creates a button for each pokemon and shows its details on click
    let addListItem = (pokemon) => {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class', 'btn', 'btn-outline-dark');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokeModal');
        listItem.appendChild(button);
        listItem.classList.add('group-list-item');
        pokeList.appendChild(listItem);
        button.addEventListener('click', () => { showDetails(pokemon) });
    };
    //show pokemon details on click of the button
    let showDetails = (pokemon) => {
        loadPokemonData(pokemon).then(() => {
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

    let loadPokemonData = async (pokemon) => {
        // URL 1: https://pokeapi.co/api/v2/pokemon/[ID-Number] => ID, Name, Image, Height, Weight, Types
        const url = pokemon.detailsUrl;
        try {
            let response = await fetch(url);
            let details = await response.json();

            // Pokémon ID
            pokemon.id = details.id;
            // Pokémon Name
            pokemon.name = details.name;
            // Pokémon Image
            pokemon.imageUrl = details.sprites.other['official-artwork'].front_default;
            // Pokémon Height
            pokemon.height = details.height / 10 + " m";
            // Pokémon Weight
            pokemon.weight = details.weight  + " kgs";
            // Pokémon Types
            pokemon.types = [];
            details.types.forEach((e) => {
                pokemon.types.push(e.type.name)
            });
            // Pokémon Abilities
            pokemon.abilities = [];
            details.abilities.forEach((e) => {
                pokemon.abilities.push(e.ability.name);
            });

            // URL 2: https://pokeapi.co/api/v2/pokemon-species/[ID-Number] => Specie, Description
            const urlMoreData = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`;
            try {
                response = await fetch(urlMoreData);
                details = await response.json();

                // Pokémon Specie ([7] = English)
                pokemon.specie = details.genera[7].genus;
                // Pokémon Description
                const descriptionEng = details.flavor_text_entries.filter(
                    (pokedexEnglish) => pokedexEnglish.language.name === 'en',
                );
                pokemon.description = descriptionEng[
                    descriptionEng.length - 1
                ].flavor_text.replace(/[\n \f]/g, ' ');
            } catch (e) {
                console.error(e);
            }
        } catch (e) {
            console.error(e);
        }
    }
    // creates, renders and then hides a modal 
    let modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-container');

    const showModal = (pokemon) => {

        let detailsUrl = pokemon.detailsUrl;

        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalFooter = $('.modal-footer');

        modalBody.empty();
        modalTitle.empty();

        let nameElement = $('<h1>' + pokemon.name + '</h1>');

        let imgElement = $('<img>');
        imgElement.addClass('modal-img');
        imgElement.addClass('img-fluid');
        imgElement.attr('src', pokemon.imageUrl);

        let heightElement = $('<p>' + "height: " + pokemon.height + '</p>');
        let typesElement = $('<p>' + "types: " + pokemon.types + '</p>');
        let weightElement = $('<p>' + "weight: " + pokemon.weight + '</p>');
        let abilitiesElement = $('<p>' + "abilities: " + pokemon.abilities + '</p>') 

        modalTitle.append(nameElement);
        modalBody.append(imgElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);

    }

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
        loadPokemonData: loadPokemonData
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
