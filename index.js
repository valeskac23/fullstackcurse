require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))



// let phoneAddress = [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ]






// funcion para obtener todos los recursos
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


// Funcion para obtener un recurso
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})


//funcion para crear un nuevo recurso
app.post('/api/persons', (request, response, next) => {

  const body = request.body


  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,

  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))

})


// funcion para actualizar un recurso
app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }


  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

})



// Funcion para obtener informacion del array (logitud y fecha)
app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const recursos = persons.length
    const fecha = new Date()

    const formatoLocal = new Intl.DateTimeFormat('es-VE', {
      dateStyle: 'full',
      timeStyle: 'medium'
    }).format(fecha);


    response.send(`PhoneBook has info for ${recursos} people. <br/>${formatoLocal}`);

  })
})

// Funcion para borrar un recurso
app.delete('/api/persons/:id', (request, response) => {

  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

})


// Definimos un nuevo token llamado 'body'
morgan.token('body', (req) => JSON.stringify(req.body))

// Usamos un formato personalizado que incluya el token :body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



//controlador de errores, se le pasan 4 parametros, el error, la request, la response y el next, este ultimo es para pasar el error a otro controlador de errores si es necesario
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler)


const PORT = process.env.PORT || PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

