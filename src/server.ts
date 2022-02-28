const express = require ('express')
const expressGraphQL = require ('express-graphql').graphqlHTTP
import colors from 'colors'
const schema  = require('./Schema/schema')
const app =  express()
const PORT = 8000

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql: true
}))

app.listen(PORT, ()=>{
    console.log(colors.random(`Server is running on ${PORT}`))
})