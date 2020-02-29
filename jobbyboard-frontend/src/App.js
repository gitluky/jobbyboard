import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import PostContainer from './components/PostContainer';
import { fetchInitialPosts, fetchSearchResults, fetchUserPosts } from './actions/fetchPosts';
import { trySessionRefresh, signOut } from './actions/sessionsActions';

const App = (props) => {

  const { domain, session, fetchInitialPosts, trySessionRefresh, history } = props;

  const appendGoogleIconLink = () => {
    const iconLink = document.createElement('link');
    iconLink.setAttribute('rel', 'stylesheet');
    iconLink.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons')
    document.getElementsByTagName('head')[0].appendChild(iconLink);
  }

  useEffect(() => {
    appendGoogleIconLink();
    fetchInitialPosts(domain);
  }, [])

  useEffect(() => {
    trySessionRefresh(domain, history);
    let token_refresh_timer = setTimeout(() => {
      trySessionRefresh(domain, history);
    }, 900000)
    return () => clearTimeout(token_refresh_timer)
  }, [])


  return(
    <div>
      <Navigationbar {...props} />
      <FormContainer {...props} />
      <PostContainer {...props}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { domain: state.api.domain, posts: state.posts, session: state.session }
}

export default connect(
  mapStateToProps,
  {
    fetchInitialPosts,
    fetchSearchResults,
    fetchUserPosts,
    trySessionRefresh,
    signOut
  }
  )(App);
