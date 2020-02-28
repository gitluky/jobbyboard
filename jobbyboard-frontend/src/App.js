import React from 'react';
import { connect } from 'react-redux';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import PostContainer from './components/PostContainer';
import { fetchInitialPosts, fetchSearchResults, fetchUserPosts } from './actions/fetchPosts';

class App extends React.Component {

  componentDidMount() {
    const { domain, fetchInitialPosts } = this.props;
    fetchInitialPosts(domain);
    const iconLink = document.createElement('link');
    iconLink.setAttribute('rel', 'stylesheet');
    iconLink.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons')
    document.getElementsByTagName('head')[0].appendChild(iconLink);
  }

  render() {

    return(
      <div>
        <Navigationbar {...this.props} />
        <FormContainer {...this.props} />
        <PostContainer {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { domain: state.api.domain, posts: state.posts, session: state.session }
}

export default connect(
  mapStateToProps,
  {
    fetchInitialPosts,
    fetchSearchResults,
    fetchUserPosts
  }
  )(App);
