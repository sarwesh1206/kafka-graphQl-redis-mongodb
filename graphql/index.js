const express = require('express')
const {ApolloServer} = require('@apollo/server')
// const {expressMiddleWare} = require('@apollo/server/express4')
const  { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser')
const cors = require('cors')

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const axios = require('axios');


async function startServer(){
    const app = express()

        const server = new ApolloServer({
            typeDefs: `
            type Todo {
               id: ID!
               title: String!
               completed: Boolean 
               user: User
            }
            type User{
                id:ID
                name: String
                username: String
                email: String

            }

            type Query{
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id:ID): User
            }
            

            `,
            resolvers:
            {
                    Todo: {
                        user: async(todo)=>await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`).data

                        
                    },

                Query: {
                    getTodos: async () => await axios.get("https://jsonplaceholder.typicode.com/todos").data,
                    getAllUsers: async () => await axios.get("https://jsonplaceholder.typicode.com/users").data,
                    getUser: async (parent,{id}) => await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).data


                }
            },
            plugins: [
                ApolloServerPluginLandingPageGraphQLPlayground({
                    // options
                })
            ]

        })

        app.use(bodyParser.json())
        app.use(cors());
        await server.start();
        app.use("/graphql", expressMiddleware(server))
  
    app.listen(7000,()=>{
        console.log("server started")
    })
}

startServer()

