const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

const db = require('./models/index')
db.sequelize.sync()

app.use(cors())
app.use(bodyParser.json())

const schoolRoute = require('./routes/schools')
const teacherRoute = require('./routes/teachers')
const courseRoute = require('./routes/courses')
const lectureRoute = require('./routes/lectures')
const studentsRoute = require('./routes/students')
const homeworksRoute = require('./routes/homeworks')
const assignmentsRoute = require('./routes/assignments')

app.use('/api/schools', schoolRoute)
app.use('/api/teachers', teacherRoute)
app.use('/api/courses', courseRoute)
app.use('/api/lectures', lectureRoute)
app.use('/api/students', studentsRoute)
app.use('/api/homeworks', homeworksRoute)
app.use('/api/assignments', assignmentsRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
}

app.listen(port, async () => {
    console.log(`Server is ready @ port:${port}`);
})