document.addEventListener('DOMContentLoaded', () => {
    const previewContainer = document.getElementById('pokemon-preview');
    const outputTextArea = document.getElementById('output');

    async function generatePokemon(type) {
        const pokemon1 = await getRandomPokemon(type);
        const pokemon2 = await getRandomPokemon(type);
        const pokemon3 = await getRandomPokemon(type);

        // Display preview
        previewContainer.innerHTML = `
            <img src="${pokemon1.image}" alt="${pokemon1.name}">
            <img src="${pokemon2.image}" alt="${pokemon2.name}">
            <img src="${pokemon3.image}" alt="${pokemon3.name}">
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
