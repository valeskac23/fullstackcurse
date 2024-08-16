import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'



/**
 * El entorno de ejecución de JavaScript llama a la función 
 * callback registrada por el método then, 
 * proporcionándole un objeto response como parámetro. 
 *

const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
  /**
   * El objeto response contiene todos los datos esenciales relacionados 
   * con la respuesta de una solicitud HTTP GET, 
   * que incluiría los datos devueltos, el código de estado (status code)
   *  y los encabezados (headers).
   *
})*/

/**
 * Por lo general, no es necesario almacenar el objeto de la promesa en una variable y,
 * en cambio, es común encadenar la llamada al método then a la llamada al método axios, 
 * de modo que la siga directamente:
 */
/*
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})


const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)*/




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <App />
  </React.StrictMode>,
)
