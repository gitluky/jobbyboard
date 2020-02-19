import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid, makeStyles } from '@material-ui/core';

import SignIn from './SignIn';
import SearchPosts from './SearchPosts'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(12,12)
  },
  grid: {
    padding: theme.spacing(2,12),
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3,0),
  },
}));

const FormContainer = () => {
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
          <Route exact path='/sign_in' render={(routerProps) => <SignIn {...routerProps} classes={classes}/>}/>
          <Route exact path='/' render={(routerProps) => <SearchPosts {...routerProps} classes={classes}/>}/>
        </Grid>
      </Container>
    </>
  )
}

export default FormContainer;
