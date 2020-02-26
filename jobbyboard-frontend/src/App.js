import React from 'react';
import { connect } from 'react-redux';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import PostContainer from './components/PostContainer';
import { fetchInitialPosts } from './actions/fetchPosts';
import { fetchSearchResults } from './actions/fetchPosts'


class App extends React.Component {

  componentDidMount() {
    const { domain, fetchSearchResults, fetchInitialPosts, location: { search: searchParamsStr} } = this.props;
    fetchInitialPosts(domain);
    if (searchParamsStr) {
      fetchSearchResults(`${domain}/search/${searchParamsStr}`)
    }
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
  return { domain: state.api.domain, posts: state.posts }
}

export default connect(
  mapStateToProps,
  {
    fetchInitialPosts,
    fetchSearchResults
  }
  )(App);
