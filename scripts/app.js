
const city = document.querySelector('.city');
const currentCondition = document.querySelector('.current_condition');
const temperature = document.querySelector('.temperature');
const currentConditionIcon = document.querySelector('.current_condition_icon');
const inputCity = document.querySelector('.input_city');
const hour = document.querySelector('.hour');
const humidity = document.querySelector('.humidity');
const tempMax = document.querySelector('.tmax');
const tempMin = document.querySelector('.tmin');


let $cityName;
let $currentCondition;
let $currentConditionIcon;
let $temperature;
let $tempMin;
let $tempMax;
let $date;
let $hour;
let $humidity;
let $windDir;
let $winSpd;

let $city;
let url;

const actionFetch = function(){
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response)
        $cityName = response.city_info.name;
        $currentCondition = response.current_condition.condition;
        $currentConditionIcon = response.current_condition.icon;
        $temperature = response.current_condition.tmp;
        $tempMin  = response.fcst_day_0.tmin;
        $tempMax  = response.fcst_day_0.tmax;
        $date  = response.current_condition.date;
        $hour  = response.current_condition.hour;
        $humidity  = response.current_condition.humidity;
        $windDir  = response.current_condition.wnd_dir;
        $winSpd  = response.current_condition.wnd_spd;
        
        city.innerHTML = $cityName;
        currentCondition.innerHTML = $currentCondition;
        currentConditionIcon.innerHTML = `<img src=${$currentConditionIcon}>`;
        temperature.innerHTML = $temperature;
        hour.innerHTML = $hour;
        humidity.innerHTML = $humidity;
        tempMax.innerHTML = $tempMax;
        tempMin.innerHTML = $tempMin;
    })
    .catch(function(error){
        alert("Cette ville n'éxiste pas ou n'est pas répertoriée." + error);
        localStorage.clear();
        console.log("Erreur : " + error);
    })
}


function getCity(){
    let cityLocalStorage = localStorage.getItem('$city');
    
    if(cityLocalStorage == '' || cityLocalStorage == null){
        $city = 'toulon';
        localStorage.setItem('$city', $city);
    }else if (cityLocalStorage !== '' || cityLocalStorage !== null ){
        $city = cityLocalStorage;
    }
    url = `https://www.prevision-meteo.ch/services/json/` + $city;
    actionFetch();
}

function getInputCity(event){
    event.preventDefault();
    $city = inputCity.value;
    localStorage.setItem('$city', $city);
    url = `https://www.prevision-meteo.ch/services/json/` + $city;
    actionFetch();
}

  



getCity();

inputCity.addEventListener('change', getInputCity)