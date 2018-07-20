import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App'
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import Store from './redux/store'

ReactDOM.render(
    <Provider store={Store}>
    <Router>
        <Route exact path='/' component={App}/>
    </Router>
    </Provider>
    ,document.getElementById('root'));
registerServiceWorker();
