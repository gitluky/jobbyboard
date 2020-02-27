import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Container, Grid, makeStyles, Button, Icon } from '@material-ui/core';

import SignIn from './SignIn';
import SearchForm from './SearchForm'
import PostForm from './PostForm'

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

const FormContainer = ({ fetchSearchResults, domain }) => {
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
          <Button component={ Link } to="/posts/new" style={{ textDecoration: 'none', color: 'inherit'}} ><Icon color="primary" style={{ fontSize: 30, marginRight: '.25em' }}>add_circle</Icon>Create Post</Button>
          <Route exact path='/sign_in' render={(routerProps) => <SignIn {...routerProps} classes={classes}/>}/>
          <Route exact path={['/search', '/']} render={(routerProps) => <SearchForm {...routerProps} domain={domain} fetchSearchResults={fetchSearchResults} classes={classes}/>}/>
          <Route exact path='/posts/new' render={(routerProps) => <PostForm {...routerProps} domain={domain} classes={classes}/>}/>
        </Grid>
      </Container>
    </>
  )
}

export default FormContainer;
