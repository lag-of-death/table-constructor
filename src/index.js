import React from 'react';
import ReactDOM from 'react-dom';

import { createGlobalStyle } from 'styled-components'

import App from './App';
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
  button {
    align-items: center;
    background: lightgray;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    line-height: 10px;
    width: 10px;
  }
  
  button:hover {
    cursor: pointer;
  }

  body {
    font-family: sans-serif;
    margin: 0;
    padding: 30px;
  }
`;

ReactDOM.render(
    <React.Fragment>
        <GlobalStyle />
        <App />
    </React.Fragment>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
