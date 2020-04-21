import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button, Icon, Grid, makeStyles } from '@material-ui/core';
import Navigationbar from './components/Navigationbar';
import FormContainer from './components/FormContainer';
import PostContainer from './components/PostContainer';
import { fetchInitialPosts, fetchSearchResults } from './actions/postsActions';
import { fetchUserData  } from './actions/usersActions';
import { trySessionRefresh, signInUser, signOut } from './actions/authenticationActions';
import { updateErrors, clearErrors } from './actions/alertsActions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6,0,0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6,8,0),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6,24,0),
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(6,32,0),
    }
  },
  avatarSmall: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  avatarLarge: {
    width:theme.spacing(24),
    height: theme.spacing(24)
  },
  grid: {
    padding: theme.spacing(2),
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3,0),
  },
  postContainer: {
    marginTop: theme.spacing(4)
  },
}));

const App = (props) => {
  const classes = useStyles();

  const { session, location, domain, history, fetchInitialPosts, trySessionRefresh, alerts} = props;

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
    if (session.isSignedIn){
      fetchInitialPosts(domain, session.location);
    } else {
      fetchInitialPosts(domain);
    }
  }, [session.isSignedIn])

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
      <FormContainer {...props} alerts={alerts} classes={classes} />
      <PostContainer {...props} classes={classes}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { domain: state.api.domain, posts: state.posts, session: state.session, users: state.users, alerts: state.alerts }
}

export default connect(
  mapStateToProps,
  {
    fetchInitialPosts,
    fetchSearchResults,
    fetchUserData,
    trySessionRefresh,
    signInUser,
    signOut,
    clearErrors,
    updateErrors
  }
  )(App);
