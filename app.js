const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

const { sequelize } = require('./models/index')
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')

if (process.env.NODE_ENV === "production") {
    sequelize.sync({ force: true })
} else {
    sequelize.sync()
}


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

app.use(express.static(__dirname + '/public/'));

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app });


app.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
)