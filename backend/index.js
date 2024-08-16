//const http = require('http') //importa el servidor wed de node
/**
const app = http.createServer((request, response) => { //usa el método createServer del módulo http para crear un nuevo servidor web.
    
     * Se registra un controlador de eventos en el servidor, 
     * que se llama cada vez que se realiza una solicitud HTTP a
     *  la dirección del servidor http://localhost:3001.
     * a solicitud se responde con el código de estado 200, 
     * con el cabecera Content-Type establecido en text/plain,
     * y el contenido del sitio que se devolverá establecido en Hello World.
     *
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

//Las últimas filas enlazan el servidor http asignado a la variable app, para escuchar las solicitudes HTTP enviadas al puerto 3001:
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)*/
const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors());


let notes = [  
    {    id: 1,    
        content: "HTML is easy",    
        important: true  
    },  
    { id: 2,    
        content: "Browser can execute only JavaScript",    
        important: false  
    },  
    {    id: 3,   
        content: "GET and POST are the most important methods of HTTP protocol",    
        important: true  
    }
]
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })
  
  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })
  
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
      response.json(note)
    } else {
      console.log('x')
      response.status(404).end()
    }
  })
  
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  
    
  const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)