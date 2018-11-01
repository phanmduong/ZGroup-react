/* eslint-disable */


import ApolloClient from 'apollo-boost';
 
export const graphqlClient = new ApolloClient({
    uri: process.env.NODE_ENV === "production" ? 'http://colorme.vn/graphql' : 'http://colorme.test/graphql',
});