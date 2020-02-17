import React from 'react';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import DashBoardContainer from './components/DashBoardContainer';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setApiDomain } from './actions/setup';
import { isSignedIn } from './actions/sessionsActions';

class App extends React.Component {

  componentDidMount() {
    this.props.setApiDomain('http://localhost:3001');
    this.props.isSignedIn('http://localhost:3001');
  }

  render() {
    return(
      <div>
        <Navigationbar {...this.props} />
        <FormContainer {...this.props} />
      </div>
    )
  }
}

export default connect(null, { setApiDomain, isSignedIn })(App);
