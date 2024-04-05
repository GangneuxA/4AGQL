import {  ApolloClient, InMemoryCache,ApolloLink,HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  console.log(accessToken)
  if (accessToken) {
    return {
      headers: {
        ...headers,
        "x-access-token": `${accessToken}`,
        "x-refresh-token": `${refreshToken}`,
      }
    };
  }
  return { headers };
});

const userHttpLink = new HttpLink({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
})
const gradeHttpLink = new HttpLink({
uri: "http://localhost:4002/",
cache: new InMemoryCache()
})

const classeroomHttpLink = new HttpLink({
uri: "http://localhost:4001/",
cache: new InMemoryCache()
})

const userLink = authLink.concat(userHttpLink);
const gradeLink = authLink.concat(gradeHttpLink);
const classeroomLink = authLink.concat(classeroomHttpLink);

export const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === 'user',
    userLink,
    ApolloLink.split(
      operation => operation.getContext().clientName === 'grade',
      gradeLink,
      ApolloLink.split(
        operation => operation.getContext().clientName === 'classromm',
        classeroomLink
      )
    )
  ),
  cache: new InMemoryCache()
});