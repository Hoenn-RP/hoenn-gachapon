document.addEventListener('DOMContentLoaded', () => {
    const previewContainer = document.getElementById('pokemon-preview');
    const outputTextArea = document.getElementById('output');

    // Add event listeners to buttons
    document.getElementById('allBtn').addEventListener('click', () => generatePokemon('all'));
    document.getElementById('fireBtn').addEventListener('click', () => generatePokemon('fire'));
    document.getElementById('waterBtn').addEventListener('click', () => generatePokemon('water'));
    // Add more types as needed

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

    // Initial generation on page load
    generatePokemon('all');
});
