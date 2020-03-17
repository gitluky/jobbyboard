import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button, Icon, Grid } from '@material-ui/core';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import PostContainer from './components/PostContainer';
import { fetchInitialPosts, fetchSearchResults } from './actions/fetchPosts';
import { fetchUserData  } from './actions/fetchUsers';
import { trySessionRefresh, signInUser, signOut } from './actions/sessionsActions';

const App = (props) => {

  const { session, location, domain, history, fetchInitialPosts, trySessionRefresh} = props;

  useEffect(() => {
    const appendGoogleIconLink = () => {
      const iconLink = document.createElement('link');
      iconLink.setAttribute('rel', 'stylesheet');
      iconLink.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons')
      document.getElementsByTagName('head')[0].appendChild(iconLink);
    }
    appendGoogleIconLink();
  },[])

  useEffect(() => {
    if (location.pathname === "/") {
      fetchInitialPosts(domain);
    }
  }, [])

  useEffect(() => {
    trySessionRefresh(domain, history);
    let token_refresh_timer = setTimeout(() => {
      trySessionRefresh(domain, history);
    }, 900000)
    return () => clearTimeout(token_refresh_timer)
  }, [])

  const displayCreatePostButton = () => {
    if (session.isSignedIn === true) {
      return <Button component={ Link } to="/posts/new" style={{ marginTop: '2em', textDecoration: 'none', color: 'inherit'}} ><Icon color="primary" style={{ fontSize: 30, marginRight: '.25em' }}>add_circle</Icon>Create Post</Button>
    }
  }

  return(
    <div>
      <Navigationbar {...props} />
      <Grid container justify="center">
        {displayCreatePostButton()}
      </Grid>
      <FormContainer {...props} />
      <PostContainer {...props}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { domain: state.api.domain, posts: state.posts, session: state.session, users: state.users }
}

export default connect(
  mapStateToProps,
  {
    fetchInitialPosts,
    fetchSearchResults,
    fetchUserData,
    trySessionRefresh,
    signInUser,
    signOut
  }
  )(App);
