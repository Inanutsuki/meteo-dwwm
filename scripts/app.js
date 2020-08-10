/**
 * Déclaration des constantes, variables permettant de selectionner les éléments HTML.
 */

const city = document.querySelector('.city-title');
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
const hourByHourConainer = document.querySelector('.hour-by-hour-container');
const geolocBtn = document.querySelector('.geoloc-btn');
let hourByHour = document.querySelector('.hour-by-hour');

/**
 * Déclaration des varaibles en global utilisées dans les fonctions suivantes.
 */

let $cityName;
let $currentCondition;
let $currentConditionIcon;
let $temperature;
let $date;
let $hour;
let $humidity;
let $windDir;
let $windSpd;
let $city;
let $url;
let $posLat;
let $posLong;
let $urlApi;
let $myCity;

/**
 * Déclaration des tableaux en global utilisés pour créer les boucles lors de la gestion de récupération
 * des données à l'aide des API.
 */

let $day = [];
let $forecastData = [];
let $hourlyData = [];
let $fcstDayHourlyData = [];

/**
 * Fonction permettant de récupérer les données via l'API météo.
 */

function actionFetch() {
    fetch($url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let respCondition = response.current_condition;
            console.log(response);

            $currentCondition = respCondition.condition;
            $currentConditionIcon = respCondition.icon_big;
            $hour = respCondition.hour;
            $humidity = respCondition.humidity;
            $windDir = respCondition.wnd_dir;
            $windSpd = respCondition.wnd_spd;
            $temperature = respCondition.tmp;
            $date = respCondition.date;
            $cityName = response.city_info.name;
            $conditionByHour = response.fcst_day_0.hourly_data;
            for (i = 0; i < 24; ++i) {
                const hourData = {
                    hourByHourDataHour: i + 'h00',
                    hourByHourDataIcon: $conditionByHour[i + 'H00'].ICON,
                    hourByHourDataTemp: $conditionByHour[i + 'H00'].TMP2m
                }
                $hourlyData.push(hourData);
            }
            for (let i = 0; i < 5; ++i) {
                const dayData = {
                    fcstDay: "fcst_day_" + i,
                    shortDay: response["fcst_day_" + i].day_short,
                    currentConditionIconDay: response["fcst_day_" + i].icon,
                    tempMinDay: response["fcst_day_" + i].tmin,
                    tempMaxDay: response["fcst_day_" + i].tmax
                }
                $forecastData.push(dayData);
            }
            for (let i = 0; i < 5; ++i) {
                let rspData = response["fcst_day_" + i].hourly_data;
                const fcstDayHourlyData = {
                    fcstDayData0: { icon: rspData[0 + 'H00'].ICON, temp: rspData[0 + 'H00'].TMP2m, windSpd: rspData[0 + 'H00'].WNDSPD10m, windDir: rspData[0 + 'H00'].WNDDIRCARD10, humidity: rspData[0 + 'H00'].HUMIDEX },
                    fcstDayData1: { icon: rspData[3 + 'H00'].ICON, temp: rspData[3 + 'H00'].TMP2m, windSpd: rspData[3 + 'H00'].WNDSPD10m, windDir: rspData[3 + 'H00'].WNDDIRCARD10, humidity: rspData[3 + 'H00'].HUMIDEX },
                    fcstDayData2: { icon: rspData[6 + 'H00'].ICON, temp: rspData[6 + 'H00'].TMP2m, windSpd: rspData[6 + 'H00'].WNDSPD10m, windDir: rspData[6 + 'H00'].WNDDIRCARD10, humidity: rspData[6 + 'H00'].HUMIDEX },
                    fcstDayData3: { icon: rspData[9 + 'H00'].ICON, temp: rspData[9 + 'H00'].TMP2m, windSpd: rspData[9 + 'H00'].WNDSPD10m, windDir: rspData[9 + 'H00'].WNDDIRCARD10, humidity: rspData[9 + 'H00'].HUMIDEX },
                    fcstDayData4: { icon: rspData[12 + 'H00'].ICON, temp: rspData[12 + 'H00'].TMP2m, windSpd: rspData[12 + 'H00'].WNDSPD10m, windDir: rspData[12 + 'H00'].WNDDIRCARD10, humidity: rspData[12 + 'H00'].HUMIDEX },
                    fcstDayData5: { icon: rspData[15 + 'H00'].ICON, temp: rspData[15 + 'H00'].TMP2m, windSpd: rspData[15 + 'H00'].WNDSPD10m, windDir: rspData[15 + 'H00'].WNDDIRCARD10, humidity: rspData[15 + 'H00'].HUMIDEX },
                    fcstDayData6: { icon: rspData[18 + 'H00'].ICON, temp: rspData[18 + 'H00'].TMP2m, windSpd: rspData[18 + 'H00'].WNDSPD10m, windDir: rspData[18 + 'H00'].WNDDIRCARD10, humidity: rspData[18 + 'H00'].HUMIDEX },
                    fcstDayData7: { icon: rspData[21 + 'H00'].ICON, temp: rspData[21 + 'H00'].TMP2m, windSpd: rspData[21 + 'H00'].WNDSPD10m, windDir: rspData[21 + 'H00'].WNDDIRCARD10, humidity: rspData[21 + 'H00'].HUMIDEX }
                }
                $fcstDayHourlyData.push(fcstDayHourlyData);
            }
            setInfos();
        })
        .catch(function (error) {
            alert("Cette ville n'éxiste pas ou n'est pas répertoriée." + error);
        })
}

