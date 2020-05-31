const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

const { sequelize } = require('./models/index')

// if (process.env.NODE_ENV === "production") {
//     sequelize.sync({ force: true })
// } else {
//     sequelize.sync()
// }

sequelize.sync()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/schools', require('./routes/schools'))
app.use('/api/teachers', require('./routes/teachers'))
app.use('/api/courses', require('./routes/courses'))
app.use('/api/offers', require('./routes/offers'))
app.use('/api/students', require('./routes/students'))
app.use('/api/homeworks', require('./routes/homeworks'))
app.use('/api/assignments', require('./routes/assignments'))
app.use('/api/enrolleds', require('./routes/enrolleds'))
app.use('/api/test', require('./routes/test'))
app.use('/api/verify', require('./routes/verify'))

app.use(express.static(__dirname + '/public/'));

app.listen(PORT)