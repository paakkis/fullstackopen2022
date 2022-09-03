import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    if (persons.some(person => newName === person.name)){
      event.preventDefault()
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else if (newName === ''){
      event.preventDefault()
      alert("Name is required.")
    }
    else {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
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
      />
    </div>
  )

}

export default App