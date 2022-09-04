import Country from "./Country"
import React, { useState } from "react";
import ListCountry from "./ListCountry";

const Countries = (props) => {

    const [selectedCountry, setSelectedCountry] = useState();

    const showCountry = (event)  => {
        const country = props.countries.filter(country =>
            country.name.common.includes(event.target.value)
          );
        setSelectedCountry(country[0])
    }

    const allCountries = props.countries.filter(country =>
      country.name.common.toUpperCase().includes(props.filter.toUpperCase())
    );
  
    if (allCountries.length >= 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (selectedCountry !== undefined) {
        return (
            <div>
                <Country 
                    key={selectedCountry.name.common} 
                    name={selectedCountry.name.common} 
                    capital={selectedCountry.capital}
                    area={selectedCountry.area}
                    languages={selectedCountry.languages}
                    flags={selectedCountry.flags.png}
                />
            </div>
        )
    }


    if (allCountries.length > 1) {
    return (
        <ul>
            {props.countries
                .filter(country => 
                    country.name.common.toLowerCase().includes(props.filter.toLowerCase())
                )
                .map((country) => (
                    <ListCountry 
                        key={country.name.common}
                        name={country.name.common}
                        showCountry={showCountry}
                    />
                )
            )
            }
        </ul> 
    ) 

    }

    return (
        <ul>
            {props.countries
                .filter(country => 
                    country.name.common.toLowerCase().includes(props.filter.toLowerCase())
                )
                .map((country) => (
                    <div>
                        <Country 
                            key={country.name.common} 
                            name={country.name.common} 
                            capital={country.capital}
                            area={country.area}
                            languages={country.languages}
                            flags={country.flags.png}
                        />
                    </div>
                )
            )
            }
        </ul> 
    ) 


}

export default Countries