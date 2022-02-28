const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require ('graphql')
const { argsToArgsConfig } = require  ('graphql/type/definition')

//hardcoded data
const Customers = [
    {id:'1', name:'John Doe', email:'johndoe@gmail.com', age:24},
    {id:'2', name:'John Doe2', email:'johndoe2@gmail.com', age:27},
    {id:'3', name:'John Doe3', email:'johndoe3@gmail.com', age:23}
]

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields:() =>({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        age: {type:GraphQLString}
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        customer:{
            type:CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue:any, args:any){
                const fetch = async()=>{
                    const res = await axios.get('"https://heypiserver.herokuapp.com/getApis').then(res => res.data)
                    console.log(res)
                    return res
                }
                fetch()
            }
        },

        customersName:{
            type:CustomerType,
            args:{
                name:{type:GraphQLString}
            },
            resolve(parentValue:any, args:any){
                for(let i:number = 0; i< Customers.length; i++){
                    if(Customers[i].name.includes(args.name)){
                        return Customers[i]
                    }
                }
            }
        },

        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue:any, args:any){
                    return axios.get('"https://heypiserver.herokuapp.com/getApis')
                    
            }
        }
    
    }
    
})

// Mutations
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addCustomer:{
            type:CustomerType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue:any, args:any){
                return axios.post('http://localhost:3000/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }).then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})


