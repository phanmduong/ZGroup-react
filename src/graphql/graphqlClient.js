/* eslint-disable */


import ApolloClient from 'apollo-boost';
import {BASE_URL} from "../constants/env";

export const graphqlClient = new ApolloClient({
    uri: process.env.NODE_ENV === "production" ? BASE_URL + '/graphql' : 'http://colorme.test/graphql',
});

export const golangGraphqlClient = new ApolloClient({
    uri: process.env.NODE_ENV === "production" ? BASE_URL + '/golang-server/graphql' : 'http://localhost:8000/graphql',
});