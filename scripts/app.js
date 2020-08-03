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
let hourByHour = document.querySelector('.hour-by-hour');
const hourByHourConainer = document.querySelector('.hour-by-hour-container');
const geolocBtn = document.querySelector('.geoloc');

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

let $day = [];
let $forecastData = [];
let $hourlyData = [];


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
            $conditionByHour = response.fcst_day_0.hourly_data;
            for (let i = 0; i < 5; ++i) {
                const dayData = {
                    shortDay: response["fcst_day_" + i].day_short,
                    currentConditionIconDay: response["fcst_day_" + i].icon,
                    tempMinDay: response["fcst_day_" + i].tmin,
                    tempMaxDay: response["fcst_day_" + i].tmax
                }
                $forecastData.push(dayData);
            }



            for (i = 0; i < 24; ++i) {
                const hourData = {
                    hourByHourData: $conditionByHour[i + 'H00'].ICON
                }
                $hourlyData.push(hourData);
                
            }

            setInfos();



        })
        .catch(function (error) {
            alert("Cette ville n'éxiste pas ou n'est pas répertoriée." + error);
            localStorage.clear();
            console.log("Erreur : " + error);
        })
}



function putInfoIn() {
    for (let i = 1; i <= 5; ++i) {
        const dayNumb = {
            day: document.querySelector('.link' + i)
        }
        $day.push(dayNumb);
        for (let i = 0; i < $day.length; ++i) {
            $day[i].day.innerHTML = `<div>${$forecastData[i].shortDay}</div>
                                    <img src="${$forecastData[i].currentConditionIconDay}"></img>
                                    <div class="temp-max">${$forecastData[i].tempMaxDay}°C</div><div class="temp-min">${$forecastData[i].tempMinDay}°C</div>
                                    `;
        }
    }

    for (let i = 0; i < $hourlyData.length; ++i) {
        hourByHour.innerHTML += `<img class"child" src=${$hourlyData[i].hourByHourData}></img>`;
    }



}

function setInfos() {
    city.innerHTML = $cityName;
    currentCondition.innerHTML = $currentCondition;
    currentConditionIcon.innerHTML = `<img src=${$currentConditionIcon}>`;
    temperature.innerHTML = `Il fait ${$temperature}°C`;
    hour.innerHTML = `Prévision pour ${$hour}h`;
    humidity.innerHTML = `Il y a ${$humidity}% d'humidité`;
    tempMinMax.innerHTML = `<div class="temp-max">${$forecastData[0].tempMaxDay}°C</div><div class="temp-min">${$forecastData[0].tempMinDay}°C</div>`;
    windSpd.innerHTML = `La vitesse du vent est de ${$windSpd}km/h`;
    windDir.innerHTML = `La direction du vent est ${$windDir}`;
    putInfoIn();
    
    return;
}

function getPos() {
    if ("geolocation" in navigator) {
        console.log('Géolocalisation activée');

        navigator.geolocation.getCurrentPosition(function (position) {
            $posLat = position.coords.latitude, $posLong = position.coords.longitude;
            $urlApi = `https://geo.api.gouv.fr/communes?lat=${$posLat}&lon=${$posLong}&fields=code&format=json&geometry=centre`;

            fetch($urlApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response)
                    $myCity = response[0].nom;
                    $url = `https://www.prevision-meteo.ch/services/json/` + $myCity;
                    actionFetch()
                    console.log($myCity);
                })
                .catch(function (error) {
                    console.log("Erreur api: " + error);
                })
        });
    } else {
        console.log("La géolocalisation n'est pas activée");
    }
}

// function getCity() {
//     let cityLocalStorage = localStorage.getItem('$city');
//     if (cityLocalStorage == '' || cityLocalStorage == null) {
//         $city = 'toulon';
//         localStorage.setItem('$city', $city);
//     } else if (cityLocalStorage !== '' || cityLocalStorage !== null) {
//         $city = cityLocalStorage;
//     }
//     $url = `https://www.prevision-meteo.ch/services/json/` + $city;
// }

function getInputCity(event) {

}

function addNew(){
    let child = hourByHourConainer.firstElementChild;
    hourByHourConainer.removeChild(child);
    let parent = document.createElement('div');
    parent.className = 'hour-by-hour';
    hourByHourConainer.appendChild(parent)
    hourByHour = document.querySelector('.hour-by-hour');
    $hourlyData = [];
}


// getCity();
getPos();
geolocBtn.addEventListener('click', getPos);

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
    getInputCity();
})



/*onglets a mettre dans un nouveau script*/

const tabs = document.querySelectorAll('.tabs a');
let li;

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

/*End onglets*/

/**Heure par heure**/
function hourNow() {
    var date = new Date();
    var hour = date.getHours();
    return hour;

};






/**End heure par heure**/