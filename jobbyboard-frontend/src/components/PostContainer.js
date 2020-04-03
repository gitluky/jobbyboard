import React from 'react';
import PostList from './PostList';
import UserPosts from './UserPosts';
import { Container } from '@material-ui/core';
import { Route } from 'react-router-dom';

const PostContainer = ({ classes, history, users, posts,  domain, session, fetchSearchResults, fetchUserData }) => {

  return (
    <div>
      <Container maxWidth="lg" className={classes.postContainer}>
        <Route exact path="/" render={routerProps => <PostList {...routerProps} classes={classes} posts={posts.initialPosts} requesting={posts.requesting} domain={domain} session={session} /> } />
        <Route path="/search" render={routerProps => <PostList {...routerProps} classes={classes} posts={posts.searchResults} requesting={posts.requesting} fetchSearchResults={fetchSearchResults} /> }/>
        <Route path="/users/:id" render={routerProps => <UserPosts {...routerProps} classes={classes} domain={domain} session={session} users={users} requesting={posts.requesting} fetchUserData={fetchUserData} /> }/>
      </Container>
    </div>
  )
}

export default PostContainer;
