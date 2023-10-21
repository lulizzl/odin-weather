console.log('hello world')

function createReport ( condition, tempC, tempF, feelsC, feelsF, windDeg, windDir, windKph, windMph, humidity, rainIn, rainMm, pressureIn, pressureMb, uv, country, time, cityName) {
    return { condition, tempC, tempF, feelsC, feelsF, windDeg, windDir, windKph, windMph, humidity, rainIn, rainMm, pressureIn, pressureMb, uv, country, time, cityName }
}

function createForecast ( date, sunrise, sunset, maxTempC, maxTempF, minTempC, minTempF, condition ) {
    return { date, sunrise, sunset, maxTempC, maxTempF, minTempC, minTempF, condition }
}

searchBtn = document.querySelector('#searchBtn')
city = document.querySelector('#query')
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    getInfo.getWeather(city.value)
    getInfo.getForecast(city.value)
})




const switchUnits = (function () {

    const t = document.querySelector('.temperature');
    const f = document.querySelector('.feelsLike');
    const ws = document.querySelector('.windSpeed');
    const r = document.querySelector('.rain');
    const minTemp1 = document.querySelector('#low1')
    const maxTemp1 = document.querySelector('#high1')
    const minTemp2 = document.querySelector('#low2')
    const maxTemp2 = document.querySelector('#high2')
    const minTemp3 = document.querySelector('#low3')
    const maxTemp3 = document.querySelector('#high3')

    const makeTheSwitchForecast = () => {console.log('forecast')
    
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=aa3799e0f47d4927a2f65418231810&q=${city.value}&days=3&aqi=no&alerts=no`)
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            const maxTempC1 = response.forecast.forecastday[0].day.maxtemp_c
            const maxTempF1 = response.forecast.forecastday[0].day.maxtemp_f
            const minTempC1 = response.forecast.forecastday[0].day.mintemp_c
            const minTempF1 = response.forecast.forecastday[0].day.mintemp_f
            const maxTempC2 = response.forecast.forecastday[1].day.maxtemp_c
            const maxTempF2 = response.forecast.forecastday[1].day.maxtemp_f
            const minTempC2 = response.forecast.forecastday[1].day.mintemp_c
            const minTempF2 = response.forecast.forecastday[1].day.mintemp_f
            const maxTempC3 = response.forecast.forecastday[2].day.maxtemp_c
            const maxTempF3 = response.forecast.forecastday[2].day.maxtemp_f
            const minTempC3 = response.forecast.forecastday[2].day.mintemp_c
            const minTempF3 = response.forecast.forecastday[2].day.mintemp_f
            if (switchBtn.classList.contains('europe')) {
                minTemp1.textContent = `l : ${minTempF1} ° f`
                maxTemp1.textContent = `h : ${maxTempF1} ° f`
                minTemp2.textContent = `l : ${minTempF2} ° f`
                maxTemp2.textContent = `h : ${maxTempF2} ° f`
                minTemp3.textContent = `l : ${minTempF3} ° f`
                maxTemp3.textContent = `h : ${maxTempF3} ° f`
            }
            else {
                minTemp1.textContent = `l : ${minTempC1} ° c`
                maxTemp1.textContent = `h : ${maxTempC1} ° c`
                minTemp2.textContent = `l : ${minTempC2} ° c`
                maxTemp2.textContent = `h : ${maxTempC2} ° c`
                minTemp3.textContent = `l : ${minTempC3} ° c`
                maxTemp3.textContent = `h : ${maxTempC3} ° c`
            }
            
        })
    }
        

    const makeTheSwitch = () => {
        console.log('hi')

        fetch(`https://api.weatherapi.com/v1/current.json?key=aa3799e0f47d4927a2f65418231810&q=${city.value}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            console.log(response)
            const tempC = response.current.temp_c
            const tempF = response.current.temp_f
            const feelsC = response.current.feelslike_c
            const feelsF = response.current.feelslike_f
            const windKph = response.current.wind_kph
            const windMph = response.current.wind_mph
            const rainIn = response.current.precip_in
            const rainMm = response.current.precip_mm
            if (switchBtn.classList.contains('europe')) {
                t.textContent = `${tempF} ° f`
                f.textContent = `feels like : ${feelsF} ° f`
                ws.textContent = `${windMph} mph`
                r.textContent = `${rainIn} in`
            }
            else {
                t.textContent = `${tempC} ° c`
                f.textContent = `feels like : ${feelsC} ° c`
                ws.textContent = `${windKph} kph`
                r.textContent = `${rainMm} mm`
            }
            })
        }

    return { makeTheSwitch, makeTheSwitchForecast }
})()


