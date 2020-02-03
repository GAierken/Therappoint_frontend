import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import userReducer from './reducer/reducer'
import { BrowserRouter as Router } from 'react-router-dom';

const store=createStore(userReducer)


ReactDOM.render(<Router><Provider store={store} ><App /></Provider></Router>, document.getElementById('root'));


serviceWorker.unregister();
