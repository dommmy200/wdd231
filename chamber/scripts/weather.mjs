// const currentTemp = document.querySelector('#current-temp');
// const weatherIcon = document.querySelector('#weather-icon');
// const captionDesc = document.querySelector('figcaption');
// const main = document.querySelector('.weather1');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=6.59&lon=3.23&appid=07723eae89f8687bda9ae582fd3d6585&units=imperial';

async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
  
export async function updatePage() {
    const data = await fetchData();
    console.log(data);
    // Access the data after it's fetched
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    const wxContainer = document.querySelector('#current-weather');
    const currentTemp = document.createElement('div');
    const weatherIcon = document.createElement('img');
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');

    // weatherIcon.setAttribute('src', `${iconSrc}`);
    // weatherIcon.setAttribute('alt', 'Weather icon for the current weather.')

    const currTemp = `${Math.round(data.main.temp)}&deg;F`;
    const tempContent = document.createTextNode(currTemp);
    currentTemp.append(tempContent);

    const sunrise = getSunrise(data);
    const sunriseFormatted = document.createTextNode(sunrise);

    const sunset = getSunset(data);
    const sunsetFormatted = document.createTextNode(sunset);
    
    // let roundedTempt = Math.round(tempt)
    // currentTemp.innerHTML = `${roundedTempt}&deg;F`;
    
    let descript = `${data.weather[0].description}`;
    let myDesc = capitalizedFirstLetters(descript);
    const figCapContent = document.createTextNode(myDesc);
    
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', descript);
    // captionDesc.textContent = `${myDesc}`;
    
    figcaption.appendChild(figCapContent);
    figure.appendChild(weatherIcon);
    figure.appendChild(figcaption);
    
    wxContainer.appendChild(figure);
    wxContainer.appendChild(currentTemp);
    wxContainer.appendChild(sunriseFormatted);
    wxContainer.appendChild(sunsetFormatted);
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

    const formattedTime = `${hour12}:${minutes}${period}`;

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

    const formattedTime = `${hour12}:${minutes}${period}`;

    console.log(formattedTime); // → "7:30am"
    return formattedTime;
}