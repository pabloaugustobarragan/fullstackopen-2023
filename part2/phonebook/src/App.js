import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import axios from 'axios'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [messageNoti, setMessageNoti] = useState({
    message: '',
    type: ''
  })

  const updateList = () => {
    axios.get('http://localhost:3001/persons').then(response => {
      if (response.statusText === 'OK') {
        setPersons(response.data)
      }
    })
  }

  useEffect(() => {
    updateList()
  }, [])

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      axios.delete(`http://localhost:3001/persons/${person.id}`)
        .then(() => {
          setPersons(persons.filter((item) => item.id !== person.id))
          setMessageNoti({ message: `Deleted ${person.name}`, type: 'success' })
          setTimeout(() => {
            setMessageNoti({ message: ``, type: '' })
          }, 3000);
        })
        .catch(err => {
          console.log(err);
          if (err.response.status === 404) {
            updateList()
            setMessageNoti({ message: `Information of ${person.name} has already been removed from server`, type: 'error' })
            setTimeout(() => {
              setMessageNoti({ message: ``, type: '' })
            }, 6000);
          }
        })
    }
  }


  const handleSubmited = (e) => {
    e.preventDefault()
    const person = persons.find((key) => key.name === newName);
    if (person) {
      if (person.number == "") {
        person.number = newNumber
        axios.put(`http://localhost:3001/persons/${person.id}`, person)
          .then(() => {
            person.number = newNumber
            setNewName('')
            setNewNumber('')
            setPersons(persons.map(el => el.id === person.id ? person : el))
            setMessageNoti({ message: `Updated ${person.name}`, type: 'success' })
            setTimeout(() => {
              setMessageNoti({ message: ``, type: '' })
            }, 3000);
          })
          .catch(err => {
            if (err.response.status === 404) {
              updateList()
              setMessageNoti({ message: `Information of ${person.name} has already been removed from server`, type: 'error' })
              setTimeout(() => {
                setMessageNoti({ message: ``, type: '' })
              }, 6000);
            }
          })
      } else if (person.number !== newNumber) {
        if (window.confirm(`${person.name} already added to phonebook, replace the old number with a new one?`)) {
          person.number = newNumber
          axios.put(`http://localhost:3001/persons/${person.id}`, person)
            .then(() => {
              setNewName('')
              setNewNumber('')
              setPersons(persons.map(el => el.id === person.id ? person : el))
              setMessageNoti({ message: `Updated ${person.name}`, type: 'success' })
              setTimeout(() => {
                setMessageNoti({ message: ``, type: '' })
              }, 3000);
            })
            .catch(err => {
              if (err.response.status === 404) {
                
                updateList()
                setMessageNoti({ message: `Information of ${person.name} has already been removed from server`, type: 'error' })
                setTimeout(() => {
                  setMessageNoti({ message: ``, type: '' })
                }, 6000);
              }
            })
        }
      }
    } else {
      if (newName === "") {
        alert(`the name cannot be empty`);
        return;
      }
      axios.post('http://localhost:3001/persons', { name: newName, number: newNumber })
        .then(() => {
          updateList()
          setNewName('')
          setNewNumber('')
          setMessageNoti({ message: `Added ${newName}`, type: 'success' })
          setTimeout(() => {
            setMessageNoti({ message: ``, type: '' })
          }, 3000);
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {
        messageNoti.type !== '' &&
        <Notification message={messageNoti} />
      }
      <Filter setFilter={setFilter} />

      <h3>add a new</h3>

      <PersonForm handleSubmited={handleSubmited} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>

      <Person persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App