export async function readCardFile() {
  try {
    const response = await fetch("./data/dir-cards.json"); // Fetch the JSON file
    if (!response.ok) {
      throw new Error('Failed to fetch card data');
    }
    
    const data = await response.json();
    console.log(data); // Optional: log the data
    return data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw error; // Rethrow the error for handling by the caller
  }
}
export function createCardDiv() {
  const div = document.createElement('div');
  return div;
}
export function drawCards(data, card, div) {
  // const div = document.createElement('div');
  const h2 = document.createElement('h2');
  const phone = document.createElement('p');
  const description = document.createElement('p');
  description.classList.add('description');
  const website = document.createElement('a');
  website.classList.add('website');
  
  const img = document.createElement('img');
  // const path = './images/';
  img.setAttribute('src', `${data.image}`);
  img.setAttribute('loading', 'lazy');
  img.setAttribute('alt', `${data.alternate}`);

  const name = document.createTextNode(`${data.name}`);
  h2.appendChild(name);

  const text = document.createTextNode(`${data.description}`);
  description.appendChild(text);

  const webContent = document.createTextNode(`${data.website}`);
  website.setAttribute('href', `${data.website}`);
  website.appendChild(webContent);

  const phon = document.createTextNode(`${data.phone}`);
  phone.appendChild(phon);
  
  div.setAttribute('id', 'bizCard');
  div.classList.add('biz-card');
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(description);
  div.appendChild(website);
  div.appendChild(phon)
  card.appendChild(div);
}

function getSelector() {
  const card = document.querySelector('#bizCard');
  return card;
}

export function clickListBtn() {
  const card = getSelector();
  const buttonOne = document.querySelector('#btn-one');
  const buttonTwo = document.querySelector('#btn-two');
  buttonOne.addEventListener('click', () => {
    // buttonTwo.classList.toggle('show');
    buttonOne.style.backgroundColor = 'forestgreen';
    buttonOne.style.border = '2px solid darkgreen';
    
    buttonTwo.style.backgroundColor = '';
    buttonTwo.style.border = '';
    console.log(card);
    card.classList.toggle('show');
  });
}

export function clickThumbnailBtn() {
  const card = getSelector();
  const buttonOne = document.querySelector('#btn-one');
  const buttonTwo = document.querySelector('#btn-two');
  buttonTwo.addEventListener('click', () => {
    // buttonOne.classList.toggle('show');
    buttonTwo.style.backgroundColor = 'forestgreen';
    buttonTwo.style.border = '2px solid darkgreen';
    
    buttonOne.style.backgroundColor = '';
    buttonOne.style.border = '';
    
    card.classList.toggle('show');
  });
}