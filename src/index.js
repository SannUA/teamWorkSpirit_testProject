import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider, CSSReset} from '@chakra-ui/core';
import { createStore, compose, applyMiddleware } from 'redux';
import { reducer } from './redux/reducer';
import { Provider } from 'react-redux';
import createSagaMidleware from 'redux-saga';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import User from './User';
import rootSaga from './redux/sagasRoot';

const saga = createSagaMidleware()

const store = createStore(reducer, compose(
  applyMiddleware(
    thunk, saga
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

saga.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CSSReset />
        <BrowserRouter>
          <Route exact path="/" component={App} />
          <Route path="/user/:id" component={User} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
