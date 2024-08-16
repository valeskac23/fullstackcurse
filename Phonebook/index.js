const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'));

app.use(express.json());


let personas = [
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
/*
morgan(':method :url :status  :param[id]:res[content-length] - :response-time ms');

morgan.token('host', (request,response)=>{
  return ( 
    request.hostname
  )

})*/

//Muestra info de cuantas entradas hay y la fecha de la solicitud de esa informacion
app.get('/info', (request, responde)=>{
  const numeros= personas.length;  
  const now = new Date();    
  responde.send(`<p>The  Phonebook has info ${numeros} people</p> <p>${now}</p>`)
})

app.get('/api/personas/', (request, response)=>{
  response.json(personas);
})


//Muestra info de una entrada en especifica
app.get('/api/personas/:id',(request, response)=>{
  const id =Number(request.params.id);
  const Person = personas.find(N => N.id === id);

  if(Person){
    response.json(Person)
  }else{
    response.status(404).send("404 Page Not Found")    
  }    
})


app.delete('/api/personas/:id', (request, response)=>{
  const id =Number(request.params.id);
  const Person = personas.filter(N => N.id !== id);
  response.status(204).end()
})

const generateId = () =>{
  const newid = personas.length > 0 
  ? Math.max(...personas.map(n=>n.id)) 
  : 0;
  return newid + 1
}


morgan(':method :url :status  :param[id]:res[content-length] - :response-time ms');

morgan.token('param', (request,response,param)=>{
  return request.params[param]


})

app.post('/api/personas', (request,response) => { 

  const body = request.body;
  console.log(body);
  
  if(!body.name || !body.number){
    return response.status(400).json({
      error : 'Name missing or'
    })
  }
  const person ={
    id :  generateId(), 
    name : body.name,
    number : body.number,
      
  }
  personas = personas.concat(person);
  console.log(personas); 
  response.json(person);
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})