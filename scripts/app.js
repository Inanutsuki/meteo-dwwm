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

const dayOneLink = document.querySelector('.link')
const dayTwoLink = document.querySelector('a[href="#day_two"]')
const dayThreeLink = document.querySelector('a[href="#day_three"]')
const dayFourLink = document.querySelector('a[href="#day_four"]')
const dayFiveLink = document.querySelector('a[href="#day_five"]')

let $cityName;
let $currentCondition;
let $currentConditionIcon;
let $temperature;
let $date;
let $hour;
let $humidity;
let $windDir;
let $windSpd;

/**day one**/
let $longDayOne;
let $shortDayOne;
let $tempMinDayOne;
let $tempMaxDayOne;
let $currentConditionIconDayOne;
/**day two**/
let $longDayTwo;
let $shortDayTwo;
let $tempMinDayTwo;
let $tempMaxDayTwo;
let $currentConditionIconDayTwo;
/**day three**/
let $longDayThree;
let $shortDayThree;
let $tempMinDayThree;
let $tempMaxDayThree;
let $currentConditionIconDayThree;
/**day four**/
let $longDayFour;
let $shortDayFour;
let $tempMinDayFour;
let $tempMaxDayFour;
let $currentConditionIconDayFour;
/**day five**/
let $longDayFive;
let $shortDayFive;
let $tempMinDayFive;
let $tempMaxDayFive;
let $currentConditionIconDayFive;


let $city;
let $url;

/**ne les reconnait plus comme etant des variables ??? */

// function putInfoIn() {
//     let number = [
//         One
//     ]
//     for (let i = 0; i < number.length; i++) {

//         let day = [
//             // $shortDayOne,
//             // $currentConditionIconDayOne,
//             // $tempMinDayOne,
//             // $tempMaxDayOne
//         ]
//         let a = $shortDay + number[i, 0];
//         let b = $currentConditionIconDay + number[i, 0];
//         let c = $tempMinDay + number[i, 0];
//         let d = $tempMaxDay + number[i, 0];
//         day.push(a, b, c, d)
//         for (let i = 0; i < day.length; i++) {
//             console.log(day[i]);
//             dayOneLink.innerHTML = '<div>' + day[i, 0] + '</div><img src="' + day[i, 1] + '"></img><div>' + day[i, 2] + '°C / ' + day[i, 3] + '°C</div>';
//         }
//     }
// }

function putInfoIn() {

    let day = [
        $shortDayOne,
        $currentConditionIconDayOne,
        $tempMinDayOne,
        $tempMaxDayOne
    ]
    for (let i = 0; i < day.length; i++) {
        console.log(day[i]);
        dayOneLink.innerHTML = '<div>' + day[i, 0] + '</div><img src="' + day[i, 1] + '"></img><div>' + day[i, 2] + '°C / ' + day[i, 3] + '°C</div>';
    }
}



function setInfos() {
    city.innerHTML = $cityName;
    currentCondition.innerHTML = $currentCondition;
    currentConditionIcon.innerHTML = `<img src=${$currentConditionIcon}>`;
    temperature.innerHTML = `Il fait ${$temperature}°C`;
    hour.innerHTML = `Prévision pour ${$hour}h`;
    humidity.innerHTML = `Il y a ${$humidity}% d'humidité`;
    tempMinMax.innerHTML = `${$tempMaxDayOne}°C / ${$tempMinDayOne}°C`;
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

            /**day one**/
            $shortDayOne = response.fcst_day_0.day_short;
            $currentConditionIconDayOne = response.fcst_day_0.icon;
            $tempMaxDayOne = response.fcst_day_0.tmax;
            $tempMinDayOne = response.fcst_day_0.tmin;
            $longDayOne = response.fcst_day_0.day_long;
            /**day two**/
            $shortDayTwo = response.fcst_day_1.day_short;
            $currentConditionIconDayTwo = response.fcst_day_1.icon;
            $tempMaxDayTwo = response.fcst_day_1.tmax;
            $tempMinDayTwo = response.fcst_day_1.tmin;
            $longDayTwo = response.fcst_day_1.day_long;
            /**day three**/
            $shortDayThree = response.fcst_day_2.day_short;
            $currentConditionIconDayThree = response.fcst_day_2.icon;
            $tempMaxDayThree = response.fcst_day_2.tmax;
            $tempMinDayThree = response.fcst_day_2.tmin;
            $longDayThree = response.fcst_day_2.day_long;
            /**day four**/
            $shortDayFour = response.fcst_day_3.day_short;
            $currentConditionIconDayFour = response.fcst_day_3.icon;
            $tempMaxDayFour = response.fcst_day_3.tmax;
            $tempMinDayFour = response.fcst_day_3.tmin;
            $longDayFour = response.fcst_day_3.day_long;
            /**day five**/
            $shortDayFive = response.fcst_day_4.day_short;
            $currentConditionIconDayFive = response.fcst_day_4.icon;
            $tempMaxDayFive = response.fcst_day_4.tmax;
            $tempMinDayFive = response.fcst_day_4.tmin;
            $longDayFive = response.fcst_day_4.day_long;

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

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('mouseover', function (event) {
        setClassActive(this);
    })
}

/*End onglets*/