const pokedex = document.getElementById('pokedex');

const fetchPokemon = async () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const response = await fetch(url)
        const data = response.json();
        promises.push(data);
    }
    // console.log(promises[0].then((pokemon) => pokemon.name));
    
    Promise.all(promises).then((pokemon) => {
        const pokemons = pokemon.map(({name, sprites, types, id}) => ({
            name,
            image: sprites['front_default'],
            type: types.map((type) => type.type.name).join(' | '),
            id
        }));
        displayPokemon(pokemons);
    });
};

const displayPokemon = (pokemons) => {
    // console.log(pokemon[0]);
    const pokemonHTMLString = pokemons
        .map(
            ({name, id, type, image}) => `
        <li class="card">
            <img class="card-image" src="${image}"/>
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">Type: ${type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
