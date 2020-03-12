import React from 'react';
import PostList from './PostList';
import UserPosts from './UserPosts';
import { Container, makeStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4)
  },
}));

const PostContainer = ({ users, posts,  domain, session,  fetchSearchResults, fetchUserData }) => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="lg" className={classes.root}>
        <Route exact path="/" render={routerProps => <PostList posts={posts.initialPosts} requesting={posts.requesting}/> } />
        <Route path="/search" render={routerProps => <PostList {...routerProps} posts={posts.searchResults} requesting={posts.requesting} fetchSearchResults={fetchSearchResults} /> }/>
        <Route path="/users/:id" render={routerProps => <UserPosts {...routerProps} domain={domain} session={session} users={users} requesting={posts.requesting} fetchUserData={fetchUserData} /> }/>
      </Container>
    </div>
  )
}

export default PostContainer;
