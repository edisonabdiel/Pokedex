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

    function add(pokemon) { typeof (pokemon) === typeof (pokemonArr) ? pokemonArr.push(pokemon) : "Not a valid data type" }

    function getAll(){ return pokemonArr};

    // Filters the list by name and returns the object that gets closer to the search input 

    findPokemon = () => pokemonArr.filter((pokemon) => new RegExp('Lu').test(pokemon.name))

    return {
        add: add,
        getAll: getAll
    };
})();

//iterates through each position of the index, checking to meet the conditions by using a forEach()

pokemonRep.getAll().forEach((pokemon) => {
    pokemon.height >= 2 ? document.write('<p>' + pokemon.name + " : " + pokemon.height + " That's a big pokemon!" + '</p>') : document.write('<p>' + pokemon.name + " : " + pokemon.height + '</p>')
});


console.log(pokemonRep.add({
    name: 'Lugia',
    height: 1.6,
    weight: 52.6,
    types: ['legendary', 'shock']
}));

console.log(findPokemon());

console.log(pokemonRep.getAll())
