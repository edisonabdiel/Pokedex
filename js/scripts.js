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
        document.write("<p>" + pokemonList[i].name + ' height: (' + pokemonList[i].height + ')' + " Wow! That's a big pokemon!" + "</p>")
    } else {
        document.write("<p>" + pokemonList[i].name + ' height: (' + `${pokemonList[i].height}` + ')' + "</p>")
    }
}

sum = (a, b) => a + b;

multiply = (a, b) =>  a * b;

substract = (a, b) =>  a - b;

divide = (a, b) => {
    return ((b === 0) ? "You're trying to divide by zero" : a / b); 
}

console.log(multiply(10, 20))

console.log(divide(70, 7))
