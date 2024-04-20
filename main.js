const cardContainer = document.querySelector(".cardContainer");
const btnSearch = document.querySelector("#btn-search");
const input = document.querySelector("#input");

const cardTemplate = (input) => {
  const stats = input.stats
    .map(
      (stat) =>
        `<li class="stat-list"><span class="stat-key">${stat.stat.name}:</span> <span class="stat-value">${stat.base_stat}</span></li>`
    )
    .join(" ");

  const abilities = input.abilities
    .map((ability) => `<li class="ab-list">${ability.ability.name}</li>`)
    .join(" ");

  return `<div class="container">
                <div class="img-container">
                   <img src="${input.sprites.front_shiny}" alt="${input.name}" />
                </div>
                <p class="pokemonName">${input.name}</p>
                <ul class="ul-style">
                <p class="titles">STATUS</p>
                ${stats}</ul>
                
                <ul class="ul-abilities-style">
                <p class="titles">ABILITIES</p>
                ${abilities}</ul>
               
            </div>`;
};

const renderCard = (character) => {
  cardContainer.innerHTML += cardTemplate(character);
};

const clearInputAndPlaceholder = () => {
  input.value = "";
};

const getACharacter = (e) => {
  e.preventDefault();
  console.log(input);
  cardContainer.innerHTML = "";
  fetch(`https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}`)
    .then((res) => res.json())
    .then((pokemon) => {
      console.log(pokemon);
      renderCard(pokemon);
      clearInputAndPlaceholder();
    })
    .catch((err) => {
      alert("Empty field or there is not Pokemon with this name, try again!");
      clearInputAndPlaceholder();
      console.log(err);
    });
};

btnSearch.addEventListener("click", getACharacter);

const playAudio = () => {
  const audio = document.querySelector("embed");
  audio.play();
};

window.addEventListener("load", playAudio);
