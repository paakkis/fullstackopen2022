import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import fetchCountries from './services/fetchCountries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchCountries()
        .then(response => {
          setCountries(response)
        })
  }, [])

  const handleFilterInputChange = (event) => {
    setFilter(event.target.value)
    console.log(filter)
  }

  return (
    <div className="App">
        <Filter 
          filter={filter}
          handleFilterInputChange={handleFilterInputChange}
        />
        <Countries
          countries={countries}
          filter={filter}
      />
    </div>
  );
}

export default App;
