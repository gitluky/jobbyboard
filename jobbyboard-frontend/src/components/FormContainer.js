import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid, makeStyles } from '@material-ui/core';

import SignIn from './SignIn';
import SignUp from './SignUp';
import SearchForm from './SearchForm';
import PostForm from './PostForm';
import UserCard from './UserCard';

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
    width:theme.spacing(18),
    height: theme.spacing(18)
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
}));

const FormContainer = ({ fetchSearchResults, signInUser, domain, session, users }) => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Route exact path='/sign_in' render={routerProps => <SignIn {...routerProps} classes={classes} domain={domain} signInUser={signInUser} />}/>
          <Route exact path='/sign_up' render={routerProps => <SignUp {...routerProps} classes={classes} domain={domain} signInUser={signInUser} /> }/>
          <Route exact path={['/search', '/']} render={routerProps => <SearchForm {...routerProps} domain={domain} fetchSearchResults={fetchSearchResults} classes={classes} />}/>
          <Route exact path='/posts/new' render={routerProps => <PostForm {...routerProps} session={session} domain={domain} classes={classes} />}/>
          <Route exact path='/users/:id' render={routerProps => <UserCard {...routerProps} session={session} domain={domain} classes={classes} users={users} />} />
        </Grid>
      </Container>
    </>
  )
}

export default FormContainer;
