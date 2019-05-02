const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const users = ['Diego Margues', 'Robson Fernandes', 'Cleiton Souza']

const checkAge = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/age')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('list', { users })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  users.push(req.body.user)
  return res.redirect('/')
})

app.get('/age', (req, res) => {
  return res.render('age')
})

app.get('/major', checkAge, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})

app.get('/minor', checkAge, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    // res.send(req.body.age)
    return res.redirect(`/major?age=${req.body.age}`)
  } else {
    return res.redirect(`/minor?age=${req.body.age}`)
  }
})

app.listen(3000)
