
const body = document.body;
const inputCity = document.querySelector("#city")
const btnGo = document.querySelector("#btnGo")
const btnCurrentTown = document.querySelector("#currentTown")
let data = {}

const token = "6c8b1266b8ebf8e85b0fcacc35019009"
const bonus_token = "74d59e5414ffd312ada485046e8d73ff"
let ip = ""




function prepareContent() {
    console.log("test")
    console.log(data)
    const content = document.querySelector("#content");
    let contentHTML = `<p>${data.weather[0].description}</p>
     <p>température = ${data.main.temp} °C</p>
     <p>minimum = ${data.main.temp_min} °C</p>
     <p>maximum = ${data.main.temp_max} °C</p>
     <p>pression = ${data.main.pressure} hP</p>
     <p>humidité de l'air = ${data.main.humidity} %</p>
     <p>vitesse moyenne du vent = ${Math.trunc(data.wind.speed * 3.6)} km/h</p>
     <p>vitesse rafales= ${data.wind.gust?Math.trunc(data.wind.gust * 3.6) :0} km/h</p>
    `;

     content.innerHTML  = contentHTML;
    body.classList = []
     switch (data.weather[0].main){
         case "Clouds" : body.classList.add("cloudy"); break;
         case "Drizzle" : body.classList.add("rainy"); break;
         case "Clear" : body.classList.add("sunny"); break;
         case "Rain" : body.classList.add("rainy"); break;
         case "Extreme" : body.classList.add("stormy"); break;
         case "Snow" : body.classList.add("snowy"); break;
         case "Fog" : body.classList.add("fog"); break;
         default: body.classList.add("sunny")
     }
}

function getWeather(city){
    let req = new XMLHttpRequest();
    req.open("GET",`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${token}&units=metric&lang=fr`)
    req.onload =()=>{
        const h2 = document.querySelector("h2")
        h2.textContent = city
        data = JSON.parse(req.responseText)

        prepareContent()
    };
    req.send();
}


function getCityByIp(ip) {
    let city = ""
    let state = ""
    let country = ""
    let req = new XMLHttpRequest();
    req.open("GET",`http://api.ipstack.com/${ip}?access_key=${bonus_token}`)
    req.onload =()=>{
       let data_bonus=JSON.parse(req.responseText)
        country = data_bonus.country_name;
        state = data_bonus.region_code;
        city = data_bonus.city;
        let coordinates = city+","+state+","+country
        getWeather(coordinates);
    };
    req.send();
}

function getIPAddress() {
    let req = new XMLHttpRequest();
    req.open("GET",`http://api.ipify.org`)
    req.onload =()=>{
       ip=(req.responseText)

        getCityByIp(ip);
    };
    req.send();
}

{
    getIPAddress()
    btnGo.addEventListener("click",()=>getWeather(inputCity.value))
    btnCurrentTown.addEventListener("click",()=>getIPAddress())
}