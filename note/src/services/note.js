import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

/*const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}*/

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
/**
 * export default { 
      getAll: getAll, 
      create: create, 
      update: update 
    }
 * Dado que los nombres de las claves y las variables asignadas son los mismos,
 *  podemos escribir la definición del objeto con una sintaxis más compacta:
 */

  export default { getAll, create, update }
