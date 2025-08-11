function styleDate() {
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    return new Date(document.lastModified).toLocaleDateString("en-US", options);
}
export function getModifiedDate() {
    const dateContainer = document.querySelector("#last-modified");

    // Create a text node with Last Modified Date
    const lastModifiedDate = document.createTextNode("Last Modified: ");

    // Create a text node with the current date
    const dateTextNode = document.createTextNode(styleDate());

    // Append the icon and text node to the container element
    dateContainer.appendChild(lastModifiedDate);
    dateContainer.appendChild(dateTextNode);
}

export function displayFormAction() {


    const savedData = localStorage.getItem("formData");
    if (savedData) {
    const data = JSON.parse(savedData);
    const resultsList = document.getElementById("results");
    for (const key in data) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${key}:</strong> ${data[key]}`;
        resultsList.appendChild(li);
    }
    localStorage.removeItem("formData"); // localStorage cleanup
    }
    // const params = new URLSearchParams(window.location.search);
    // console.log('params ', params);


    // const resultsList = document.getElementById("results");

    // if (params.toString()) {
    //   params.forEach((value, key) => {
    //     const li = document.createElement("li");
    //     li.innerHTML = `<strong>${key}:</strong> <span>${value}</span>`;
    //     resultsList.appendChild(li);
    //   });
    // } else {
    //   resultsList.innerHTML = "<li>No data submitted.</li>";
    // }


    // For each known field, get value
    // const fields = ["name", "phone", "email", "event", "message"];
    // fields.forEach(key => {
    //     const welcome = document.getElementById("welcome");
    //     if (key === "name") {


    //     const li = document.createElement("li");
    //     const value = params.get(key);
    //     console.log('Value ',value);

        // Check if value is null before attempting to split it
        // if (value !== null) {
        //     const firstName = value.split(' ')[0];
        //     const lastName = value.split(' ')[1];
        //     const fnameCap = firstName.charAt(0).toUpperCase();
        //     const lnameCap = lastName.charAt(0).toUpperCase();
        //     const capitalizedNames = `Names: <strong>${fnameCap}${firstName.slice(1)} ${lnameCap}${lastName.slice(1)}</strong>`;

        //     li.innerHTML = capitalizedNames;
        //     welcome.appendChild(li);
        // } else {
            // Handle the case where value is null, e.g., display a message or skip
            // console.warn(`Search parameter '${key}' not found or is null.`);
            // Optionally, you could add a message to the page indicating the missing parameter
            // li.innerHTML = `Names: <strong>N/A</strong>`;
            // welcome.appendChild(li);
        // }





            // const li = document.createElement("li");
            // const value = params.get(key);
            // console.log('Value ',value);
            // const firstName = value.split(' ')[0];
            // const lastName = value.split(' ')[1]; 
            // const fnameCap = firstName.charAt(0).toUpperCase();
            // const lnameCap = lastName.charAt(0).toUpperCase();
            // const capitalizedNames = `Names: <strong>${fnameCap}${firstName.slice(1)} ${lnameCap}${lastName.slice(1)}</strong>`;
            
        //     li.innerHTML = capitalizedNames;
        //     welcome.appendChild(li);
        // } else if (key === "phone") {
        //     let value = params.get(key);
        //     const li = document.createElement("li");
            
        //     li.innerHTML = `Phone Number: <strong>${(value || "(none)")}</strong>`;
        //     welcome.appendChild(li);
        // } else if (key === "email") {
        //     let value = params.get(key);
        //     const li = document.createElement("li");
            
        //     li.innerHTML = `Email: <strong>${(value || "(none)")}</strong>`;
        //     welcome.appendChild(li);
        // } else if (key === "event") {
        //     const li = document.createElement("li");
        //     let value = params.get(key);
        //     const eventTypes = {
        //     "1": "Wedding Catering",
        //     "2": "Corporate Catering",
        //     "3": "Private Parties",
    //         "4": "Holiday Catering",
    //         "5": "Social Events",
    //         "6": "Outdoor & Picnic Catering",
    //         "7": "Festival & Fairs Catering",
    //         "8": "Funeral Catering",
    //         "9": "Charity & Fundraisig Events",
    //         "10": "Special Dietary Catering"
    //         };
    //         li.innerHTML = `Event Selected: <strong>${(eventTypes[value] || "(none)")}</strong>`;
    //         welcome.appendChild(li);
    //     } else if (key === "message") {
    //         const li = document.createElement("li");
    //         let value = params.get(key);
    //         li.innerHTML = `<strong>Message:</strong>  ${value}`;
    //         welcome.appendChild(li);
    //     }
    // });
}

async function getMenusFromJSON() {
  try {
    const response = await fetch("./data/menu.json"); // Fetch the JSON file
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

function displayMenuModal(menu) {
    const menuDetails = document.querySelector('#menu-modal');
    menuDetails.innerHTML = '';
    menuDetails.innerHTML = `
        <button id="close-modal">❌</button>
        <h3>${menu.name}</h3>
        <p><strong>Recipe</strong>: ${menu.recipe}</p>
        <p><strong>Description</strong>: ${menu.description}</p>
    `;
    const closeModal = document.querySelector("#close-modal");
    menuDetails.showModal();
  
    closeModal.addEventListener("click", () => {
        menuDetails.close();
    });
}

export async function displayMenuCards() {
    const menus = await getMenusFromJSON()
    const menuContainer = document.querySelector('.taste-menu');
    menuContainer.innerHTML = ''; // Clear existing content

    menus.forEach(menu => {
        const menuCard = document.createElement('div');
        menuCard.classList.add('menu-card');

        const img = document.createElement('img');
        img.classList.add('menu-image');
        img.style.objectFit = 'cover';
        img.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        img.style.transition = 'transform 0.3s, box-shadow 0.3s';
        img.setAttribute('width', '200');
        img.setAttribute('height', '300');
        img.setAttribute('src', menu.images[0]);
        img.setAttribute('alt', menu.name);
        // img.setAttribute('loading', 'lazy');
        img.setAttribute('fetchpriority', 'high');
        img.addEventListener('mouseover', () => {
            img.setAttribute('src', menu.images[1]);
            name.textContent = "Click Image for more";
            name.style.color = "black";

        });
        img.addEventListener('mouseout', () => {
            img.setAttribute('src', menu.images[0]);
            name.textContent = menu.name;
            name.style.color = "#317000";
        });

        const name = document.createElement('h2');
        name.classList.add('menu-name');
        name.textContent = menu.name;

        const description = document.createElement('p');
        description.classList.add('menu-description');
        description.textContent = menu.description;

        
        const recipe = document.createElement('p');
        recipe.classList.add('menu-recipe');
        recipe.style.fontStyle = 'italic';
        recipe.style.fontSize = '0.9em';
        recipe.textContent = `Recipé: ${menu.recipe}`;
        
        const dialog = document.createElement('dialog');
        dialog.setAttribute('id', 'menu-modal');
        dialog.classList.add('menu-modal');
        
        img.addEventListener('click', () => {
            displayMenuModal(menu)
        });
        
        menuCard.appendChild(img);
        menuCard.appendChild(name);
        menuCard.appendChild(dialog);
        
        menuContainer.appendChild(menuCard);
    });
    
}

export function displayVisits() {
    // Track number of visits
    let visits = localStorage.getItem("TasteVisitors");
    if (!visits) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem("TasteVisitors", visits);
    document.getElementById("visit").textContent = `Number of visits: ${visits}`;
}