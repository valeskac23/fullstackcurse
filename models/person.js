require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url); //conectarse a la base de datos

mongoose.connect(url).then(result => {
  console.log('connected to MongoDB') //si la conexión es exitosa, se muestra un mensaje en la consola
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message) //si la conexión falla, se muestra un mensaje de error en la consola
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: 'Invalid phone number format'
    },

    required: true,
  }
})

//transformar el objeto devuelto por Mongoose a JSON, para que el id se muestre como un string y no como un objeto, y para eliminar los campos _id y __v
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema) //exportar el modelo de persona para que pueda ser utilizado en otros archivos