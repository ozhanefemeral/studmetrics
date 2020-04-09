const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const { sequelize } = require('./models/index')
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')

sequelize.sync()

app.use(cors())
app.use(bodyParser.json())

const schoolRoute = require('./routes/schools')
const teacherRoute = require('./routes/teachers')
const courseRoute = require('./routes/courses')
const offerRoute = require('./routes/offers')
const studentsRoute = require('./routes/students')
const homeworksRoute = require('./routes/homeworks')
const assignmentsRoute = require('./routes/assignments')
const testRoute = require('./routes/test')

app.use('/api/schools', schoolRoute)
app.use('/api/teachers', teacherRoute)
app.use('/api/courses', courseRoute)
app.use('/api/offers', offerRoute)
app.use('/api/students', studentsRoute)
app.use('/api/homeworks', homeworksRoute)
app.use('/api/assignments', assignmentsRoute)
app.use('/api/test', testRoute)

app.use(express.static(__dirname + '/public/'));

app.listen(port, async () => {
    console.log(`Server is ready @ port:${port}`);
})

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
apolloServer.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});