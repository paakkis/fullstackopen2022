import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    personService.fetch()
        .then(response => {
            setPersons(response)
        })
}, [])

  const addPerson = (event) => {

    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 101)
    }

    if (persons.some(person => newName === person.name)){
      event.preventDefault()
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const previousPerson = persons.find(n => n.name === newName);
          personService
          .update(previousPerson.id, personObject)
              .then(returnedPerson => {
                setPersons(
                  persons.map(n => (n.name === newName ? returnedPerson : n))
                );
          })
      }
    }
    else if (newName === ''){
      event.preventDefault()
      alert("Name is required.")
    }
    else {
      personService
        .create(personObject)
        .then(response => {
            setPersons(persons.concat(response.data))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const toggleRemovePerson = (id, name) => { 
    if (window.confirm(`Delete ${name}?`))
      personService
        .remove(id)
        .then(() => {
            setPersons(persons.filter(n => n.id !== id))
            setNewName("");
            setNewNumber("");
        }).catch(error => {
          alert(
            setPersons(persons.filter(n => n.name !== name))
            `${name}' was already deleted from server`
          )
        })
  }

  const handlePersonInputChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
  }
  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value)
    console.log(newFilter)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter}
        handleFilterInputChange={handleFilterInputChange}
      
      />
      <h3>Add a new person</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handlePersonInputChange={handlePersonInputChange}
        handleNumberInputChange={handleNumberInputChange}
        addPerson={addPerson}
      
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        newFilter={newFilter}
        toggleRemovePerson={toggleRemovePerson}
      />
    </div>
  )

}

export default App