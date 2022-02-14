const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
console.log('connnecting to', url);

mongoose.connect(url)
  .then(result=> {console.log('connected to MongoDB')})
  .catch(error => {console.log('error connecting to MongoDB:', error)})

const personSchema= new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject)=>{
    returnedObject.id = returnedObject._id.toString();
    console.log('the id',returnedObject.id)
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Person', personSchema);