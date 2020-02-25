import React from 'react';
import { connect } from 'react-redux';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import DashBoardContainer from './components/DashBoardContainer';
import PostContainer from './components/PostContainer';
import { fetchInitialPosts } from './actions/fetchPosts';
import { fetchSearchResults } from './actions/fetchPosts'


class App extends React.Component {

  componentDidMount() {
    this.props.fetchInitialPosts(this.props.domain);
  }

  render() {
    return(
      <div>
        <Navigationbar {...this.props} />
        <FormContainer {...this.props} />
        <PostContainer posts={this.props.posts}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { domain: state.api.domain, posts: state.posts }
}

export default connect(
  mapStateToProps,
  {
    fetchInitialPosts,
    fetchSearchResults
  }
  )(App);
