//initial array 

let pokemonList = [
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

// refactoring the pokemonList arr into a IIFE format

pokemonRep = (() => {
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

    add = (pokemon) => typeof(pokemon) === typeof(pokemonArr) ? pokemonArr.push(pokemon) : "Not a valid data type";

    getAll = () => pokemonArr;

    return {
        add: add,
        getAll: getAll
    };
})();

// Filters the list by name and returns the object that gets closer to the search input 

findPokemon = () => pokemonList.filter((pokemon) => new RegExp('Mol').test(pokemon.name))

//iterates through each position of the index, checking to meet the conditions by using a forEach()

pokemonList.forEach((pokemon) => {
   pokemon.height >= 2 ? document.write('<p>' + pokemon.name + " : " + pokemon.height + " That's a big pokemon!" + '</p>') : document.write('<p>' + pokemon.name + " : " + pokemon.height + '</p>')
});


console.log(add({
    name: 'Lugia',
    height: 1.6,
    weight: 52.6,
    types: ['legendary', 'shock']
}));

console.log(findPokemon());
