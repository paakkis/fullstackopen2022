import Person from './Person'

const Persons = (props) => {
    return (
        <ul>
            {props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase())).map((person, idx) => (
                <Person key={idx} name={person.name} number={person.number}/>
                )
            )
            }
        </ul> 
    ) 
}

export default Persons