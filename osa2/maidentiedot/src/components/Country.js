import Weather from "./Weather";

const Country = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <p>Capital: {props.capital}</p>
            <p>Area: {props.area}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(props.languages).map((val) => {
                    return <li key={val}>{val}</li>;
                })}
            </ul>
            <img src={props.flags} alt="No image found."></img>
            <Weather key={props.capital} capital={props.capital} />
        </div>
      )
}

export default Country