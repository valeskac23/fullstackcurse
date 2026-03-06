import agendaService from '../../services/names'

const AddNewName = (e, { newName, newNumber, persons }) => {
  e.preventDefault()

  const newPerson = {
    name: newName,
    number: newNumber,
  }

  if (persons.find((a) => a.name === newPerson.name)) {
    alert(`${newPerson.name}is already added to phonebook`)
    setNewName('')
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