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

function drawCards() {
  const card = document.querySelector('#directory-content');
  card.innerHTML = '';
  readCardFile().then(data => {
      data.forEach(item => {
      // console.log(item); // Optional: log the item
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

export function createCardView() {
  const data = readCardFile();
  drawCards(data);
}

export function createListView() {
  const data = readCardFile();
  const card = document.getElementById('#directory-content');
  drawLists(data, card);
}