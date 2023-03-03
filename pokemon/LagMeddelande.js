//Medelande som visar ut pokémon i laget
const LagSpelare = () =>{
  let antalSpelare = document.querySelectorAll(".team-ul .li-pokemons").length
  let reservSpelare = document.querySelectorAll(".reserv-ul .li-pokemons").length
  let teamMessage = document.getElementById('minst-antal-spelare')
 
if (antalSpelare < 3){
    teamMessage.innerHTML = `Du behöver minst 3 pokémon för att kunna spela du har ${ antalSpelare }`
  }else  {
    teamMessage.innerHTML = `Du har ${ antalSpelare} Pokémon i huvudlaget <br> Samt ${reservSpelare} Pokémon i reserv`
  }

}
			

export {LagSpelare}