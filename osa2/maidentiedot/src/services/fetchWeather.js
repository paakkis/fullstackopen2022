import axios from 'axios'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const fetchWeather = async props => {
    const capital = props[0]
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`)
    return response.data
}

export default fetchWeather;