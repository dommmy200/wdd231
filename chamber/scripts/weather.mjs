const url = 'https://api.openweathermap.org/data/2.5/weather?lat=6.59&lon=3.23&appid=07723eae89f8687bda9ae582fd3d6585&units=imperial';
const forcastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=6.59&lon=3.23&appid=07723eae89f8687bda9ae582fd3d6585&units=imperial';

async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
  
export async function updateCurrentWeather() {
    const data = await fetchData();
    console.log(data);
    // Access the data after it's fetched
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    const wxContainer = document.querySelector('#current-weather');
    const wrapper = document.createElement('div');
    const elementsContainer = document.createElement('div');
    const currentTemp = document.createElement('div');
    const humid = document.createElement('div');
    const highT = document.createElement('div');
    const lowT = document.createElement('div');
    const rise = document.createElement('div');
    const set = document.createElement('div');
    
    const weatherIcon = document.createElement('img');
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');

    const highTemp = `High: ${data.main.temp_max}°F`;
    const lowTemp = `Low: ${data.main.temp_min}°F`;
    const humidity = `Humidity: ${data.main.humidity}°F`;

    const curTemperature = Math.round(data.main.temp);
    const currTemp = `${curTemperature}°F`;
    const tempContent = document.createTextNode(currTemp);
    currentTemp.style.fontWeight = 'bold';
    currentTemp.append(tempContent);

    const tempHighContent = document.createTextNode(highTemp);
    highT.append(tempHighContent);

    const tempLowContent = document.createTextNode(lowTemp);
    lowT.append(tempLowContent);

    const humidityContent = document.createTextNode(humidity);
    humid.append(humidityContent);

    const sunrise = getSunrise(data);
    const sunriseFormatted = document.createTextNode(sunrise);
    rise.append(sunriseFormatted);

    const sunset = getSunset(data);
    const sunsetFormatted = document.createTextNode(sunset);
    set.append(sunsetFormatted);
    
    let descript = `${data.weather[0].description}`;
    let myDesc = capitalizedFirstLetters(descript);
    const figCapContent = document.createTextNode(myDesc);
    
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', descript);
    
    figcaption.appendChild(figCapContent);
    figure.appendChild(weatherIcon);
    figure.appendChild(figcaption);
    
    elementsContainer.appendChild(currentTemp);
    elementsContainer.appendChild(rise);
    elementsContainer.appendChild(set);
    elementsContainer.appendChild(humid);
    elementsContainer.appendChild(lowT);
    elementsContainer.appendChild(highT);
    
    elementsContainer.classList.add('element-contain');
    wrapper.classList.add('wrapper');
    wrapper.appendChild(figure);
    wrapper.appendChild(elementsContainer);
    wxContainer.appendChild(wrapper);
}

const convertToFahrenheit = (temp) => {
    return Math.round((temp - 273.15) * 9/5 + 32);
}

export async function updateForecastWeather() {
    const response = await fetch(forcastUrl);
    const data = await response.json();
    console.log(data);
    console.log(data.list);
    console.log(Object.keys(data));
    // Access the data after it's fetched
    const forecastContainer = document.querySelector('#weather-forecast');
    const forecastWrapper = document.createElement('div');
    forecastWrapper.classList.add('forecast-wrapper');
    const forecastList = data.list;

    const dailyMax = {};
    const options = { weekday: 'long' }; // 'short' gives Mon, Tue, etc.

    forecastList.forEach(entry => {
        const day = new Date(entry.dt * 1000);
        const forecastDay = day.toLocaleDateString('en-US', options).split(',')[0]; // Get the day name
        console.log(forecastDay); // e.g., "Friday"
        const temp = entry.main.temp;

        if (!dailyMax[forecastDay] || temp > dailyMax[forecastDay]) {
            dailyMax[forecastDay] = temp;
        }
    });
    
        // Get the next 3 unique dates starting from today
    const threeDayforecast = Object.keys(dailyMax).slice(0, 3);

    threeDayforecast.forEach(weekday => {
        const weekdayForecast = document.createElement('div');
        weekdayForecast.classList.add('weekday-forecast');
        weekdayForecast.innerHTML = `<span>${weekday} :</span><span><strong>${dailyMax[weekday]}°C</strong></span>`;
        forecastWrapper.appendChild(weekdayForecast);
        forecastContainer.appendChild(forecastWrapper);
        // You can also log or display the date and max temperature
      console.log(`${weekday}: Max Temp = ${convertToFahrenheit(dailyMax[weekday])}°C`);
    });
} 


function capitalizedFirstLetters(words){
    const mySentence =  words.split(" ");

    for (let i = 0; i < mySentence.length; i++) {
        mySentence[i] = mySentence[i][0].toUpperCase() + mySentence[i].substr(1);
    }
    return mySentence.join(" ");
}

function getSunrise(data) {
    const sunriseUnix = data.sys.sunrise; // e.g. 1721274600
    const date = new Date(sunriseUnix * 1000); // Convert to milliseconds

    const hours = date.getHours(); // 0–23
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Convert to 12-hour format and append am/pm
    const period = hours >= 12 ? 'pm' : 'am';
    const hour12 = hours % 12 || 12; // convert 0 -> 12 for midnight

    const formattedTime = `Sunrise: ${hour12}:${minutes}${period}`;

    console.log(formattedTime); // → "7:30am"
    return formattedTime;
}
function getSunset(data) {
    const sunriseUnix = data.sys.sunset; // e.g. 1721274600
    const date = new Date(sunriseUnix * 1000); // Convert to milliseconds

    const hours = date.getHours(); // 0–23
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Convert to 12-hour format and append am/pm
    const period = hours >= 12 ? 'pm' : 'am';
    const hour12 = hours % 12 || 12; // convert 0 -> 12 for midnight

    const formattedTime = `Sunset: ${hour12}:${minutes}${period}`;

    console.log(formattedTime); // → "7:30am"
    return formattedTime;
}