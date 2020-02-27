import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import { Container, makeStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4)
  },
}));

const PostContainer = ({ posts, fetchSearchResults, domain }) => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="lg" className={classes.root}>
        <Route exact path="/" render={(...routerProps) => <PostList posts={posts.initialPosts} requesting={posts.requesting}/> } />
        <Route path="/search" render={(...routerProps) => <PostList posts={posts.searchResults} requesting={posts.requesting} fetchSearchResults={fetchSearchResults} {...routerProps}/> }/>
      </Container>
    </div>
  )
}

export default PostContainer;
