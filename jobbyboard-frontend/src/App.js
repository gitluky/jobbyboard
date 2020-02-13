import React from 'react';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const App = (props) => {

  useEffect(() => {
    props.dispatch({type: 'SET_API_DOMAIN', payload: 'http://localhost:3001' })
  })

  return (
    <Router>
      <div>
        <Navigationbar />
        <Route path='/' render={routerProps => <FormContainer {...routerProps} />} />
      </div>
    </Router>
  );

}

export default connect()(App);
