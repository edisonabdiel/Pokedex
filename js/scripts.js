// refactoring the pokemonList arr into a IIFE format
let pokemonRep = (() => {
    let pokemonArr = [
        {
            name: 'Articuno',
            height: 1.7,
            weight: 55.4,
            types: ['legendary', 'ice']
        },
        {
            name: 'Zapdos',
            height: 1.6,
            weight: 52.6,
            types: ['legendary', 'shock']
        },
        {
            name: 'Moltres',
            height: 2,
            weight: 60,
            types: ['legendary', 'fire']
        }
    ];

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
        button.addEventListener('click', showDetails(pokemon));
    };

    let showDetails = (pokemon) => console.log(pokemon);

    return {
        add: add,
        getAll: getAll,
        findPokemon: findPokemon,
        addListItem: addListItem,
    };
})();

//iterates through each position of the index

pokemonRep.getAll().forEach((pokemon) => pokemonRep.addListItem(pokemon));

//adds a new pokemon to the array

pokemonRep.add({
    name: 'MeowTwo',
    height: 2,
    weight: 60,
    types: ['legendary', 'fire']
});

console.log(pokemonRep.getAll());
