import { calculateDaysElapsed } from "./dates.mjs";

async function getStatusBenefits() {
  try {
    const response = await fetch("./data/benefits.json"); // Fetch the JSON file
    if (!response.ok) {
      throw new Error('Failed to fetch card data');
    }
    
    const data = await response.json();
    console.log(data);
    return data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw error; // Rethrow the error for handling by the caller
  }
}

function getDOM() {
  return document.querySelector("#benefits-list");
}

export function displayThankYou() {
  const params = new URLSearchParams(window.location.search);
  
  // For each known field, get value
  const fields = ["fname", "lname", "phone", "email", "organisation", "membership", "date"];
  fields.forEach(key => {
    const thankYou = document.getElementById("thankyou");
    if (key === "fname" || key === "lname") {
      const li = document.createElement("li");
      const value = params.get(key);
      const firstLast = key.charAt(0);
      if (firstLast === "f") {
        li.innerHTML = `First Name: <strong>${(value || "(none)")}</strong>`;
        thankYou.appendChild(li);
      }
      if (firstLast === "l") {
        li.innerHTML = `Last Name: <strong>${(value || "(none)")}</strong>`;
        thankYou.appendChild(li);
      }
    } else if (key === "email") {
      let value = params.get(key);
      const li = document.createElement("li");
      li.innerHTML = `Email: <strong>${(value || "(none)")}</strong>`;
      thankYou.appendChild(li);
    } else if (key === "phone") {
      let value = params.get(key);
      const li = document.createElement("li");
      li.innerHTML = `Phone Number: <strong>${(value || "(none)")}</strong>`;
      thankYou.appendChild(li);
    } else if (key === "membership") {
      const li = document.createElement("li");
      let value = params.get(key);
      const membershipLevels = {
        "1": "Bronze",
        "2": "Silver",
        "3": "Gold",
        "4": "Non Profit"
      };
      li.innerHTML = `Membership: <strong>${(membershipLevels[value] || "(none)")}</strong>`;
      thankYou.appendChild(li);
    } else if (key === "date") {
      const now = new Date();
      const li = document.createElement("li");
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      li.innerHTML = `Date:  <strong>${date}</strong>, Time:  <strong>${time}</strong>`;
      thankYou.appendChild(li);
    }
  });
}

function createBenefitModals(membership) {
    const benefitsDetails = document.querySelector('#benefits-dialog');
    benefitsDetails.innerHTML = '';
    benefitsDetails.innerHTML = `
        <button id="close-modal">❌</button>
        <h2>${membership.title}</h2>
        <p><strong>Description</strong>: ${membership.description}</p>
    `;
    const closeModal = document.querySelector("#close-modal");
    benefitsDetails.showModal();
  
    closeModal.addEventListener("click", () => {
      benefitsDetails.close();
    });
}

export async function displayMembershipBenefits() {
  const benefits = await getStatusBenefits();
  benefits.forEach((membership) => {
    const benefitsContainer = getDOM();
    const li = document.createElement("li");
    li.classList.add("benefit-item");
    li.id = membership.id;
    li.textContent = membership.title;
    li.style.cursor = 'pointer';
    li.addEventListener("click", () => {
      createBenefitModals(membership);
    });
    benefitsContainer.appendChild(li);
  });
}

function getNumberOfVisits() {
    const visits = window.localStorage.getItem("visits");
    const visitCount = visits ? parseInt(visits, 10) + 1 : 1;
    localStorage.setItem("visits", visitCount);
    return visitCount;
}

function numberOfDays(timeInDays) {
  if (timeInDays > 1) {
    return `${Math.abs(timeInDays)}`;
  } else if (timeInDays === 1) {
    return `${Math.abs(timeInDays)}`;
  } else {
    return `less than a day ago.`;
  }
}

function numberOfVisits(visits, timeDiff) {
  if (visits === 1 || timeDiff < 1.00) {
    return `Welcome! Let us know if you have any questions.`;
  } else if (timeDiff > 1.00 && timeDiff < 2.00) {
    return `Back so soon! Awesome!`;
  } else {
    return `You last visited ${visits} days ago.`;
  }
}

export function footerDialog() {
  const openDialogBtn = document.getElementById('open-dialog-btn');
  const dialogBox = document.getElementById('dialog-box');
  const closeDialogBtn = document.getElementById('close-dialog-btn');

  let daysElapsed = 0;
  let daysInFraction = 0.00;
  const visits = getNumberOfVisits();
  ({daysElapsed, daysInFraction} = calculateDaysElapsed());
  const days = numberOfDays(daysElapsed);
  const visi = numberOfVisits(days, daysInFraction);

  function openDialog() {
    const dialogContent = document.getElementById('dialog-content');
    dialogContent.innerHTML = `
  <p class="p-visit"><strong>Number of visits</strong>: ${visits}</p>
  <p class="p-visit"><strong>${visi}</strong></p>
  <p class="p-visit"><strong>You last visited ${days}</strong></p>
  `;
    dialogBox.style.display = 'block';
  }

  function closeDialog() {
    dialogBox.style.display = 'none';
  }

  openDialogBtn.addEventListener('click', openDialog);
  closeDialogBtn.addEventListener('click', closeDialog);
}