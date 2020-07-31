const city = document.querySelector('.city');
const currentCondition = document.querySelector('.current_condition');
const temperature = document.querySelector('.temperature');
const currentConditionIcon = document.querySelector('.current_condition_icon');
const form = document.querySelector('.search-form');
const inputCity = document.querySelector('.input_city');
const hour = document.querySelector('.hour');
const humidity = document.querySelector('.humidity');
const tempMinMax = document.querySelector('.temp_min-max');
const windSpd = document.querySelector('.wind_spd');
const windDir = document.querySelector('.wind_dir');

let $cityName;
let $currentCondition;
let $currentConditionIcon;
let $temperature;
let $date;
let $hour;
let $humidity;
let $windDir;
let $windSpd;

let $day = [];
let $forecastData = [];


let $city;
let $url;

function putInfoIn() {
    for (let i = 1; i <= 5; ++i) {
        const dayNumb = {
            day: document.querySelector('.link' + i)
        }
        $day.push(dayNumb);
        for (let i = 0; i < $day.length; ++i) {
            $day[i].day.innerHTML = `<div>${$forecastData[i].shortDay}</div>
                                <img src="${$forecastData[i].currentConditionIconDay}"></img>
                                <div>${$forecastData[i].tempMaxDay}°C / ${$forecastData[i].tempMinDay}°C</div>`;
        }
    }
}


if ("geolocation" in navigator) {
    
    console.log('ok');
  } else {
    console.log('pas ok');
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    posLat = position.coords.latitude, posLong = position.coords.longitude;
    console.log(posLat, posLong);
  });

function setInfos() {
    city.innerHTML = $cityName;
    currentCondition.innerHTML = $currentCondition;
    currentConditionIcon.innerHTML = `<img src=${$currentConditionIcon}>`;
    temperature.innerHTML = `Il fait ${$temperature}°C`;
    hour.innerHTML = `Prévision pour ${$hour}h`;
    humidity.innerHTML = `Il y a ${$humidity}% d'humidité`;
    tempMinMax.innerHTML = `${$forecastData[0].tempMaxDay}°C / ${$forecastData[0].tempMinDay}°C`;
    windSpd.innerHTML = `La vitesse du vent est de ${$windSpd}km/h`;
    windDir.innerHTML = `La direction du vent est ${$windDir}`;

    putInfoIn();
    return;
}

function actionFetch() {
    fetch($url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            console.log(response)

            $cityName = response.city_info.name;
            $currentCondition = response.current_condition.condition;
            $currentConditionIcon = response.current_condition.icon_big;
            $hour = response.current_condition.hour;
            $humidity = response.current_condition.humidity;
            $windDir = response.current_condition.wnd_dir;
            $windSpd = response.current_condition.wnd_spd;
            $temperature = response.current_condition.tmp;
            $date = response.current_condition.date;

            for (let i = 0; i < 5; ++i) {
                const dayData = {
                    shortDay: response["fcst_day_" + i].day_short,
                    currentConditionIconDay: response["fcst_day_" + i].icon,
                    tempMinDay: response["fcst_day_" + i].tmin,
                    tempMaxDay: response["fcst_day_" + i].tmax
                }
                $forecastData.push(dayData);
            }

            setInfos();

        })
        .catch(function (error) {
            alert("Cette ville n'éxiste pas ou n'est pas répertoriée." + error);
            localStorage.clear();
            console.log("Erreur : " + error);
        })
}

function getCity() {
    let cityLocalStorage = localStorage.getItem('$city');

    if (cityLocalStorage == '' || cityLocalStorage == null) {
        $city = 'toulon';
        localStorage.setItem('$city', $city);
    } else if (cityLocalStorage !== '' || cityLocalStorage !== null) {
        $city = cityLocalStorage;
    }
    $url = `https://www.prevision-meteo.ch/services/json/` + $city;
    actionFetch();
}

function getInputCity(event) {
    event.preventDefault();
    $city = inputCity.value;
    localStorage.setItem('$city', $city);
    $url = `https://www.prevision-meteo.ch/services/json/` + $city;
    actionFetch();
}

getCity();

inputCity.addEventListener('change', getInputCity);

form.addEventListener('submit', function (event) {
    event.preventDefault();
    getInputCity();
})

/*onglets*/

const tabs = document.querySelectorAll('.tabs a');
let li;
function setClassActive(link) {
    let tabsWrapper = link.parentNode.parentNode.parentNode;
    li = link.parentNode;
    if (li.classList.contains('active')) {
        return false;
    }
    tabsWrapper.querySelector('.tabs .active').classList.remove('active');
    li.classList.add('active');

    tabsWrapper.querySelector('.tab-content.active').classList.remove('active');
    tabsWrapper.querySelector(link.getAttribute('href')).classList.add('active');
}

for (let i = 0; i < tabs.length; ++i) {
    tabs[i].addEventListener('mouseover', function (event) {
        setClassActive(this);
    })
}

/*End onglets*/