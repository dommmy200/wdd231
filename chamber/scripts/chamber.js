import { displayHomePageCards, toggleSwitching, displayLagosPlaces } from "./utilities.mjs";
import { places } from "../data/lagos-place.mjs";
import { insertTextAndModifiedDate } from "./dates.mjs";
import { updateCurrentWeather, updateForecastWeather } from "./weather.mjs";
// import { displayThankYou } from "./visits.mjs";

// insertDateNameAndIcon();
insertTextAndModifiedDate();

// modeSwitching();
displayHomePageCards();

updateCurrentWeather();
updateForecastWeather();

displayLagosPlaces(places);

toggleSwitching();
// displayThankYou(); // IGNORE FOR NOW: This function is invokes the thankyou page and should be called at form submission
// setNumberOfVisits();