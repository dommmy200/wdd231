function getCurrentYear() {
    return new Date().getFullYear();
}
function insertDateNameAndIcon() {
    const iconCurrentYear = document.querySelector("#currentYear");
    const nameCountry = document.querySelector("#nameCountry");
    nameCountry.textContent = ` ● Abah Dominic Odeh ● Jos/Nigeria | Latter-day Prophets`;

    const icon = "\u00a9";
    const date = getCurrentYear();

    const dateAndIcon = `${icon}${date}`;
    iconCurrentYear.textContent = dateAndIcon;
}
const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
};
function getModifiedDate() {
    return new Date(document.lastModified).toLocaleDateString("en-US", options);
}
export function insertTextAndModifiedDate() {
    const dateContainer = document.getElementById("last-modified");

    // Create a text node with Last Modified Date
    const lastModifiedDate = document.createTextNode("Last Modified: ");

    // Create a text node with the current date
    const dateTextNode = document.createTextNode(getModifiedDate());

    // Append the icon and text node to the container element
    dateContainer.appendChild(lastModifiedDate);
    dateContainer.appendChild(dateTextNode);
}
// Calculate days elapsed
export function calculateDaysElapsed() {
  const storedDateTime = parseInt(localStorage.getItem('storedDate'));
  if (!storedDateTime) {
    localStorage.setItem('storedDate', Date.now().toString());
    console.log('No stored date found');
  }

  const storedDate = new Date(storedDateTime);
  const now = new Date();

  const timeDiff = now.getTime() - storedDate.getTime();
  const daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const daysFraction = timeDiff / (1000 * 60 * 60 * 24);

  console.log(`Days elapsed in whole: ${daysElapsed}`);
  console.log(`Days elapsed in fraction: ${daysFraction}`);
  return {daysElapsed, daysFraction};
}