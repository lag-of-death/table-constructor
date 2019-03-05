import React from 'react';
import ReactDOM from 'react-dom';

import { createGlobalStyle } from 'styled-components';

import App from './App';
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    font-family: sans-serif;
    margin: 0;
    
    #root {
      flex-grow: 1;
      padding: 30px;
    }
  }
`;

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>,
  document.getElementById('root'),
);

serviceWorker.register();
