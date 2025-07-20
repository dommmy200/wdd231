import { displayHomePageCards, modeSwitching } from "./utilities.mjs";
import { insertTextAndModifiedDate } from "./dates.mjs";
import { updateCurrentWeather, updateForecastWeather } from "./weather.mjs";

// insertDateNameAndIcon();
insertTextAndModifiedDate();

// toggleSwitching();
modeSwitching();
displayHomePageCards();
updateCurrentWeather();
updateForecastWeather();