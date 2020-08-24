const city = document.querySelector('.city-title');
const currentCondition = document.querySelector('.current_condition');
const temperature = document.querySelector('.temperature');
const currentConditionIcon = document.querySelector('.current_condition_icon');
const searchBtn = document.querySelector('.search');
const inputCity = document.querySelector('.input_city');
const hour = document.querySelector('.hour');
const humidity = document.querySelector('.humidity');
const tempMinMax = document.querySelector('.temp_min-max');
const windSpd = document.querySelector('.wind_spd');
const windDir = document.querySelector('.wind_dir');
const hourByHourContainer = document.querySelector('.hour-by-hour-container');
const geolocBtn = document.querySelector('.geoloc-btn');
const autoCompletList = document.querySelector('#autoComplete_list');
let hourByHour = document.querySelector('.hour-by-hour');

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
let $hourlyData = [];
let $fcstDayHourlyData = [];

getGPSPosition();

function getGPSPosition() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(onGetGPSPositionSuccess, onGetGPSPositionError);
    }
}

function onGetGPSPositionSuccess(position) {
    let $Lat = position.coords.latitude;
    let $Long = position.coords.longitude;
    let $urlApi = `https://geo.api.gouv.fr/communes?lat=${$Lat}&lon=${$Long}&fields=code&format=json&geometry=centre`;

    fetch($urlApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            resetHourByHourHTML();
            fetchWeatherData(response[0].nom);
        })
        .catch(function (error) {
            console.log("Erreur api: " + error);
        })
}

function onGetGPSPositionError(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
    fetchWeatherData('toulon');
}

function resetHourByHourHTML() {
    let child = hourByHourContainer.firstElementChild;
    hourByHourContainer.removeChild(child);
    let parent = document.createElement('div');
    parent.className = 'hour-by-hour';
    hourByHourContainer.appendChild(parent);
    hourByHour = document.querySelector('.hour-by-hour');
    $hourlyData = [];
}

function fetchWeatherData(cityName) {
    fetch(`https://www.prevision-meteo.ch/services/json/` + cityName)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            prepareWeatherData(response);
            updateHTML();
        })
        .catch(function (error) {
            alert("Cette ville n'éxiste pas ou n'est pas répertoriée." + error);
        })
}

function prepareWeatherData(weatherData) {
    const responseCondition = weatherData.current_condition;

    $currentCondition = responseCondition.condition;
    $currentConditionIcon = responseCondition.icon_big;
    $hour = responseCondition.hour;
    $humidity = responseCondition.humidity;
    $windDir = responseCondition.wnd_dir;
    $windSpd = responseCondition.wnd_spd;
    $temperature = responseCondition.tmp;
    $date = responseCondition.date;
    $cityName = weatherData.city_info.name;
    $conditionByHour = weatherData.fcst_day_0.hourly_data;

    prepareDynamicWeatherData(weatherData);
}

