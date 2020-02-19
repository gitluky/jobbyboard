import React from 'react';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import DashBoardContainer from './components/DashBoardContainer';
import PostContainer from './components/PostContainer';

class App extends React.Component {

  render() {
    return(
      <div>
        <Navigationbar {...this.props} />
        <FormContainer {...this.props} />
        <PostContainer />
      </div>
    )
  }
}

export default App;
