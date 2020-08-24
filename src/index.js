import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider, CSSReset} from '@chakra-ui/core'
import User from './User';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
    <CSSReset />
    <BrowserRouter>
      <Route exact path="/" component={App} />
      <Route path="/user/:id" component={User} />
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
