const results = document.querySelector("#results");
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const modalContent = document.getElementById("modal_content");

getPeople();

// Fetching & displaying data (people) from Star Wars API
async function getPeople() {
  const allUrl = [];
  const people = [];
  const pages = 9;
  for (let i = 1; i <= pages; i++) {
    let url = `https://swapi.dev/api/people/?page=${i}`;
    allUrl.push(url);
  }

  const promises = allUrl.map((url) => fetch(url));

  for await (const res of promises) {
    const data = await res.json();
    data.results.map((item) => people.push(item));
  }

  const listOfCharacters = document.createElement("ul");
  listOfCharacters.id = "characterList";
  for (let i = 0; i < people.length; ++i) {
    let listItem = document.createElement("li");

    listItem.classList.add("character");
    listItem.innerHTML = people[i].name;
    listItem.addEventListener("click", function () {
      infoBox(people[i]);
    });
    listOfCharacters.appendChild(listItem);
  }
  results.appendChild(listOfCharacters);
  return people;
}

// Showing additional info about a specific character
function infoBox(character) {
  modalContent.innerHTML = 
                    `<div class='modalIndex'>
                    <h3 class="characher_name">${character.name}</h3>
                    <ul>Gender: ${character.gender}</ul>
                    <ul>Height: ${character.height} cm</ul>
                    <ul>Mass: ${character.mass} kg</ul>
                    <ul>Birthyear: ${character.birth_year}</ul>
                    <ul>Eye color: ${character.eye_color}</ul>
                    <ul>Skin color: ${character.skin_color}</ul>
                    </div>`;
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Search bar
function searchFunction() {
  let input = document.getElementById("input");
  let filter = input.value.toUpperCase();
  let ul = document.getElementById("characterList");
  let li = ul.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    let txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
