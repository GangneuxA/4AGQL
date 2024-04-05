import {  ApolloClient, InMemoryCache,ApolloLink } from "@apollo/client";


const user = new HttpLink({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
})
const grade = new HttpLink({
uri: "http://localhost:4002/",
cache: new InMemoryCache()
})

const classeroom = new HttpLink({
uri: "http://localhost:4001/",
cache: new InMemoryCache()
})

export const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === 'user',
    user,
    grade,
    classeroom
    )
 });
