import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { gql } from "apollo-boost";
import { useDispatch, useSelector } from "react-redux";
import {ApolloClient} from "apollo-boost";
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import {Subscription} from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import * as actions from "../store/actions";
import LiveData from "./LiveData";
const httpLink = new HttpLink({
    uri: 'https://react.eogresources.com/graphql'
 });
 
 const wsLink = new WebSocketLink({
     uri: `ws://react.eogresources.com/graphql`,
     options: {
       reconnect: true
     }
   })
 
 const link = split(
 // split based on operation type
 ({ query }) => {
     const definition = getMainDefinition(query);
     return (
     definition.kind === 'OperationDefinition' &&
     definition.operation === 'subscription'
     );
 },
 wsLink,
 httpLink , 
 );//Now, queries and mutations will go over HTTP as normal, but subscriptions will be done over the websocket transport.
  
 // subscription doesn't support 
 const client = new ApolloClient({
 link: ApolloLink.from([
     onError(({ graphQLErrors, networkError }) => {
     if (graphQLErrors)
         graphQLErrors.map(({ message, locations, path }) =>
             console.log(
                 `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
             ),
         );
     if (networkError) console.log(`[Network error]: ${networkError}`);
     }),
     link
 ]),
 cache: new InMemoryCache()
 });
 
 
 
 const NEW_MEASUREMENT = gql`
 subscription newMeasurement {
     newMeasurement {
         metric
         at
         value
         unit
     }
 }
 `
 
 //we are not storing live data into redux
 const NewMeasurement = () => (
     // const dispatch = useDispatch()
   <Subscription subscription={NEW_MEASUREMENT}>
     {({ data, loading }) => {
        let liveData = {data}
         return (
             <div>
               {(!loading)?<LiveData liveData = {liveData.data}/> :null }
            </div>   
         )
        }}
   </Subscription>
 );


 const LiveDataContainer = ()=>{
    return(
        <ApolloProvider client = {client}>
            <NewMeasurement/>
        </ApolloProvider>
    )
}

export default LiveDataContainer