/**
 * Fonction permettant de sotcker les données récupérées dans leurs variables à l'aide de boucles.
 */

function putInfoIn() {
    for (let i = 1; i <= 5; ++i) {
        const dayNumb = {
            day: document.querySelector('.link' + i),
            content: document.querySelector('.content' + i)
        }
        $day.push(dayNumb);
        for (let i = 0; i < $day.length; ++i) {
            $day[i].day.innerHTML = `
                                    <div>${$forecastData[i].shortDay}</div>
                                    <img src="${$forecastData[i].currentConditionIconDay}"></img>
                                    <div class="temp-min-max"><div class="temp-max">${$forecastData[i].tempMaxDay}°C</div><div class="temp-min">${$forecastData[i].tempMinDay}°C</div></div>
                                    `;
            for (let idx = 0; idx < $fcstDayHourlyData.length; ++idx) {
                $day[i].content.innerHTML = `
                                            <div class="forecast-content"><div>Heure</div><div class="forecast-img">Météo</div><div>Température (°C)</div><div>Vent (km/h)</div><div>Sens du vent</div><div>Humidité (%)</div></div>
                                            <div class="forecast-content"><div>0h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i]['fcstDayData' + 0].icon}></img><div>${$fcstDayHourlyData[i]['fcstDayData' + 0].temp}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 0].windSpd}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 0].windDir}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 0].humidity}</div></div>
                                            <div class="forecast-content"><div>3h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i]['fcstDayData' + 1].icon}></img><div>${$fcstDayHourlyData[i]['fcstDayData' + 1].temp}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 1].windSpd}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 1].windDir}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 1].humidity}</div></div>
                                            <div class="forecast-content"><div>5h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i]['fcstDayData' + 2].icon}></img><div>${$fcstDayHourlyData[i]['fcstDayData' + 2].temp}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 2].windSpd}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 2].windDir}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 2].humidity}</div></div>
                                            <div class="forecast-content"><div>9h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i]['fcstDayData' + 3].icon}></img><div>${$fcstDayHourlyData[i]['fcstDayData' + 3].temp}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 3].windSpd}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 3].windDir}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 3].humidity}</div></div>
                                            <div class="forecast-content"><div>12h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i]['fcstDayData' + 4].icon}></img><div>${$fcstDayHourlyData[i]['fcstDayData' + 4].temp}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 4].windSpd}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 4].windDir}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 4].humidity}</div></div>
                                            <div class="forecast-content"><div>15h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i]['fcstDayData' + 5].icon}></img><div>${$fcstDayHourlyData[i]['fcstDayData' + 5].temp}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 5].windSpd}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 5].windDir}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 5].humidity}</div></div>
                                            <div class="forecast-content"><div>18h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i]['fcstDayData' + 6].icon}></img><div>${$fcstDayHourlyData[i]['fcstDayData' + 6].temp}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 6].windSpd}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 6].windDir}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 6].humidity}</div></div>
                                            <div class="forecast-content"><div>21h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i]['fcstDayData' + 7].icon}></img><div>${$fcstDayHourlyData[i]['fcstDayData' + 7].temp}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 7].windSpd}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 7].windDir}</div><div>${$fcstDayHourlyData[i]['fcstDayData' + 7].humidity}</div></div>
                                            `;
            }
        }
    }
    for (let i = 0; i < $hourlyData.length; ++i) {
        hourByHour.innerHTML += `<div class="hour-by-hour_col"><div class="hour-by-hour_hour">${$hourlyData[i].hourByHourDataHour}</div><img class="hour-by-hour_img" src=${$hourlyData[i].hourByHourDataIcon}></img><div class="hour-by-hour_temp">${$hourlyData[i].hourByHourDataTemp}°C</div></div>`;
    }
}

