// Set up dependencies.

const app = require('express')()
const config = require('./config/config')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const morgan = require('morgan')
app.use(morgan('dev'))


// Set up database.

const mongoose = require('mongoose')
mongoose.connect(config.database)


// Set up routes.

// register or login to retrieve a token
const authRouter = require('./routes/authRouter')
app.use('/auth', authRouter)

// for authorizing presence of visual elements
// how should this be authenticated?
const authTestRouter = require('./routes/authTestRouter')
app.use('/authtest', authTestRouter)

// authentication middleware
const authenticator = require('./tools/authenticator')
app.use(authenticator)

// protected routes
const userRouter = require('./routes/userRouter')
app.use('/users', userRouter)

const raceRouter = require('./routes/raceRouter')
app.use('/races', raceRouter)

const teamRouter = require('./routes/teamRouter')
app.use('/teams', teamRouter)

const resultRouter = require('./routes/resultRouter')
app.use('/results', resultRouter)



// Set up server.

app.listen(process.env.PORT, function () {
  console.log('Listening on port ', process.env.PORT, '....')
})
