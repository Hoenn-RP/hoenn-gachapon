// Download the pokeapi.js-wrapper file and include it here.

// Example usage:
const pokeAPI = new Pokedex.Pokedex();

// Load excluded Pokemon from JSON file
async function loadExcludedPokemon() {
    const response = await fetch('excludedPokemon.json');
    const data = await response.json();
    return data.excluded;
}

let excludedPokemon;

// Initialize excludedPokemon on page load
loadExcludedPokemon().then(data => {
    excludedPokemon = data;
});

async function getRandomPokemon(type) {
    const response = await pokeAPI.getPokemonsList({
        limit: 200,  // Adjust as needed
    });

    const fullyEvolvedPokemon = response.results.filter(pokemon => !pokemon.name.includes('-') && !excludedPokemon.includes(pokemon.name));
    const randomIndex = Math.floor(Math.random() * fullyEvolvedPokemon.length);
    const randomPokemon = fullyEvolvedPokemon[randomIndex];

    const pokemonDetails = await pokeAPI.getPokemonByName(randomPokemon.name);

    // Check if the selected type matches the random Pokemon's type
    if (type === 'all' || pokemonDetails.types.some(pokemonType => pokemonType.type.name === type)) {
        return {
            name: pokemonDetails.name,
            image: pokemonDetails.sprites.front_default,
        };
    } else {
        // If the type doesn't match, recursively try again
        return getRandomPokemon(type);
    }
}
