import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 101)
    }

    if (persons.some(person => newName === person.name)){
  
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const previousPerson = persons.find(n => n.name === newName);
          personService
          .update(previousPerson.id, personObject)
              .then(returnedPerson => {
                setPersons(
                  persons.map(n => (n.name === newName ? returnedPerson : n))
                );
                setNotification(`Changed ${personObject.name}'s number`)
                setNewName('')
                setNewNumber('')
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
          })
          .catch(error => {
            setPersons(persons.filter(n => n.name !== personObject.name))
            setErrorMessage(`Information of ${personObject.name} was already removed from server.`);
          })
          setTimeout(() => {
              setErrorMessage(null)
        }, 5000)
      }
    }
    else {
      personService
        .create(personObject)
        .then(response => {
            setPersons(persons.concat(response))
            setNotification(`Added ${personObject.name}`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleRemovePerson = (name, id) => { 
    if (window.confirm(`Delete ${name}?`))
      personService
        .remove(id)
        .then(() => {
            setPersons(persons.filter(n => n.id !== id))
            setNotification(`Removed ${name}`)
            setNewName("");
            setNewNumber("");
        }).catch(error => {
            setPersons(persons.filter(n => n.name !== name))
            setErrorMessage(`Information of ${name} was already removed from server.`);
        })
          setTimeout(() => {
              setErrorMessage(null)
        }, 5000)
  }  
  useEffect(() => {
    personService.fetch()
        .then(response => {
            setPersons(response)
        })
  }, [])

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
      <Notification message={notification}/>
      <Error message={errorMessage}/>
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