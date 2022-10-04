require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

// eslint-disable-next-line no-unused-vars
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
}
)
app.use(morgan(':method :url :status - :response-time ms :body'))

// eslint-disable-next-line no-unused-vars
app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})

app.get('/info', (_req, res) => {
  Person.collection.count({},(err, data) => {
    res.send(`<div><p>Phonebook has info for ${data} people</p><p>${new Date()}</p></div>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(_result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.number && !body.name) {
    return response.status(400).json({
      error: 'Name and number are required.'
    })
  }

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is required.'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Number is required.'
    })
  }



  const person = new Person({
    name: body.name,
    number: body.number || '',
    date: new Date(),
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
    console.log(`${body.name} added to phonebook.`)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true , runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})