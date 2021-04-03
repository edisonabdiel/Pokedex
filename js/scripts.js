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

//iterates through each position of the index, checking to meet the conditions

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 2) {
        document.write(`${pokemonList[i].name + ' height: (' + `${pokemonList[i].height}` + ')' + " Wow! That's a big pokemon!"}`)
    } else {
        document.write(pokemonList[i].name + ' height: (' + `${pokemonList[i].height}` + ')')
    }
}
