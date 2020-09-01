const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const {mongoose} = require('./database')
const routes = require('./routes/tasks.routes')
const cors = require('cors')
//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
//Routes
app.use('/api/tasks', routes)
//Static file
app.use(express.static(path.join(__dirname, 'public')))
//Starting the server

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}.`)
})
