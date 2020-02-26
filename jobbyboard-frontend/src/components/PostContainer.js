import React from 'react';
import PostList from './PostList';
import { Container, makeStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4)
  },
}));

const PostContainer = ({posts}) => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="lg" className={classes.root}>
        <Route exact path="/" render={(...routerProps) => <PostList posts={posts.initialPosts} requesting={posts.requesting}/> } />
        <Route path="/search" render={(...routerProps) => <PostList posts={posts.searchResults} requesting={posts.requesting}/>}/>
      </Container>
    </div>
  )
}

export default PostContainer;
