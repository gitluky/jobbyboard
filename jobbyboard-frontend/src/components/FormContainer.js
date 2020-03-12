import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid, makeStyles } from '@material-ui/core';

import SignIn from './SignIn';
import SignUp from './SignUp';
import SearchForm from './SearchForm'
import PostForm from './PostForm'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6,0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6,8),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6,24),
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(6,32),
    }
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

const FormContainer = ({ fetchSearchResults, domain, session }) => {
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
          <Route exact path='/sign_in' render={routerProps => <SignIn {...routerProps} classes={classes}/>}/>
          <Route exact path='/sign_up' render={routerProps => <SignUp {...routerProps} classes={classes}/>}/>
          <Route exact path={['/search', '/']} render={routerProps => <SearchForm {...routerProps} domain={domain} fetchSearchResults={fetchSearchResults} classes={classes}/>}/>
          <Route exact path='/posts/new' render={routerProps => <PostForm {...routerProps} session={session} domain={domain} classes={classes}/>}/>
        </Grid>
      </Container>
    </>
  )
}

export default FormContainer;
