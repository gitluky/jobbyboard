import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import Dashboard from './Dashboard';
import { Container, makeStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4)
  },
}));

const PostContainer = ({ posts,  domain, session,  fetchSearchResults, fetchUserPosts }) => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="lg" className={classes.root}>
        <Route exact path="/" render={(...routerProps) => <PostList posts={posts.initialPosts} requesting={posts.requesting}/> } />
        <Route path="/search" render={(...routerProps) => <PostList {...routerProps} posts={posts.searchResults} requesting={posts.requesting} fetchSearchResults={fetchSearchResults} /> }/>
        <Route path="/dashboard" render={(...routerProps) => <Dashboard {...routerProps} domain={domain} session={session} posts={posts.userPosts} requesting={posts.requesting} fetchUserPosts={fetchUserPosts} /> }/>
      </Container>
    </div>
  )
}

export default PostContainer;
