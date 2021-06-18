// Weather form fields
const tempField = document.querySelector('.temp');
const descrField = document.querySelector('.description');
const iconField = document.querySelector('.icon');
const humidField = document.querySelector('.humidity');
const presField = document.querySelector('.pressure');
const visField = document.querySelector('.visibility');
const windField = document.querySelector('.wind');

// Cities array
const cities = {
    '579492': 'Balakovo',
    '524894': 'Moscow',
    '703448': 'Kyiv',
    '2950158': 'Berlin',
    '4350049': 'California',
    '5128581': 'New York',
}

// Create and setup select
let select = document.createElement('select');
select.id = 'city'
// Fill select with options
for(let key in cities){
    let option = document.createElement('option');
    option.value = key;
    option.textContent = cities[key];
    select.appendChild(option);
}
// Append select
document.querySelectorAll('div')[0].appendChild(select);


// Function to fetch data for selected city using weather API
function getWeather(){
    // Get city ID from the current selection
    const cityId = document.querySelector(`#city`).value;

    // Setup request parameters
    const reqParam = {'url': `https://api.openweathermap.org/data/2.5/`, 
                    'appid': `720ae8d57f3d88140d11b1694b954b2d`,};

    // Fetch request using ID and parameters
    fetch(`${reqParam.url}weather?id=${cityId}&units=metric&APPID=${reqParam.appid}`)
    .then(weather => {
            return weather.json();
        }).then(showWeather);
}

// Function to fill weather info from the fetched data
function showWeather(data){
    // Temperature
    tempField.innerHTML = `Temperature: ${Math.round(data.main.temp)} &deg`;
    // Description
    descrField.textContent = `General weather: : ${data.weather[0].main}`;
    // Icon
    iconField.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"><img>`;
    // Humidity
    humidField.textContent = `Humidity: ${data.main.humidity} %`;
    // Atmospheric pressure 
    presField.textContent = `Pressure: ${data.main.pressure} mmHg`;
    // Visibility
    visField.textContent = `Visibility: ${data.visibility} m`;

    // Wind
        // Wind direction based on the degree
    let windDir = '';
    if(Math.sin(data.wind.deg * Math.PI/180)>0){windDir += 'N'}else{windDir += 'S'};
    if(Math.cos(data.wind.deg * Math.PI/180)>0){windDir += 'E'}else{windDir += 'W'};
        // Fill wind data 
    windField.textContent = `Wind: ${data.wind.speed} m/s ${windDir}`;
}

// Get weather on first load
getWeather();

// Get weather when selection is changed
document.querySelector(`#city`).onchange = ()=>{getWeather()};