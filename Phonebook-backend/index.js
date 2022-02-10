const express = require('express');
const morgan = require('morgan')
const app = express();

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', morgan.token('body', function(req){
  return JSON.stringify(req.body)
})));

let Persons = [
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
app.get('/api/persons', (req, res)=>{
  res.json(Persons)
})

app.get('/info/', (req, res)=>{
  const date = new Date;
  res.send(`<p>Phonebook has info for 4 people</p><br /><p>${date}</p>`)
})

app.get('/api/persons/:id/', (req,res)=>{
  const id = req.params.id;
  const result = Persons.find(person=>person.id==id);
  if(result) res.json(result);
  else res.status(404).end();
})

app.delete('/api/persons/:id/', (req, res)=>{
  const id = req.params.id;
  Persons = Persons.filter(Person=>Person.id!=id);
  res.json(Persons);
  res.status(204).end();
})

app.post('/api/persons', (req, res)=>{
  const id =Math.max(...Persons.map(person=>person.id));
  const body = req.body;

  console.log('the name is ', body)
  if(!body.name || Persons.find(person=>person.name==body.name)) return res.status(404).json({error:"missing name"})
  const person = {
    id: parseInt(Math.random()+ id+1),
    name:body.name,
    number: body.number,
  }

  Persons=Persons.concat(person);
  res.json(person)
})



app.listen(3001, ()=>{console.log('app is runnin on '+ 3001)});