import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

import SignIn from './SignIn';
import SearchJobby from './SearchJobby'


const FormContainer = ({ match }) => {
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Route exact path={`${match.url}sign_in`} component={SignIn} />
          </Grid>
        </Grid>
        <Route path={`${match.url}search`} component={SearchJobby} />
      </Container>
    </>
  )
}

export default FormContainer;
