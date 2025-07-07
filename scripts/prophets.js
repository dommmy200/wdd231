async function getProphetsData() {
    const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
    const response = await fetch(url); // request
    const data = await response.json(); // parse the JSON data
    console.table(data.prophet); // temp output test of data response
    return data; // return the parsed data
}

const cards = document.querySelector('#prophetsCards');

function createProphetCard(prophet) {
    const card = document.createElement('section');
    card.classList.add('prophet-card');

    const name = document.createElement('h2');
    name.textContent = `${prophet.name} ${prophet.lastname}`;
    card.appendChild(name);

    const birthDate = document.createElement('p');
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    card.appendChild(birthDate);

    const birthPlace = document.createElement('p');
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
    card.appendChild(birthPlace);

    const image = document.createElement('img');
    image.setAttribute('src', prophet.imageurl);
    image.setAttribute('alt', `${prophet.name} ${prophet.lastname}`);
    card.appendChild(image);

    return card;
}
async function displayProphets() {
    const prophetsData = await getProphetsData();
    prophetsData.prophets.forEach(prophet => {
        const card = createProphetCard(prophet);
        cards.appendChild(card);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    displayProphets();
});