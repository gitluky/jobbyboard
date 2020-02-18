import React from 'react';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import DashBoardContainer from './components/DashBoardContainer';

class App extends React.Component {

  render() {
    return(
      <div>
        <Navigationbar {...this.props} />
        <FormContainer {...this.props} />
      </div>
    )
  }
}

export default App;
