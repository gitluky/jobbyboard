import React from 'react';
import { Route } from 'react-router-dom';
import Post from './Post';

import { Grid,  Typography } from '@material-ui/core';

const PostList = ({posts}) => {
  return(
    <div>
      <Grid container spacing={2} direction="column">
        <Route exact path="/" render={(...routerProps) => posts.initialPosts ? posts.initialPosts.map(post => <Post key={post.id} post={post}/>) : findingPosts()} />
        <Route path="/search" render={(...routerProps) => posts.searchResults ? posts.searchResults.map(post => <Post key={post.id} post={post}/>) : findingPosts()} />
      </Grid>
    </div>
  )
}

const findingPosts = () => {
  return(
    <Grid
    container
    justify="center"
    alignItems="center"
    >
      <Typography variant="h6">
         Finding Posts...
      </Typography>
    </Grid>
  )
}

export default PostList;
