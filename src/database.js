const mongoose = require('mongoose')

const url = 'mongodb://localhost/crudtest'

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log('Base de datos conectada.'))
    .catch(err => console.error(err))


module.exports = mongoose