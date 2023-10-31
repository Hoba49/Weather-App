// const mapsapi = {
//     key: "AIzaSyDQGLLelElN46E6rNCdpMOhFtOUWlXwu3c",
//     base: "https://maps.googleapis.com/maps/api/geocode/json"

// }
const api = {
    key: "3a9c0c56b24fcb46815495e5e8589b92",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box')
searchbox.addEventListener('keypress', setQuery)

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value)
        // console.log(searchbox.value)
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather =>{
            return weather.json()
        }).then(displayResults)
}

function displayResults(weather){
    console.log(weather)
    const city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`
    
    const now = new Date()
    const date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now)

    const temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`

    const weather_el = document.querySelector('.current .weather')
    weather_el.innerText = weather.weather[0].main

    const hilow = document.querySelector('.hi-low')
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()]
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
}
