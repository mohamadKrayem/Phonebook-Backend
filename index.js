require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require('cors');
const Person = require('./models/person');

app.use(express.json());
app.use(express.static('build'));
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', morgan.token('body', function(req){
  return JSON.stringify(req.body)
})));


app.get('/api/persons', (req, res)=>{
  Person.find({}).then(persons => {
    res.json(persons);
  })
})

app.get('/info/', (req, res)=>{
  const date = new Date;
  res.send(`<p>Phonebook has info for 4 people</p><br /><p>${date}</p>`)
})

app.get('/api/persons/:id/', (req,res)=>{
  Person.findById(req.params.id).then(person=>{
    res.json(person)
  })
})

app.delete('/api/persons/:id/', (req, res)=>{
  const id = Number(req.params.id);
  persons = persons.filter(person=>id!==id);

  res.status(204).end();
})


app.post('/api/persons', (req, res)=>{
  const body = req.body;
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson=>{
    res.json(savedPerson)
  })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{console.log('app is running on '+ PORT)});