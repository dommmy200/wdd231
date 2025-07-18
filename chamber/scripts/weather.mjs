const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const main = document.querySelector('.weather1');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=6.59&lon=3.23&appid=07723eae89f8687bda9ae582fd3d6585&units=imperial';

async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
  
async function updatePage() {
    const data = await fetchData();
    
    // Access the data after it's fetched
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    const tempt = `${data.main.temp}`;
    let roundedTempt = Math.round(tempt)
    currentTemp.innerHTML = `${roundedTempt}&deg;F`;


    let desc = `${data.weather[0].description}`;
    let myDesc = capitalizedFirstLetters(desc);
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${myDesc}`;


    const ul = getWeatherEvents(data);
    main.appendChild(ul);
}

function capitalizedFirstLetters(words){
    const mySentence = words.split(" ");

    for (let i = 0; i < mySentence.length; i++) {
        mySentence[i] = mySentence[i][0].toUpperCase() + mySentence[i].substr(1);
    }
    return mySentence.join(" ");
}

function getWeatherEvents(data) {
    const weather = data.weather;
    const ul = document.createElement('ul');

    weather.forEach(wx => {
        const li = document.createElement('li');
        li.textContent = wx;
    })
    ul.appendChild(li);
    return ul;
}
  
updatePage();