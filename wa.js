
let input = document.querySelector("#cityInput");
let btn = document.querySelector("#searchBtn");
let result = document.querySelector("#result");
let icon = document.querySelector("#icon");
let theme = document.getElementById("weatherTheme");
let suggestionsBox = document.getElementById("suggestions");

let currentIndex = -1;
let timeout = null;

btn.addEventListener("click", getWeather);

input.addEventListener("keydown", function(e){
    let items = document.querySelectorAll(".suggestion-item");

    if(e.key === "ArrowDown"){
        currentIndex++;
        if(currentIndex >= items.length) currentIndex = 0;
        highlight(items);
    }
    else if(e.key === "ArrowUp"){
        currentIndex--;
        if(currentIndex < 0) currentIndex = items.length - 1;
        highlight(items);
    }
    else if(e.key === "Enter"){
        if(currentIndex > -1){
            items[currentIndex].click();
        } else {
            suggestionsBox.innerHTML = "";
            getWeather();
        }
    }
});

function highlight(items){
    items.forEach(item => item.classList.remove("active"));
    if(items[currentIndex]){
        items[currentIndex].classList.add("active");
    }
}

input.addEventListener("input", function(){
    let value = input.value.trim();
    clearTimeout(timeout);
    if(value.length < 2){
        suggestionsBox.innerHTML = "";
        return;
    }
    timeout = setTimeout(() => {
        getCitySuggestions(value);
    }, 300);
});

async function getCitySuggestions(query){
    let url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`;
    try{
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "78a647c4c322a7b55c20cafa30dde036",
                "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
            }
        });
        let data = await response.json();
        suggestionsBox.innerHTML = "";
        currentIndex = -1;
        data.data.forEach(city => {
            let div = document.createElement("div");
            div.classList.add("suggestion-item");
            div.innerText = `${city.city}, ${city.country}`;
            div.addEventListener("click", function(){
                input.value = city.city;
                suggestionsBox.innerHTML = "";
                getWeather();
            });
            suggestionsBox.appendChild(div);
        });
    } catch(error){
        console.log(error);
    }
}

document.addEventListener("click", function(e){
    if(!e.target.closest("#cityInput")){
        suggestionsBox.innerHTML = "";
    }
});

function saveHistory(city){
    let history = JSON.parse(localStorage.getItem("history")) || [];
    if(!history.includes(city)){
        history.unshift(city);
    }
    localStorage.setItem("history", JSON.stringify(history.slice(0,5)));
}

function showHistory(){
    let history = JSON.parse(localStorage.getItem("history")) || [];
    suggestionsBox.innerHTML = "";
    history.forEach(city => {
        let div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.innerText = city;
        div.onclick = () => {
            input.value = city;
            getWeather();
        };
        suggestionsBox.appendChild(div);
    });
}

input.addEventListener("focus", showHistory);

async function getWeather(){
    let city = input.value.trim();
    if(city === ""){
        alert("Enter city name");
        return;
    }

    let apiKey = "78a647c4c322a7b55c20cafa30dde036";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    result.innerText = "Loading...";
    icon.src = "";

    try{
        let response = await fetch(url);
        let data = await response.json();

        if(data.cod !== 200){
            result.innerText = "City not found!";
            theme.href = "";
            return;
        }
        let temp = data.main.temp;
let weather = data.weather[0].main;
let iconCode = data.weather[0].icon;

let tempEl = document.querySelector(".temp");
let weatherEl = document.querySelector(".weather-type");
let cityEl = document.querySelector(".city");

tempEl.innerText = `${temp}°C`;
weatherEl.innerText = weather;
cityEl.innerText = city;

icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        saveHistory(city);

        if(iconCode.includes("n")){
            document.body.classList.add("night");
        } else {
            document.body.classList.remove("night");
        }

        let weatherMap = {
            Clear: "sunny.css",
            Clouds: "cloudy.css",
            Rain: "rainy.css",
            Drizzle: "rainy.css",
            Thunderstorm: "rainy.css",
            Haze: "cloudy.css",
            Mist: "cloudy.css",
            Smoke: "cloudy.css"
        };
        theme.href = weatherMap[weather] || "sunny.css";

    } catch(error){
        result.innerText = "Something went wrong!";
        theme.href = "";
        console.log(error); 
    }






}