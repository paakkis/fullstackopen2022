import axios from 'axios'

const fetchCountries = async () => {
    
    const response = await axios.get('https://restcountries.com/v3.1/all')
    return response.data

}

export default fetchCountries