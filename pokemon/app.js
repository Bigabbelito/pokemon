import {LagSpelare} from "./LagMeddelande.js";


// Hämta element från DOM
const searchInput = document.getElementById('search-pokemon');
const pokemonList = document.getElementById('pokemon-ul');
const teamList = document.getElementById('team-ul');
const reservList = document.querySelector('.reserv-ul');
const teamMessage = document.getElementById('team-message');
const clearButton = document.getElementById('clear-button');
const displayTeamButton = document.getElementById('display-team-button');
const liTeam = document.querySelector('.team-ul')
const teamSida2 = document.querySelector('#team')
const förstaSidan = document.querySelector('#pokemon-list')
const teamKnapp = document.querySelector('.selected')
const findKnapp = document.querySelector('.selected2')

teamSida2.style.display= "none"
förstaSidan.style.display= "block"
searchInput.style.display = "none"

teamKnapp.addEventListener("click", () =>{
	teamSida2.style.display= "block"
	förstaSidan.style.display= "none"
	searchInput.style.display = "none"

	LagSpelare()
})

findKnapp.addEventListener("click", () =>{
	teamSida2.style.display= "none"
	förstaSidan.style.display= "block"
	searchInput.style.display = "block"
})



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
		li.setAttribute("class", "li-pokemons")
		
		let img = document.createElement('img')
		img.src=image
		li.appendChild(img)
		li.innerHTML += pokemon.name;
		const läggTillSeplare = document.createElement("button")
		läggTillSeplare.setAttribute("class", "Lägg-till-spelare")
		läggTillSeplare.innerHTML = "Lägg till Pokémon"
		li.append(läggTillSeplare)
		
		pokemonList.appendChild(li);
		
		
		let taBortPokemon = document.createElement('button')
		taBortPokemon.innerHTML = "Kicka Pokemon"
		taBortPokemon.setAttribute("class", " ta-bortBtn")
		

		läggTillSeplare.addEventListener("click", () =>{
			let antalSpelare = document.querySelectorAll(".team-ul .li-pokemons").length
			console.log('läggTillSeplare button click', antalSpelare)
			LagSpelare()
			if (antalSpelare < 3){
				mittLagPoke(pokemon)				
			}else if(antalSpelare === 3){
				reservLagPoke(pokemon)	
			}		
		})
	});
}

const mittLagPoke = async (pokemon) =>{
	let image = await getImage(pokemon.url);
	const li = document.createElement('li');
	li.setAttribute("class", "li-pokemons")
	let img = document.createElement('img')
	img.src=image
	li.appendChild(img)
	let name = document.createElement('h3')
	name.innerHTML = pokemon.name;
	li.appendChild(name)
	
	let taBortPokemon = document.createElement('button')
	taBortPokemon.innerHTML = "Kicka Pokemon"
	taBortPokemon.setAttribute("class", " ta-bortBtn")
	li.append(taBortPokemon)
	
	let namnInput = document.createElement('input')
	namnInput.setAttribute("class", "change-name")
	li.appendChild(namnInput)
	namnInput.style.display = "none"
	let ändranam = document.createElement('button')
		ändranam.innerHTML = "Ändra Namn"
		ändranam.setAttribute("class", " changetBtn")
		ändranam.addEventListener("click",() =>{
			console.log(namnInput.value)
			namnInput.style.display = "block"
			namnInput.focus()
		} )
		namnInput.addEventListener("keydown", (e) => {
			if(e.key === "Enter"){
			
			name.innerHTML = namnInput.value
			namnInput.style.display = "none"
			namnInput.value = "";
			}
		})
		li.append(ändranam)

	teamList.append(li);
	taBortPokemon.addEventListener("click", () =>{
		li.remove()
		LagSpelare()
	})
	
}


const reservLagPoke = async (pokemon) =>{
	let image = await getImage(pokemon.url);
	const li = document.createElement('li');
	li.setAttribute("class", "li-pokemons")
	let img = document.createElement('img')
	img.src=image
	li.appendChild(img)
	let name = document.createElement('h3')
	name.innerHTML = pokemon.name;
	li.appendChild(name)
	
	let taBortPokemon = document.createElement('button')
	taBortPokemon.innerHTML = "Kicka Pokemon"
	taBortPokemon.setAttribute("class", " ta-bortBtn")
	li.append(taBortPokemon)
	
	let namnInput = document.createElement('input')
	namnInput.setAttribute("class", "change-name")
	li.appendChild(namnInput)
	namnInput.style.display = "none"
	let ändranam = document.createElement('button')
		ändranam.innerHTML = "Ändra Namn"
		ändranam.setAttribute("class", " changetBtn")
		ändranam.addEventListener("click",() =>{
			console.log(namnInput.value)
			namnInput.style.display = "block"
			namnInput.focus()
		} )
		namnInput.addEventListener("keydown", (e) => {
			if(e.key === "Enter"){
			
			name.innerHTML = namnInput.value
			namnInput.style.display = "none"
			namnInput.value = "";
			}
		})
		li.append(ändranam)
	
	reservList.appendChild(li);
	taBortPokemon.addEventListener("click", () =>{
		li.remove()
		LagSpelare()
	})
	
}
async function getImage(url){
	let response = await fetch(url)
	let data = await response.json()
	return await data.sprites.front_default
}


// Funktion för att söka efter Pokémons
async function searchPokemon() {
	pokemonList.innerHTML = "";
	const searchTerm = searchInput.value.trim();
	if (searchTerm.length === 3) {
		return;
	}
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
	const data = await response.json();
	const pokemonArray = data.results.filter(pokemon => {
		return pokemon.name.includes(searchTerm.toLowerCase());
	});
	displayPokemonList(pokemonArray);
}

// Lyssna efter händelser
searchInput.addEventListener('input', searchPokemon);