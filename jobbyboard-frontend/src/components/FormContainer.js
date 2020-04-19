import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

import SignIn from './SignIn';
import SignUp from './SignUp';
import EditUser from './EditUser';
import SearchForm from './SearchForm';
import PostForm from './PostForm';
import UserCard from './UserCard';
import ReviewForm from './ReviewForm';

const FormContainer = ({ classes, fetchSearchResults, signInUser, domain, session, users, alerts, updateErrors, clearErrors }) => {

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Route exact path='/sign_in' render={routerProps => <SignIn {...routerProps} classes={classes} domain={domain} signInUser={signInUser} alerts={alerts} updateErrors={updateErrors} clearErrors={clearErrors} />}/>
          <Route exact path='/sign_up' render={routerProps => <SignUp {...routerProps} classes={classes} domain={domain} signInUser={signInUser} alerts={alerts} updateErrors={updateErrors} clearErrors={clearErrors} /> }/>
          <Route exact path='/users/:id/edit' render={routerProps => <EditUser {...routerProps} classes={classes} domain={domain} signInUser={signInUser} /> }/>
          <Route exact path={['/search', '/']} render={routerProps => <SearchForm {...routerProps} domain={domain} fetchSearchResults={fetchSearchResults} classes={classes} />}/>
          <Route exact path='/posts/new' render={routerProps => <PostForm {...routerProps} session={session} domain={domain} classes={classes} />}/>
          <Route exact path='/users/:id' render={routerProps => <UserCard {...routerProps} session={session} domain={domain} classes={classes} users={users} />} />
          <Route exact path='/users/:id/review' render={routerProps => <ReviewForm {...routerProps} session={session} domain={domain} classes={classes} users={users} alerts={alerts} updateErrors={updateErrors} clearErrors={clearErrors} />} />
        </Grid>
      </Container>
    </>
  )
}

export default FormContainer;
