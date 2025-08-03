async function readCardFile() {
  try {
    const response = await fetch("./data/members.json"); // Fetch the JSON file
    if (!response.ok) {
      throw new Error('Failed to fetch card data');
    }
    
    const data = await response.json();
    return data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw error; // Rethrow the error for handling by the caller
  }
}
function selectCardContainer(identity) {
  const card = document.querySelector(identity);
  card.innerHTML = '';
  return card;
}
function getRandomThree(arr) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}
function drawHomepageCard(card, data) {
  const nonStdMembers = data.filter(item => item.membership.type === 'gold' || item.membership.type === 'silver');
  console.log(nonStdMembers);
  const threeObjects = getRandomThree(nonStdMembers);
  console.log(threeObjects);
  threeObjects.forEach(item => {
    const homeCards = document.createElement('div');
    homeCards.classList.add('three-cards');
    
    const h1 = document.createElement('h1');
    const h5 = document.createElement('h5');
    const hr = document.createElement('div');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div2Right = document.createElement('div');
    const img = document.createElement('img');
    const address = document.createElement('p');
    const membership = document.createElement('p');
    const phone = document.createElement('p');
    const url = document.createElement('a');

    const h1Content = document.createTextNode(`${item.name}`);  
    h1.appendChild(h1Content);

    const h5Content = document.createTextNode(`${item.id}`);  
    h5.appendChild(h5Content);

    hr.style.width = '100%';
    hr.style.height = '1px';
    hr.style.backgroundColor = '#000';

    img.setAttribute('src', `${item.image}`);
    img.classList.add(`business-${item.id}`);
    img.setAttribute('alt', `${item.description}`);
    img.setAttribute('width', '100');

    const addressContent = document.createTextNode(`${item.address}`);
    address.appendChild(addressContent);

    const membershipContent = document.createTextNode(`${item.membership.type}`); 
    membership.style.textTransform = 'capitalize';
    membership.style.fontWeight = 'bold';
    membership.style.backgroundColor = item.membership.type === 'gold' ? '#ffffffff' : '#020202ff';
    membership.style.color = item.membership.type === 'gold' ? 'black' : 'white';
    membership.style.fontSize = '1.2em';
    membership.style.padding = '10px';
    membership.style.fontFamily = 'Arial, sans-serif';
    membership.style.borderRadius = '5px';
    membership.style.width = 'fit-content';
    membership.appendChild(membershipContent);

    const phoneContent = document.createTextNode(`${item.phone}`);
    phone.appendChild(phoneContent);

    const urlContent = document.createTextNode(`${item.website}`);
    url.setAttribute('href', `${item.website}`);
    url.appendChild(urlContent);
    
    div1.classList.add('card-top');
    div1.appendChild(h1);
    div1.appendChild(h5);
    div1.appendChild(hr);
    
    div2Right.classList.add('bottom-right');

    div2.classList.add('card-bottom');
    div2.appendChild(img);
    div2Right.appendChild(address);
    div2Right.appendChild(phone);
    div2Right.appendChild(url);
    div2Right.appendChild(membership);
    div2.appendChild(div2Right)

    homeCards.appendChild(div1);
    homeCards.appendChild(div2);

    card.appendChild(homeCards);
  });
}
function drawCards() {
  const directoryCard = '#directory-content';
  const card = selectCardContainer(directoryCard);
  readCardFile().then(data => {
      data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('biz-card');
      const h2 = document.createElement('h2');
      const phone = document.createElement('p');
      const description = document.createElement('p');
      description.classList.add('description');
      const website = document.createElement('a');
      website.classList.add('website');
      
      const img = document.createElement('img');
      img.setAttribute('src', `${item.image}`);
      img.setAttribute('loading', 'lazy');
      img.setAttribute('alt', `${item.alternate}`);
      
      const name = document.createTextNode(`${item.name}`);
      h2.appendChild(name);
      
      const text = document.createTextNode(`${item.description}`);
      description.appendChild(text);
      
      const webContent = document.createTextNode(`${item.website}`);
      website.setAttribute('href', `${item.website}`);
      website.appendChild(webContent);
      
      const phon = document.createTextNode(`${item.phone}`);
      phone.appendChild(phon);
      
      div.setAttribute('id', 'bizCard');
      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(description);
      div.appendChild(website);
      div.appendChild(phon)
      card.appendChild(div);
    });
  });
}
export function displayHomePageCards() {
  const homeCard = '#home-cards';
  const card = document.querySelector(homeCard);
  // card.innerHTML = '';
  readCardFile().then(data => {
    drawHomepageCard(card, data)
  });
}
function drawLists() {
  const card = document.getElementById('directory-content');
  card.innerHTML = '';
  readCardFile().then(data => {

    data.forEach((item, count) => {
      const listDiv = document.createElement('div');
      listDiv.classList.add('list-div');
      if (count%2 === 0) {
        listDiv.style.backgroundColor = '#f5f5f5';
      }
      const spanCount = document.createElement('span');
      const spanName = document.createElement('span');
      const spanDescription = document.createElement('span');
      const spanWebsite = document.createElement('span');
      const spanPhone = document.createElement('span');

      spanCount.innerHTML = `<span>${count+1}:</span>`;
      spanName.innerHTML = `<span class='name'>${item.name}</span>`;
      spanDescription.innerHTML = `<span class='description'>${item.description}</span>`;
      spanWebsite.innerHTML = `<span class='website'>${item.website}</span>`;
      spanPhone.innerHTML = `<span class='phone'>${item.phone}</span></div>`;
      
      listDiv.appendChild(spanCount);
      listDiv.appendChild(spanName);
      listDiv.appendChild(spanDescription);
      listDiv.appendChild(spanWebsite);
      listDiv.appendChild(spanPhone);
      
      card.appendChild(listDiv);
    });
  });
}

function createCardView() {
  const data = readCardFile();
  drawCards(data);
}

function createListView() {
  const data = readCardFile();
  const card = document.getElementById('#directory-content');
  drawLists(data, card);
}

export function toggleSwitching() {
    const toggleSwitch = document.getElementById('toggle-switch');
    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            console.log('Switch in ON')
            createCardView();
        } else {
            console.log('Switch in OFF')
            createListView();
        }
    });
}
export function displayLagosPlaces(places) {
  const placesContainer = document.querySelector('.wrapper');
  placesContainer.innerHTML = ''; // Clear existing content

  places.forEach(place => {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');

    const img = document.createElement('img');
    img.classList.add('place-image');
    img.style.objectFit = 'cover';
    img.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    img.style.transition = 'transform 0.3s, box-shadow 0.3s';
    img.setAttribute('src', place.pictureUrl);
    img.setAttribute('alt', place.description);
    img.setAttribute('loading', 'lazy');

    const name = document.createElement('h3');
    name.classList.add('place-name');
    name.textContent = place.name;

    const description = document.createElement('p');
    description.classList.add('place-description');
    description.textContent = place.description;

    const location = document.createElement('p');
    location.classList.add('place-location');
    location.style.fontStyle = 'italic';
    location.style.fontSize = '0.9em';
    location.textContent = `Location: ${place.location}`;

    placeCard.appendChild(img);
    placeCard.appendChild(name);
    placeCard.appendChild(description);
    placeCard.appendChild(location);

    placesContainer.appendChild(placeCard);
  });
  
}

