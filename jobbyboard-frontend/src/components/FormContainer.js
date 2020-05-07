import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

import SignIn from './SignIn';
import SignUp from './SignUp';
import EditUser from './EditUser';
import SearchForm from './SearchForm';
import PostForm from './PostForm';
import UserCard from './UserCard';
import ReviewForm from './ReviewForm';
import Alerts from './Alerts';

const FormContainer = ({ classes, history, location, match, fetchSearchResults, signInUser, domain, session, users, alerts, updateErrors, clearAlerts, updateNotifications }) => {

  useEffect(() => {
    if (!!alerts.errors) {
      clearAlerts();
    }
  }, [location])

  return (
    <>
      <Container maxWidth="lg">
        <Grid container justify="center" direction="column" spacing={2} style={{ marginBottom: '1em'}}>
         { !!alerts && <Alerts alerts={alerts} />}
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Route exact path='/sign_in' render={routerProps => <SignIn {...routerProps} classes={classes} domain={domain} signInUser={signInUser} alerts={alerts} updateErrors={updateErrors} clearAlerts={clearAlerts} />}/>
          <Route exact path='/sign_up' render={routerProps => <SignUp {...routerProps} classes={classes} domain={domain} signInUser={signInUser} alerts={alerts} updateErrors={updateErrors} clearAlerts={clearAlerts} /> }/>
          <Route exact path='/users/:id/edit' render={routerProps => <EditUser {...routerProps} classes={classes} domain={domain} signInUser={signInUser} /> }/>
          <Route exact path={['/search', '/']} render={routerProps => <SearchForm {...routerProps} domain={domain} fetchSearchResults={fetchSearchResults} classes={classes} />}/>
          <Route exact path='/posts/new' render={routerProps => <PostForm {...routerProps} session={session} domain={domain} classes={classes} action={"new"} alerts={alerts} updateErrors={updateErrors} clearAlerts={clearAlerts} updateNotifications={updateNotifications}/>}/>
          <Route exact path='/posts/:id/duplicate' render={routerProps => <PostForm {...routerProps} session={session} domain={domain} classes={classes} action={"duplicate"} alerts={alerts} updateErrors={updateErrors} clearAlerts={clearAlerts} updateNotifications={updateNotifications} posts={users[session.id] ? users[session.id].attributes.inactive_posts : []}/> }/>
          <Route exact path='/users/:user_id/posts/:id/edit' render={routerProps => <PostForm {...routerProps} session={session} domain={domain} classes={classes} action={"edit"} alerts={alerts} updateErrors={updateErrors} clearAlerts={clearAlerts} updateNotifications={updateNotifications} posts={users[session.id] ? users[session.id].attributes.active_posts : []}/> }/>
          <Route exact path='/users/:id' render={routerProps => <UserCard {...routerProps} session={session} domain={domain} classes={classes} users={users} />} />
          <Route exact path='/users/:id/review' render={routerProps => <ReviewForm {...routerProps} session={session} domain={domain} classes={classes} users={users} alerts={alerts} updateErrors={updateErrors} clearAlerts={clearAlerts} updateNotifications={updateNotifications} />} />
        </Grid>
      </Container>
    </>
  )
}

export default FormContainer;
