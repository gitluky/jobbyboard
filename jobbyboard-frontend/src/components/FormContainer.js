import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

import SignIn from './SignIn';
import SearchPosts from './SearchPosts'


const FormContainer = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Route exact path='/sign_in' component={SignIn} />
            <Route path='/search' component={SearchPosts} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default FormContainer;
