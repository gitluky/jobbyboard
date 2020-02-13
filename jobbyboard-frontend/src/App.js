import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Navigationbar />
          <Route path='/' render={routerProps => <FormContainer {...routerProps} />} />
        </div>
      </Router>
    );
  }

}
