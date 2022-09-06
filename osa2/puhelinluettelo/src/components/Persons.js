import Person from './Person'

const Persons = (props) => {
    return (
        <ul>
            {props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase())).map((person) => (
                <Person 
                    key={person.id} 
                    name={person.name} 
                    number={person.number}
                    remove={() => props.toggleRemovePerson(person.name, person.id)}
                    />
                )
            )
            }
        </ul> 
    ) 
}

export default Persons