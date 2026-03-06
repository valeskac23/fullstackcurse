import { useState, useEffect } from 'react'
import agendaService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // conecion con el servidor
  useEffect(() => {
    agendaService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // fincion para agregar nuevos nombre
  const addNewName = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(a => a.name === newPerson.name)

    if (existingPerson) {
      if (window.confirm(`${newPerson.name}is already added to phonebook. Do you change the number to phonebook`)) {

        const changeNumber = { ...existingPerson, number: newNumber }
        agendaService
          .update(existingPerson.id, changeNumber)
          .then(retuenedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : retuenedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else {
      agendaService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

    }
  }

  const deletePerson = (id, name) => {
    console.log(id, name);
    if (window.confirm(`Delete ${name} ?`)) {
      agendaService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(a => a.id !== id))
        })
        .catch(error => {
          alert(`The person '${name}' was already removed from server`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }


  }



  const personsToShow = search === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )




  const handlerNameOnchage = (e) => {
    setNewName(e.target.value)
  }

  const handlerNumberOnchage = (e) => {
    setNewNumber(e.target.value)
  }


  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>

      <div>
        Search: <input value={search} onChange={handleSearchChange} />
      </div>

      <form onSubmit={addNewName}>

        <> name: <input value={newName} onChange={handlerNameOnchage} /></>
        <> number: <input value={newNumber} onChange={handlerNumberOnchage} /></>
        <><button type="submit">add</button></>

      </form>
      <h2>Numbers</h2>

      {personsToShow.map((a, i) => (
        <li key={i}>{a.name} {a.number}
          <button onClick={() => deletePerson(a.id, a.name)} >Delete</button>
        </li>
      ))}
    </>
  )
}

export default App
