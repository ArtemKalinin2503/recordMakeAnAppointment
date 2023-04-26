import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { StylesProvider } from '@material-ui/styles';
import { Container } from "material-ui-core";
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <StylesProvider injectFirst>
      <Container maxWidth="xl">
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
      </Container>
    </StylesProvider>
  </BrowserRouter>
);
