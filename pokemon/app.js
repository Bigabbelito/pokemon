// Hämta element från DOM
const searchInput = document.getElementById('search-pokemon');
const pokemonList = document.getElementById('pokemon-ul');
const teamList = document.getElementById('team-ul');
const teamMessage = document.getElementById('team-message');
const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-button');

// Skapa variabler för att spåra det nuvarande laget
let team = [];

// Funktion för att hämta data från API:et
async function fetchPokemonData(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Funktion för att visa sökresultat
async function displayPokemonList(pokemonArray) {
  pokemonList.innerHTML = '';
  pokemonArray.forEach (async pokemon => {
    let image = await getImage(pokemon.url);
    console.log(image);
    const li = document.createElement('li');
    let img = document.createElement('img')
    img.src=image
    li.appendChild(img)
    li.innerHTML += pokemon.name;
    li.addEventListener('click', () => addPokemonToTeam(pokemon));
    pokemonList.appendChild(li);
  });
}
async function getImage(url){
    let response = await fetch(url)
    let data = await response.json()
    return await data.sprites.front_default
}
// Funktion för att söka efter Pokémons
async function searchPokemon() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length === 0) {
    return;
  }
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
  const data = await response.json();
  const pokemonArray = data.results.filter(pokemon => {
    return pokemon.name.includes(searchTerm.toLowerCase());
  });
  displayPokemonList(pokemonArray);
}

// Funktion för att lägga till en Pokémon till laget
function addPokemonToTeam(pokemon) {
  if (team.length >= 3) {
    teamMessage.textContent = 'Du har redan tre ordinarie medlemmar i ditt lag.';
    return;
  }
  team.push(pokemon);
  teamMessage.textContent = '';
  displayTeam();
}

// Funktion för att ta bort en Pokémon från laget
function removePokemonFromTeam(index) {
  team.splice(index, 1);
  displayTeam();
}

// Funktion för att visa laget
function displayTeam() {
  teamList.innerHTML = '';
  team.forEach((pokemon, index) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    const button = document.createElement('button');
    button.textContent = 'Ta bort';
    button.addEventListener('click', () => removePokemonFromTeam(index));
    li.appendChild(img);
    li.appendChild(button);
    teamList.appendChild(li);
  });
}

// Funktion för att rensa hela laget
function clearTeam() {
  team = [];
  displayTeam();
}

// Lyssna efter händelser
searchInput.addEventListener('input', searchPokemon);
addButton.addEventListener('click', () => searchPokemon());
clearButton.addEventListener('click', clearTeam);