/**
 * Fonction permettant de stocker les données simples dans leurs variables.
 */

function setInfos() {
    city.innerHTML = $cityName;
    currentCondition.innerHTML = $currentCondition;
    currentConditionIcon.innerHTML = `<img src=${$currentConditionIcon}>`;
    temperature.innerHTML = $temperature + `°`;
    hour.innerHTML = `Prévision pour ${$hour}h`;
    humidity.innerHTML = `Il y a ${$humidity}% d'humidité`;
    tempMinMax.innerHTML = `<div class="temp-max">${$forecastData[0].tempMaxDay}°C</div><div class="temp-min">${$forecastData[0].tempMinDay}°C</div>`;
    windSpd.innerHTML = `La vitesse du vent est de ${$windSpd}km/h`;
    windDir.innerHTML = `La direction du vent est ${$windDir}`;

    putInfoIn();
    return;
}

/**
 * Fonction permettant de reset la div pour générer les conditions heures par heures à chaques
 * ville demandées. 
 */

function addNew() {
    let child = hourByHourConainer.firstElementChild;
    hourByHourConainer.removeChild(child);
    let parent = document.createElement('div');
    parent.className = 'hour-by-hour';
    hourByHourConainer.appendChild(parent);
    hourByHour = document.querySelector('.hour-by-hour');
    $hourlyData = [];
}

/**
 * Fonction permettant de récupérer la longitude, la latitude et ensuite à l'aide d'une API
 * de récuperer la ville qui correspond si la géolocalisation est activée.
 */

function successGetPos(position) {
    $posLat = position.coords.latitude, $posLong = position.coords.longitude;
    $urlApi = `https://geo.api.gouv.fr/communes?lat=${$posLat}&lon=${$posLong}&fields=code&format=json&geometry=centre`;

    fetch($urlApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            $myCity = response[0].nom;
            $url = `https://www.prevision-meteo.ch/services/json/` + $myCity;
            addNew();
            actionFetch();
        })
        .catch(function (error) {
            console.log("Erreur api: " + error);
        })
}

/**
 * Fonctoin permettant de parametrer une ville par défaut si la géolocalisation n'est pas activée
 * et de généré un message d'érreur celon l'érreur rencontrées.
 */

function errorGetPos(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
    $city = 'toulon';
    $url = `https://www.prevision-meteo.ch/services/json/` + $city;
    actionFetch();
}

/**
 * Fonction permettant de verifier si la géolocalisation est activé. Si oui la fonction
 * successGetPos() se lance, si non la fonction errorGetPos() se lance.
 */

function getPos() {
    if ("geolocation" in navigator) {
        console.log('Géolocalisation activée');
        navigator.geolocation.getCurrentPosition(successGetPos, errorGetPos);
    } else {
        console.log("La géolocalisation n'est pas activée");
    }
}

getPos();

/**
 * Ajout de differentes écoutes d'événements.
 */

geolocBtn.addEventListener('click', function (event) {
    event.preventDefault();
    addNew();
    getPos();
});

inputCity.addEventListener('change', function (event) {
    event.preventDefault();
    $city = inputCity.value;
    localStorage.setItem('$city', $city);
    $url = `https://www.prevision-meteo.ch/services/json/` + $city;
    addNew()
    actionFetch();
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
})

/** 
 * Les onglets
 */

const tabs = document.querySelectorAll('.tabs a');
let li;

/**
 * Fonction permattant d'ajouter la classe "active" a l'onglet et au bloc actif et de
 * la retirer aux éléments précédement séléctionnés à l'aide de la fonction addEventListener()
 * qui permet de le faire au survole de la souris.
 */

function tabsNav() {
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

}

tabsNav();

/*Fin des onglets*/