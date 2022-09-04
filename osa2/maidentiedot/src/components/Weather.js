import React, { useEffect, useState } from "react";
import fetchWeather from "../services/fetchWeather";

const Weather = (props) => {

    const [weatherData, setWeatherData] = useState()
  
    useEffect(() => {
        fetchWeather(props.capital)
            .then(response => {
                setWeatherData(response)
            })
    }, [])

    if (weatherData === undefined){
        return <p>Weather data not found.</p>
    } else { 
        console.log(weatherData)
        return (
            <div>
                <h2>Weather in {props.capital}</h2>
                <p>temperature {weatherData.main.temp} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather not found."></img>
                <p>wind {weatherData.wind.speed} m/s</p>
            
            </div>
        )
    }

}

export default Weather