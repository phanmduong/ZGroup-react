/* eslint-disable */


import ApolloClient from 'apollo-boost';

export const graphqlClient = new ApolloClient({
    uri: process.env.NODE_ENV === "production" ? 'http://colorme.vn/graphql' : 'http://colorme.test/graphql',
});

export const golangGraphqlClient = new ApolloClient({
    uri: process.env.NODE_ENV === "production" ? 'http://colorme.vn:8080/graphql' : 'http://localhost:8000/graphql',
});