import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  console.log(accessToken);
  console.log(refreshToken);
  if (accessToken) {
    return {
      headers: {
        ...headers,
        "x-access-token": `${accessToken}`,
        "x-refresh-token": `${refreshToken}`,
      },
    };
  }
  return { headers };
});

const userHttpLink = new HttpLink({
  uri: process.env.REACT_APP_URLUSER,
});
const gradeHttpLink = new HttpLink({
  uri: process.env.REACT_APP_URLGRADE,
});

const classeroomHttpLink = new HttpLink({
  uri: process.env.REACT_APP_URLCLASSROOM,
});

const userLink = authLink.concat(userHttpLink);
const gradeLink = authLink.concat(gradeHttpLink);
const classeroomLink = authLink.concat(classeroomHttpLink);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "user",
    userLink,
    ApolloLink.split(
      (operation) => operation.getContext().clientName === "grade",
      gradeLink,
      ApolloLink.split(
        (operation) => operation.getContext().clientName === "classroom",
        classeroomLink
      )
    )
  ),
});