const getInfo = (function () {

    const getWeather = (city) => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=aa3799e0f47d4927a2f65418231810&q=${city}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            const condition = response.current.condition.text.toLowerCase()
            const tempC = response.current.temp_c
            const tempF = response.current.temp_f
            const feelsC = response.current.feelslike_c
            const feelsF = response.current.feelslike_f
            const windDeg = response.current.wind_degree
            const windDir = response.current.wind_dir
            const windKph = response.current.wind_kph
            const windMph = response.current.wind_mph
            const humidity = response.current.humidity
            const rainIn = response.current.precip_in
            const rainMm = response.current.precip_mm
            const pressureIn = response.current.pressure_in
            const pressureMb = response.current.pressure_mb
            const uv = response.current.uv
            const country = response.location.country.toLowerCase()
            const time = response.location.localtime
            const cityName = response.location.name.toLowerCase()
            let weatherReport = createReport(condition, tempC, tempF, feelsC, feelsF, windDeg, windDir, windKph, windMph, humidity, rainIn, rainMm, pressureIn, pressureMb, uv, country, time, cityName)
            console.log(weatherReport.rainMm)
            updateDOMReport(weatherReport)
        })
        .catch(function(reponse) {
            console.log("We couldn't find that city. Perhaps you should check your spelling ?")
        })
    }

    const getForecast = (city) => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=aa3799e0f47d4927a2f65418231810&q=${city}&days=3&aqi=no&alerts=no`)
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            let forecastDays = []
            for (let i = 0; i < 3; i++) {
                const day = response.forecast.forecastday[i].date
                const sunrise = response.forecast.forecastday[i].astro.sunrise.toLowerCase()
                const sunset = response.forecast.forecastday[i].astro.sunset.toLowerCase()
                const maxTempC = response.forecast.forecastday[i].day.maxtemp_c
                const maxTempF = response.forecast.forecastday[i].day.maxtemp_f
                const minTempC = response.forecast.forecastday[i].day.mintemp_c
                const minTempF = response.forecast.forecastday[i].day.mintemp_f
                const condition = response.forecast.forecastday[i].day.condition.text.toLowerCase()
                newDay = createForecast(day, sunrise, sunset, maxTempC, maxTempF, minTempC, minTempF, condition)
                forecastDays.push(newDay)
            }
            updateDOMForecast(forecastDays)
            console.log('done')
        })
    }

    return {
        getWeather,
        getForecast,
    }
})()

function updateDOMReport(report) {
    const c = document.querySelector('.condition')
    const t = document.querySelector('.temperature')
    const f = document.querySelector('.feelsLike')
    const wdeg = document.querySelector('.windDeg')
    const wdir = document.querySelector('.windDir')
    const ws = document.querySelector('.windSpeed')
    const h = document.querySelector('.humidity')
    const r = document.querySelector('.rain')
    const u = document.querySelector('.uv')
    const cou = document.querySelector('.country')
    const tim = document.querySelector('.time')
    const cn = document.querySelector('.city')
    cn.textContent = report.cityName
    cou.textContent = report.country
    c.textContent = `condition : ${report.condition}`
    t.textContent = `${report.tempC} ° c`
    f.textContent = `feels like : ${report.feelsC} ° c`
    wdeg.textContent = `${report.windDeg} °`
    wdir.textContent = report.windDir.toLowerCase()
    ws.textContent = `${report.windKph} kph`
    h.textContent = `${report.humidity} %`
    r.textContent = `${report.rainMm} mm`
    u.textContent = report.uv
    tim.textContent = `local time : ${report.time}`

}

function updateDOMForecast(forecast) {
    const day1 = document.querySelector('#day1')
    const sunrise1 = document.querySelector('#sunrise1')
    const sunset1 = document.querySelector('#sunset1')
    const minTemp1 = document.querySelector('#low1')
    const maxTemp1 = document.querySelector('#high1')
    const condition1 = document.querySelector('#cond1')
    const day2 = document.querySelector('#day2')
    const sunrise2 = document.querySelector('#sunrise2')
    const sunset2 = document.querySelector('#sunset2')
    const minTemp2 = document.querySelector('#low2')
    const maxTemp2 = document.querySelector('#high2')
    const condition2 = document.querySelector('#cond2')
    const day3 = document.querySelector('#day3')
    const sunrise3 = document.querySelector('#sunrise3')
    const sunset3 = document.querySelector('#sunset3')
    const minTemp3 = document.querySelector('#low3')
    const maxTemp3 = document.querySelector('#high3')
    const condition3 = document.querySelector('#cond3')
    day1.textContent = forecast[0].date
    sunrise1.textContent = forecast[0].sunrise
    sunset1.textContent = forecast[0].sunset
    minTemp1.textContent = `l : ${forecast[0].minTempC} ° c`
    maxTemp1.textContent = `h : ${forecast[0].maxTempC} ° c`
    condition1.textContent = forecast[0].condition
    day2.textContent = forecast[1].date
    sunrise2.textContent = forecast[1].sunrise
    sunset2.textContent = forecast[1].sunset
    minTemp2.textContent = `l : ${forecast[1].minTempC} ° c`
    maxTemp2.textContent = `h : ${forecast[1].maxTempC} ° c`
    condition2.textContent = forecast[1].condition
    day3.textContent = forecast[2].date
    sunrise3.textContent = forecast[2].sunrise
    sunset3.textContent = forecast[2].sunset
    minTemp3.textContent = `l : ${forecast[2].minTempC} ° c`
    maxTemp3.textContent = `h : ${forecast[2].maxTempC} ° c`
    condition3.textContent = forecast[2].condition
}

switchBtn = document.querySelector('#switchBtn')
switchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchUnits.makeTheSwitch()
    switchUnits.makeTheSwitchForecast()
    switchBtn.classList.toggle('europe')
})