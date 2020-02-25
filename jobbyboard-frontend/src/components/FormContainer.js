import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid, makeStyles } from '@material-ui/core';

import SignIn from './SignIn';
import SearchForm from './SearchForm'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(12,0,6),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12,8,6),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(12,24,6),
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(12,32,6),
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

const FormContainer = ({fetchSearchResults, domain}) => {
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
          <Route exact path='/' render={(routerProps) => <SearchForm {...routerProps} fetchSearchResults={fetchSearchResults} domain={domain} classes={classes}/>}/>
        </Grid>
      </Container>
    </>
  )
}

export default FormContainer;
