const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
console.log('connnecting to', url);

mongoose.connect(url)
  .then(result=> {console.log('connected to MongoDB')})
  .catch(error => {console.log('error connecting to MongoDB:', error)})

const personSchema= new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate:{
      validator: function(v){
        return /\d{3}-\d{6}/.test(v)
      },
      message: 'invalid number!',
    },
  },
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