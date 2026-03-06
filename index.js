
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())




let phoneAddress = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


app.use(express.json())

app.use(morgan('tiny'))

// funcion para obtener todos los recursos
app.get('/api/phoneaddress', (request, response) => {
  response.json(phoneAddress)
})


// Funcion para obtener un recurso
app.get('/api/phoneaddress/:id', (request, response) => {
  const id = Number(request.params.id)

  const person = phoneAddress.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).send("404 Pagina no encontrada")
  }
})

const generateId = () => {
  const maxId = phoneAddress.length > 0
    ? Math.max(...phoneAddress.map(p => p.id))
    : 0
  return maxId + 1
}

app.post('/api/phoneaddress', (request, response) => {

  const body = request.body
  const nameExists = phoneAddress.find(p => p.name === body.name)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }



  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  phoneAddress = phoneAddress.concat(person)
  response.json(person)

})

// Funcion para obtener informacion del array (logitud y fecha)
app.get('/info', (request, response) => {
  const recursos = phoneAddress.length
  const fecha = new Date()

  const formatoLocal = new Intl.DateTimeFormat('es-VE', {
    dateStyle: 'full',
    timeStyle: 'medium'
  }).format(fecha);


  response.send(`PhoneBook has info for ${recursos} people. <br/>${formatoLocal}`);

})

// Funcion para borrar un recurso
app.delete('/api/phoneaddress/:id', (request, response) => {
  const id = Number(request.params.id)
  phoneAddress = phoneAddress.filter(p => p.id !== id)

  response.status(204).end()
})


// Definimos un nuevo token llamado 'body'
morgan.token('body', (req) => JSON.stringify(req.body))

// Usamos un formato personalizado que incluya el token :body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})