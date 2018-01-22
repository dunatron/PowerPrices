import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import './index.css';
import App from './App';
import GraphQLConfig from './config/GraphQLConfig';
const fetch = require('node-fetch');
const fs = require('fs');
// const DOTENV = require('dotenv').config({path: '../../../.env'});
//
//
// console.log(result);

// const path = require('path');
// const DOTENV = require('dotenv').config({path: '../../../.env'});
import ajax from 'ajax';




// $(function() {
//   var params = {
//     // Request parameters
//     "$filter": "{string}",
//   };
//
//   $.ajax({
//     url: "https://emi.azure-api.net/rtp/?" + $.param(params),
//     beforeSend: function(xhrObj){
//       // Request headers
//       xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
//     },
//     type: "GET",
//     // Request body
//     data: "{body}",
//   })
//     .done(function(data) {
//       alert("success");
//     })
//     .fail(function() {
//       alert("error");
//     });
// });





let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://emi.azure-api.net/rtp/?');
xhr.onload = function() {
  if (xhr.status === 200) {
    alert('User\'s name is ' + xhr.responseText);
  }
  else {
    alert('Request failed.  Returned status of ' + xhr.status);
  }
};
xhr.send();



/**
 * Get GraphQL endpoint
 */
let BASE_URL = BASE_URL_VARIABLE;
let SiteGraphqlConfig = new GraphQLConfig(BASE_URL);
let GRAPHQL_ENDPOINT = SiteGraphqlConfig.getGraphqlEndPoint();

/**
 * ToDo: When we build our project we need to hit and query our graphQL endpoint.
 * We need this for fragment and union matching as it needs to know our schema.
 * So this little function will need to somehow hit our endpoint and create A JSON File for our bundle to use
 */

/**
 * configure network interface for apollo client
 * ToDo: get fragment and union matching to work
 */
const networkInterface = createNetworkInterface({
  //uri: 'http://my-app.local/graphql'
  uri: GRAPHQL_ENDPOINT
});

/**
 * configure apollo client to use for ApolloProvider component
 * @type {ApolloClient | ApolloClient<any>}
 */
const client = new ApolloClient({
  networkInterface: networkInterface
});

/**
 * Render our app at given element
 * currently found in ReactPage.ss
 */
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('react-root')
);
