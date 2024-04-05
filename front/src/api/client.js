import {  ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";


const user = new HttpLink({
  uri: "http://localhost:4000/",
})
const grade = new HttpLink({
  uri: "http://localhost:4002/",
})

const classeroom = new HttpLink({
  uri: "http://localhost:4001/",
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    operation => operation.getContext().clientName === 'user',
    user,
    grade,
    classeroom
    )
 });
