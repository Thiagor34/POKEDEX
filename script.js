let pesquisa = document.querySelector('.input-pesquisa')
let imagem = document.querySelector('.poke-imagem')
let imagemFundo = document.querySelector('.poke-img')
let form = document.querySelector('.formulario')
let pokeId = document.querySelector('.id')
let pokeName = document.querySelector('.poke-name')
let pokeType = document.querySelector('.poke-type')
let pokeHeight = document.querySelector('.poke-height')
let pokeWeight = document.querySelector('.poke-weight')
let attack = document.querySelector('.res-a')
let defense = document.querySelector('.res-d')
let speed = document.querySelector('.res-s')
let hp = document.querySelector('.res-h')
let specialAttack = document.querySelector('.res-sa')
let specialDefense = document.querySelector('.res-sd')
let metros = 0
let kilos = 0
let buttonAnterior = document.getElementById('btn-a')
let buttonProximo = document.getElementById('btn-p')
let currentPokemonNumber = ""
const maxPokemonNumber = 1010

document.addEventListener('DOMContentLoaded', () => {
    getApi('1', 1); // chama getApi() com o primeiro Pokemon sempre que página carregar
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const pokemonNameOrId = pesquisa.value.toLowerCase();
    if (isNaN(pesquisa)) {
        getApi(pokemonNameOrId, 1);
    } else {
        getApi(pokemonNameOrId);
    }
})

buttonAnterior.addEventListener('click', () => {
    currentPokemonNumber--;
    getApi(currentPokemonNumber.toString());
});

buttonProximo.addEventListener('click', () => {
    currentPokemonNumber++;
    getApi(currentPokemonNumber.toString());
});

async function getApi(pokemon) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let data = await response.json();

    console.log(data);
    imagem.innerHTML = `<img src="${data.sprites.versions['generation-v']['black-white'].animated.front_default}">`;
    pokeId.innerHTML = `<h1> #${data.id}</h1>`
    pokeName.innerHTML = `<p> ${data.name.toUpperCase()}</p>`
    pokeType.innerHTML = `<p> ${data.types[0].type.name.toUpperCase()}</p>`
    metros = data.height / 10
    pokeHeight.innerHTML = `<p> ${metros}m</p>`
    kilos = data.weight / 10
    pokeWeight.innerHTML = `<p> ${kilos}kg</p>`
    hp.innerHTML = `${data.stats[0].base_stat}`
    attack.innerHTML = `${data.stats[1].base_stat}`
    defense.innerHTML = `${data.stats[2].base_stat}`
    specialAttack.innerHTML = `${data.stats[3].base_stat}`
    specialDefense.innerHTML = `${data.stats[4].base_stat}`
    speed.innerHTML = `${data.stats[5].base_stat}`

    switch (data.types[0].type.name) {
        case 'grass':
            imagemFundo.style.backgroundColor = '#78C850';
            break;
        case 'fire':
            imagemFundo.style.backgroundColor = '#F08030';
            break;
        case 'water':
            imagemFundo.style.backgroundColor = '#6890F0';
            break;
        case 'bug':
            imagemFundo.style.backgroundColor = '#A8B820';
            break;
        case 'normal':
            imagemFundo.style.backgroundColor = '#A8A878';
            break;
        case 'poison':
            imagemFundo.style.backgroundColor = '#A040A0';
            break;
        case 'electric':
            imagemFundo.style.backgroundColor = '#F8D030';
            break;
        case 'ground':
            imagemFundo.style.backgroundColor = '#E0C068';
            break;
        case 'fairy':
            imagemFundo.style.backgroundColor = '#EE99AC';
            break;
        case 'flying':
            imagemFundo.style.backgroundColor = '#A890F0';
            break;
        case 'fighting':
            imagemFundo.style.backgroundColor = '#C02038';
            break;
        case 'psychic':
            imagemFundo.style.backgroundColor = '#F85888';
            break;
        case 'rock':
            imagemFundo.style.backgroundColor = '#B8A038';
            break;
        case 'steel':
            imagemFundo.style.backgroundColor = '#B8B8D0';
            break;
        case 'ice':
            imagemFundo.style.backgroundColor = '#ADE0E0';
            break;
        case 'ghost':
            imagemFundo.style.backgroundColor = '#705898';
            break;
        case 'dragon':
            imagemFundo.style.backgroundColor = '#7038F8';
            break;
        case 'dark':
            imagemFundo.style.backgroundColor = '#705848';
            break;
        default:
            imagemFundo.style.backgroundColor = 'white';
            break;
    }

    if (data.id === 1) { // verifica se for o primeiro pokemon, oculta botão anterior
        buttonAnterior.style.display = 'none';
    } else {
        buttonAnterior.style.display = 'block';
    }

    if (data.id === maxPokemonNumber) { // verifica se for o ultimo pokemon, oculta botão próximo
        buttonProximo.style.display = 'none';
    } else {
        buttonProximo.style.display = 'block';
    }

    currentPokemonNumber = data.id

}

