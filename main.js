let pokemonList = document.querySelector("#pokedex");
const prevButton$$ = document.querySelector('#prevBtn');
const nextButton$$ = document.querySelector('#nextBtn');
const input$$ = document.querySelector('[data-function="searcher"]');
const input2$$ = document.querySelector('[data-function="filter"]');  
const btnfliterWater$$ = document.querySelector('[data-type="water"]');
const btnfliterElectric$$ = document.querySelector('[data-type="electric"]');
const btnfliterFighting$$ = document.querySelector('[data-type="fighting"]');
const btnfliterRock$$ = document.querySelector('[data-type="rock"]');
btnfliterWater$$.addEventListener('click', filterWater);
btnfliterElectric$$.addEventListener('click', filterElectric);
btnfliterFighting$$.addEventListener('click', filterFighting);
btnfliterRock$$.addEventListener('click', filterRock);
prevButton$$.addEventListener('click', prevPage);
nextButton$$.addEventListener('click', nextPage);
input$$.addEventListener('input', findPokemon);
input2$$.addEventListener('input', findType);


const defaultUrl = "https://pokeapi.co/api/v2/pokemon/";
let prevUrl = null;
let nextUrl = null;
let counter = 0;
let pokemonToShow = 150;
let pokemonNameList = [];


const getAllPokemon = async (url) => {
  pokemonList.innerHTML = '';
  const response = await fetch(url);
  const data = await response.json(); 
  updatePagination(data)
  const pokemons = data.results;

  for(let pokemon of pokemons){
    if (counter >= pokemonToShow){
      break;
    }
    let pokemonData = await fetchPokemonDetails(pokemon.url);
    displayPokemon(pokemonData);
    counter++
  }
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  return await response.json();
}

function displayPokemon(pokemon) {
  const listItem = document.createElement('div');
  listItem.classList.add('item');
  listItem.setAttribute('data-aos', 'fade-up');
  listItem.innerHTML = `
    <p class="name">${pokemon.name}</p> 
    <p class="id">${pokemon.id}</p>  
    <img class="poke-img" src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
    <p class="type">${pokemon.types[0].type.name}</p> 
  `;
 
  pokemonList.appendChild(listItem);
}

function updatePagination(data) {
  prevUrl = data.previous;
  nextUrl = data.next;

  if (prevUrl === null) {
    prevButton$$.setAttribute('disabled', 'disabled');
  } else {
    prevButton$$.removeAttribute('disabled');
  }
  if (!nextUrl === null || counter >= 140) {
    nextButton$$.setAttribute('disabled', 'disabled');
  } else {
    nextButton$$.removeAttribute('disabled');
  }
}

function prevPage() {
  if (prevUrl !== null) {
    counter -= 40;
    getAllPokemon(prevUrl);
  }
}

function nextPage() {
  if (nextUrl !== null) {
    getAllPokemon(nextUrl);
  }
}

function findPokemon () {
  let search = this.value.toLowerCase();
  let pokemonSearch = pokemonNameList.filter(pokemon =>
  pokemon.name.includes(search));
  
  pokemonList.innerHTML = '';
  for (const pokemon of pokemonSearch){
    displayPokemon(pokemon)
  }
}

function findType (){
  let search = this.value.toLowerCase();
  let pokemonSearch = pokemonNameList.filter(pokemon =>
  pokemon.types[0].type.name.includes(search));
  
  pokemonList.innerHTML = '';
  for (const pokemon of pokemonSearch){
    displayPokemon(pokemon)
  }
}

const getChararcter = async() => {
  for(let i = 1; i < 151; i++){
      const response = await fetch(defaultUrl + i);
      const res = await response.json();
      pokemonNameList.push(res)    
    } 
}

getChararcter();
console.log(pokemonNameList);

function filterWater (){
  const waterPokemon = pokemonNameList.filter(pokemon => {
    return pokemon.types.some(type => type.type.name.toLowerCase() === 'water');
  });

  pokemonList.innerHTML = '';
  for (const pokemon of waterPokemon) {
    displayPokemon(pokemon);
  }
}

function filterElectric (){
  const electricPokemon = pokemonNameList.filter(pokemon => {
    return pokemon.types.some(type => type.type.name.toLowerCase() === 'electric');
  });

  pokemonList.innerHTML = '';
  for (const pokemon of electricPokemon) {
    displayPokemon(pokemon);
  }
}

function filterFighting (){
  const fightingPokemon = pokemonNameList.filter(pokemon => {
    return pokemon.types.some(type => type.type.name.toLowerCase() === 'fighting');
  });

  pokemonList.innerHTML = '';
  for (const pokemon of fightingPokemon) {
    displayPokemon(pokemon);
  }
}

function filterRock (){
  const rockPokemon = pokemonNameList.filter(pokemon => {
    return pokemon.types.some(type => type.type.name.toLowerCase() === 'rock');
  });

  pokemonList.innerHTML = '';
  for (const pokemon of rockPokemon) {
    displayPokemon(pokemon);
  }
}

filterWater();
filterElectric();
filterFighting();
filterRock();

getAllPokemon(defaultUrl);
