import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import userReducer from './reducer/reducer'
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(userReducer, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(<Router><Provider store={store} ><App /></Provider></Router>, document.getElementById('root'));


serviceWorker.unregister();
