const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb://yue:${password}@ac-ghbukus-shard-00-00.3f8fcwy.mongodb.net:27017,ac-ghbukus-shard-00-01.3f8fcwy.mongodb.net:27017,ac-ghbukus-shard-00-02.3f8fcwy.mongodb.net:27017/?ssl=true&replicaSet=atlas-13teop-shard-0&authSource=admin&appName=person`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// Person.find({}).then(result => {
//   result.forEach(person => {
//     console.log(person);
//   });
//   mongoose.connection.close();
// });

const person = new Person({
  name: name,
  number: number,
});

person.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook`);
  mongoose.connection.close();
});

