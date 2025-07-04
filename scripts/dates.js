function getCurrentYear() {
    return new Date().getFullYear();
}
function insertDateNameAndIcon() {
    const iconCurrentYear = document.querySelector("#currentYear");
    const nameCountry = document.querySelector("#nameCountry");
    nameCountry.textContent = ` ● Abah Dominic Odeh ● Jos/Nigeria`;

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
function insertTextAndModifiedDate() {
    const dateContainer = document.getElementById("lastModified");

    // Create a text node with Last Modified Date
    const lastModifiedDate = document.createTextNode("Last Modified: ");

    // Create a text node with the current date
    const dateTextNode = document.createTextNode(getModifiedDate());

    // Append the icon and text node to the container element
    dateContainer.appendChild(lastModifiedDate);
    dateContainer.appendChild(dateTextNode);
}

insertDateNameAndIcon();
insertTextAndModifiedDate();