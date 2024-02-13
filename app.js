document.addEventListener('DOMContentLoaded', async () => {
    const previewContainer = document.getElementById('pokemon-preview');
    const outputTextArea = document.getElementById('output');

    // Function to fetch random Pokemon
    async function getRandomPokemon(type) {
        const response = await pokeAPI.getPokemonsList({
            limit: 200,
        });

        const fullyEvolvedPokemon = response.results.filter(pokemon => !pokemon.name.includes('-'));
        const randomIndex = Math.floor(Math.random() * fullyEvolvedPokemon.length);
        const randomPokemon = fullyEvolvedPokemon[randomIndex];

        const pokemonDetails = await pokeAPI.getPokemonByName(randomPokemon.name);

        if (type === 'all' || pokemonDetails.types.some(pokemonType => pokemonType.type.name === type)) {
            return {
                name: pokemonDetails.name,
                image: pokemonDetails.sprites.front_default,
            };
        } else {
            return getRandomPokemon(type);
        }
    }

    // Function to generate and display Pokemon
    async function generatePokemon(type) {
        const pokemon1 = await getRandomPokemon(type);
        const pokemon2 = await getRandomPokemon(type);
        const pokemon3 = await getRandomPokemon(type);

        // Display preview
        previewContainer.innerHTML = `
            <img src="${pokemon1.image}" alt="${pokemon1.name}">
            <img src="${pokemon2.image}" alt="${pokemon2.name}">
            <img src="${pokemon3.image}" alt="${pokemon3.name}">
            <div>${pokemon1.name}</div>
            <div>${pokemon2.name}</div>
            <div>${pokemon3.name}</div>
        `;

        // Display output in textarea
        outputTextArea.value = `
            ${pokemon1.name}
            ${pokemon2.name}
            ${pokemon3.name}
        `;
    }

    // Add event listeners to buttons
    document.getElementById('allBtn').addEventListener('click', () => generatePokemon('all'));
    document.getElementById('fireBtn').addEventListener('click', () => generatePokemon('fire'));
    document.getElementById('waterBtn').addEventListener('click', () => generatePokemon('water'));

    // Initial generation on page load
    generatePokemon('all');
});
