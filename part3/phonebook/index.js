require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const baseUrl = '/api/persons/'
const cors = require('cors')
require('dotenv').config()
const PhoneBook = require('./models/PhoneBook')
app.use(express.static('./build'))


app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


app.get(baseUrl, (request, response) => {
  PhoneBook
    .find({})
    .then(result => {
      if (result) {
        console.log('phonebook:')
        result.forEach(phone => {
          console.log(phone.name + ' ' + phone.number)
        })
        response.json(result)
      } else {
        response.status(404).json({ 'error': 'List Not Found' })
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.get(baseUrl + ':id', (request, response) => {
  PhoneBook
    .findById(request.params.id)
    .then(phone => {
      if (phone) {
        response.json(phone)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete(baseUrl + ':id', (request, response, next) => {
  PhoneBook.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put(baseUrl + ':id', (request, response, next) => {
  let person = request.body

  PhoneBook.findByIdAndUpdate(request.params.id, person)
    .then(updated => {
      response.status(200).json(updated)
    })
    .catch(error => next(error))

})

app.post(baseUrl, (request, response, next) => {
  let body = request.body
  console.log('started')

  let newPhone = new PhoneBook({
    name: body.name,
    number: body.number,
  })

  newPhone.save()
    .then(saved => saved.toJSON())
    .then(savedAndFormattedNote => {
      console.log(`added ${savedAndFormattedNote.name} ${savedAndFormattedNote.number} to phonebook`)
      response.json(savedAndFormattedNote)
    })
    .catch(error => { console.log(error); next(error) })
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'MongoServerError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})