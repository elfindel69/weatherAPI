
const body = document.body;
const inputCity = document.querySelector("#city")
const btnGo = document.querySelector("#btnGo")
const btnCurrentTown = document.querySelector("#currentTown")
let data = {}

const token = "6c8b1266b8ebf8e85b0fcacc35019009"
const bonus_token = "94f2728004614480bbe8c9744d68a142"

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
     if(body.classList.length > 0){
         let elem = body.classList.item(0)
         body.classList.remove(elem)
     }
     switch (data.weather[0].main){
         case "Clouds" : body.classList.toggle("cloudy"); break;
         case "Drizzle" : body.classList.toggle("rainy"); break;
         case "Clear" : body.classList.toggle("sunny"); break;
         case "Rain" : body.classList.toggle("rainy"); break;
         case "Thunderstorm" : body.classList.toggle("stormy"); break;
         case "Snow" : body.classList.toggle("snowy"); break;
         case "Fog" : body.classList.toggle("fog"); break;
         default: body.classList.toggle("cloudy")
     }
}

function getWeather(city){
    let req = new XMLHttpRequest();
    req.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${token}&units=metric&lang=fr`)
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
    req.open("GET",`https://api.ipgeolocation.io/ipgeo?apiKey=${bonus_token}&ip=${ip}`)
    req.onload =()=>{
       let data_bonus=JSON.parse(req.responseText)

        country = data_bonus.country_name;
        state = data_bonus.state_prov;
        city = data_bonus.city;
        let coordinates = city+","+state+","+country
        getWeather(coordinates);
    };
    req.send();
}

function getIPAddress() {
    let req = new XMLHttpRequest();
    req.open("GET",`https://api.ipify.org`)
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

