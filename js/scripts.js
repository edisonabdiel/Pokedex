// refactoring the pokemonList arr into a IIFE format
let pokemonRep = (() => {
    let pokemonArr = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //adds a new pokemon to the array

    function add(pokemon) { (typeof (pokemon) === 'object') ? pokemonArr.push(pokemon) : console.log("Not a valid data type") };

    //returns the whole array

    function getAll() { return pokemonArr };

    // Filters the list by name and returns the object that gets closer to the search input 

    function findPokemon() { pokemonArr.filter((pokemon) => new RegExp('Lu').test(pokemon.name)) }

    //creates a button for each pokemon and shows it's details on click

    function addListItem(pokemon) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
        button.addEventListener('click', function(){showDetails(pokemon)});
    };

    //show pokemon details on click of the button

    let showDetails = (pokemon) => {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
          });
    };

    //fetches data from the poke API and loads it into the (pokemon) token

    function loadList() {
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

    function loadDetails(item) {
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
