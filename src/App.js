import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home  from './screens/Home';
import Login from "./components/Login";
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Route exact path='/login' component={Login}/>
          <Route exact path='/' render={() => {
              return (<div>
                  <header className="App-header">
                      <h1 className="App-title">Welcome to Yahoo Weather app</h1>
                  </header>
                  <Home/>
              </div>)
          }}/>
      </div>
    );
  }
}

export default App;
