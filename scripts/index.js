// autoComplete.js on type event emitter
document.querySelector("#autoComplete").addEventListener("autoComplete", function (event) {
  // console.log(event.detail);
  // console.log(autoCompletejs);
});

// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
  data: {
    src: async function () {
      // Loading placeholder text
      document.querySelector("#autoComplete").setAttribute("placeholder", "Chargement...");
      // Fetch External Data Source
      const source = await fetch("https://cors-anywhere.herokuapp.com/https://www.prevision-meteo.ch/services/json/list-cities");
      const data = await source.json();
      // Returns Fetched data
      return Object.values(data);
    },
    key: ["name", "npa", "region", "country"],
  },
  sort: function (a, b) {
    if (a.match < b.match) {
      return -1;
    }
    if (a.match > b.match) {
      return 1;
    }
    return 0;
  },
  query: {
    manipulate: function (query) {
      return query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },
  },
  trigger: {
    event: ["input","focusin", "focusout"],
    condition: function (query) {
      return !!query.replace(/ /g, "").length && query !== "hamburger";
    },
  },
  placeHolder: "indiquez une ville",
  selector: "#autoComplete",
  debounce: 0,
  searchEngine: "loose",
  highlight: true,
  maxResults: 5,
  resultsList: {
    render: true,
    container: function (source) {
      source.setAttribute("id", "autoComplete_list");
    },
    element: "ul",
    destination: document.querySelector("#autoComplete"),
    position: "afterend",
  },
  resultItem: {
    content: function (data, source) {
      source.innerHTML = data.match;
    },
    element: "li",
  },
  noResults: function () {
    const result = document.createElement("li");
    result.setAttribute("class", "no_result");
    result.setAttribute("tabindex", "1");
    result.innerHTML = "No Results";
    document.querySelector("#autoComplete_list").appendChild(result);
  },
  onSelection: function (feedback) {
    document.querySelector("#autoComplete").blur();
    const selection = feedback.selection.value.url;
    // Render selected choice to selection div
    document.querySelector(".selection").innerHTML = selection;
    // Clear Input
    document.querySelector("#autoComplete").value = "";
    // Change placeholder with the selected value
    // document.querySelector("#autoComplete").setAttribute("placeholder", selection);
    // Concole log autoComplete data feedback
    // console.log(feedback);
    $city = selection
    resetHourByHourHTML();
    fetchWeatherData($city);
  },
});

// Toggle Search Engine Type/Mode
document.querySelector(".toggeler").addEventListener("click", function () {
  // Holdes the toggle buttin alignment
  const toggele = document.querySelector(".toggele").style.justifyContent;
  if (toggele === "flex-start" || toggele === "") {
    // Set Search Engine mode to Loose
    document.querySelector(".toggele").style.justifyContent = "flex-end";
    document.querySelector(".toggeler").innerHTML = "Loose";
    autoCompletejs.searchEngine = "loose";
  } else {
    // Set Search Engine mode to Strict
    document.querySelector(".toggele").style.justifyContent = "flex-start";
    document.querySelector(".toggeler").innerHTML = "Strict";
    autoCompletejs.searchEngine = "strict";
  }
});
// Toggle results list and other elements
// const action = function (action) {
  // const selection = document.querySelector(".selection");
  // if (action === "dim") {
    // selection.style.opacity = 1;
  // } else {
    // selection.style.opacity = 0.1;
//   }
// };

// Toggle event for search input
// showing & hidding results list onfocus / blur
["focus", "blur"].forEach(function (eventType) {
  const resultsList = document.querySelector("#autoComplete_list");
  document.querySelector("#autoComplete").addEventListener(eventType, function () {
    // Hide results list & show other elemennts
    if (eventType === "blur") {
      // action("dim");
      resultsList.style.visibility = "hidden";
    } else if (eventType === "focus") {
      // Show results list & hide other elemennts
      // action("light");
      resultsList.style.visibility = "visible";
    }
  });
});