function prepareDynamicWeatherData(weatherData) {
    for (i = 0; i < 24; ++i) {
        const hourlyData = {
            hour: i + 'h00',
            icon: $conditionByHour[i + 'H00'].ICON,
            temp: $conditionByHour[i + 'H00'].TMP2m
        }
        $hourlyData.push(hourlyData);
    }

    for (let i = 0; i < 5; ++i) {
        const dayData = {
            fcstDay: "fcst_day_" + i,
            shortDay: weatherData["fcst_day_" + i].day_short,
            iconDay: weatherData["fcst_day_" + i].icon,
            tempMinDay: weatherData["fcst_day_" + i].tmin,
            tempMaxDay: weatherData["fcst_day_" + i].tmax
        }
        $forecastData.push(dayData);
    }

    for (let i = 0; i < 5; ++i) {
        let forecastWeatherData = weatherData["fcst_day_" + i].hourly_data;

        const fcstDayHourlyData = {
            fcstDayData0: {
                icon: forecastWeatherData[0 + 'H00'].ICON,
                temp: forecastWeatherData[0 + 'H00'].TMP2m,
                windSpd: forecastWeatherData[0 + 'H00'].WNDSPD10m,
                windDir: forecastWeatherData[0 + 'H00'].WNDDIRCARD10,
                humidity: forecastWeatherData[0 + 'H00'].HUMIDEX
            },
            fcstDayData1: {
                icon: forecastWeatherData[3 + 'H00'].ICON,
                temp: forecastWeatherData[3 + 'H00'].TMP2m,
                windSpd: forecastWeatherData[3 + 'H00'].WNDSPD10m,
                windDir: forecastWeatherData[3 + 'H00'].WNDDIRCARD10,
                humidity: forecastWeatherData[3 + 'H00'].HUMIDEX
            },
            fcstDayData2: {
                icon: forecastWeatherData[6 + 'H00'].ICON,
                temp: forecastWeatherData[6 + 'H00'].TMP2m,
                windSpd: forecastWeatherData[6 + 'H00'].WNDSPD10m,
                windDir: forecastWeatherData[6 + 'H00'].WNDDIRCARD10,
                humidity: forecastWeatherData[6 + 'H00'].HUMIDEX
            },
            fcstDayData3: {
                icon: forecastWeatherData[9 + 'H00'].ICON,
                temp: forecastWeatherData[9 + 'H00'].TMP2m,
                windSpd: forecastWeatherData[9 + 'H00'].WNDSPD10m,
                windDir: forecastWeatherData[9 + 'H00'].WNDDIRCARD10,
                humidity: forecastWeatherData[9 + 'H00'].HUMIDEX
            },
            fcstDayData4: {
                icon: forecastWeatherData[12 + 'H00'].ICON,
                temp: forecastWeatherData[12 + 'H00'].TMP2m,
                windSpd: forecastWeatherData[12 + 'H00'].WNDSPD10m,
                windDir: forecastWeatherData[12 + 'H00'].WNDDIRCARD10,
                humidity: forecastWeatherData[12 + 'H00'].HUMIDEX
            },
            fcstDayData5: {
                icon: forecastWeatherData[15 + 'H00'].ICON,
                temp: forecastWeatherData[15 + 'H00'].TMP2m,
                windSpd: forecastWeatherData[15 + 'H00'].WNDSPD10m,
                windDir: forecastWeatherData[15 + 'H00'].WNDDIRCARD10,
                humidity: forecastWeatherData[15 + 'H00'].HUMIDEX
            },
            fcstDayData6: {
                icon: forecastWeatherData[18 + 'H00'].ICON,
                temp: forecastWeatherData[18 + 'H00'].TMP2m,
                windSpd: forecastWeatherData[18 + 'H00'].WNDSPD10m,
                windDir: forecastWeatherData[18 + 'H00'].WNDDIRCARD10,
                humidity: forecastWeatherData[18 + 'H00'].HUMIDEX
            },
            fcstDayData7: {
                icon: forecastWeatherData[21 + 'H00'].ICON,
                temp: forecastWeatherData[21 + 'H00'].TMP2m,
                windSpd: forecastWeatherData[21 + 'H00'].WNDSPD10m,
                windDir: forecastWeatherData[21 + 'H00'].WNDDIRCARD10,
                humidity: forecastWeatherData[21 + 'H00'].HUMIDEX
            }
        }
        $fcstDayHourlyData.push(fcstDayHourlyData);
    }
}

function updateHTML() {
    city.innerHTML = $cityName;
    currentCondition.innerHTML = $currentCondition;
    currentConditionIcon.innerHTML = `<img src=${$currentConditionIcon}>`;
    temperature.innerHTML = $temperature + `°`;
    hour.innerHTML = `Prévision pour ${$hour}h`;
    humidity.innerHTML = `Il y a ${$humidity}% d'humidité`;
    tempMinMax.innerHTML = `<div class="temp-max">${$forecastData[0].tempMaxDay}°C</div><div class="temp-min">${$forecastData[0].tempMinDay}°C</div>`;
    windSpd.innerHTML = `La vitesse du vent est de ${$windSpd}km/h`;
    windDir.innerHTML = `La direction du vent est ${$windDir}`;
    inputCity.setAttribute("placeholder", $cityName);

    updateDynamicHTML();
    return;
}

function updateDynamicHTML() {
    for (let i = 1; i <= 5; ++i) {
        const dayNumb = {
            dayLink: document.querySelector('.link' + i),
            dayContent: document.querySelector('.content' + i)
        }
        $day.push(dayNumb);

        for (let i = 0; i < $day.length; ++i) {
            $day[i].dayLink.innerHTML = `
                                    <div>${$forecastData[i].shortDay}</div>
                                    <img src="${$forecastData[i].iconDay}"></img>
                                    <div class="temp-min-max"><div class="temp-max">${$forecastData[i].tempMaxDay}°C</div><div class="temp-min">${$forecastData[i].tempMinDay}°C</div></div>
                                    `;
            $day[i].dayContent.innerHTML = `
                                    <div class="forecast-content"><div>Heure</div><div class="forecast-img">Météo</div><div>Température (°C)</div><div>Vent (km/h)</div><div>Sens du vent</div><div>Humidité (%)</div></div>
                                    <div class="forecast-content"><div>0h00</div><img class="forecast-img" src="${$fcstDayHourlyData[i].fcstDayData0.icon}"></img><div>${$fcstDayHourlyData[i].fcstDayData0.temp}</div><div>${$fcstDayHourlyData[i].fcstDayData0.windSpd}</div><div>${$fcstDayHourlyData[i].fcstDayData0.windDir}</div><div>${$fcstDayHourlyData[i].fcstDayData0.humidity}</div></div>
                                    <div class="forecast-content"><div>3h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i].fcstDayData1.icon}></img><div>${$fcstDayHourlyData[i].fcstDayData1.temp}</div><div>${$fcstDayHourlyData[i].fcstDayData1.windSpd}</div><div>${$fcstDayHourlyData[i].fcstDayData1.windDir}</div><div>${$fcstDayHourlyData[i].fcstDayData1.humidity}</div></div>
                                    <div class="forecast-content"><div>5h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i].fcstDayData2.icon}></img><div>${$fcstDayHourlyData[i].fcstDayData2.temp}</div><div>${$fcstDayHourlyData[i].fcstDayData2.windSpd}</div><div>${$fcstDayHourlyData[i].fcstDayData2.windDir}</div><div>${$fcstDayHourlyData[i].fcstDayData2.humidity}</div></div>
                                    <div class="forecast-content"><div>9h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i].fcstDayData3.icon}></img><div>${$fcstDayHourlyData[i].fcstDayData3.temp}</div><div>${$fcstDayHourlyData[i].fcstDayData3.windSpd}</div><div>${$fcstDayHourlyData[i].fcstDayData3.windDir}</div><div>${$fcstDayHourlyData[i].fcstDayData3.humidity}</div></div>
                                    <div class="forecast-content"><div>12h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i].fcstDayData4.icon}></img><div>${$fcstDayHourlyData[i].fcstDayData4.temp}</div><div>${$fcstDayHourlyData[i].fcstDayData4.windSpd}</div><div>${$fcstDayHourlyData[i].fcstDayData4.windDir}</div><div>${$fcstDayHourlyData[i].fcstDayData4.humidity}</div></div>
                                    <div class="forecast-content"><div>15h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i].fcstDayData5.icon}></img><div>${$fcstDayHourlyData[i].fcstDayData5.temp}</div><div>${$fcstDayHourlyData[i].fcstDayData5.windSpd}</div><div>${$fcstDayHourlyData[i].fcstDayData5.windDir}</div><div>${$fcstDayHourlyData[i].fcstDayData5.humidity}</div></div>
                                    <div class="forecast-content"><div>18h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i].fcstDayData6.icon}></img><div>${$fcstDayHourlyData[i].fcstDayData6.temp}</div><div>${$fcstDayHourlyData[i].fcstDayData6.windSpd}</div><div>${$fcstDayHourlyData[i].fcstDayData6.windDir}</div><div>${$fcstDayHourlyData[i].fcstDayData6.humidity}</div></div>
                                    <div class="forecast-content"><div>21h00</div><img class="forecast-img" src=${$fcstDayHourlyData[i].fcstDayData7.icon}></img><div>${$fcstDayHourlyData[i].fcstDayData7.temp}</div><div>${$fcstDayHourlyData[i].fcstDayData7.windSpd}</div><div>${$fcstDayHourlyData[i].fcstDayData7.windDir}</div><div>${$fcstDayHourlyData[i].fcstDayData7.humidity}</div></div>
                                    `;
        }
    }

    for (let i = 0; i < $hourlyData.length; ++i) {
        hourByHour.innerHTML += `<div class="hour-by-hour_col"><div class="hour-by-hour_hour">${$hourlyData[i].hour}</div><img class="hour-by-hour_img" src=${$hourlyData[i].icon}></img><div class="hour-by-hour_temp">${$hourlyData[i].temp}°C</div></div>`;
    }
}


inputCity.addEventListener('keyup', function (event) {
    manageFocus(inputCity);
    if (event.keyCode == 13) {
        event.preventDefault();
        const $city = inputCity.value;
        resetHourByHourHTML();
        fetchWeatherData($city);
    }
});

function manageFocus(element) {
    element.addEventListener('focusin', function () {
        autoCompletList.style.visibility = "visible";
    });
    element.addEventListener('focusout', function () {
        autoCompletList.style.visibility = "hidden";
    });
}
geolocBtn.addEventListener('click', function (event) {
    event.preventDefault();
    resetHourByHourHTML();
    getGPSPosition();
});

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const $city = inputCity.value;
    resetHourByHourHTML();
    fetchWeatherData($city);
})

/** 
 * Les onglets
 */

function manageTabHover() {
    const tabs = document.querySelectorAll('.tabs a');
    for (let i = 0; i < tabs.length; ++i) {
        tabs[i].addEventListener('mouseover', function () {
            setClassActive(this);
        })
    }
}

function setClassActive(link) {
    let tabsWrapper = link.parentNode.parentNode.parentNode;
    let li = link.parentNode;

    if (li.classList.contains('active')) {
        return false;
    }

    tabsWrapper.querySelector('.tabs .active').classList.remove('active');
    tabsWrapper.querySelector('.tab-content.active').classList.remove('active');
    li.classList.add('active');
    tabsWrapper.querySelector(link.getAttribute('href')).classList.add('active');
}

manageTabHover();

/*Fin des onglets*/