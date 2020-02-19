import React from 'react';
import PostList from './PostList';
import { Container, Grid, makeStyles } from '@material-ui/core';

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
        <PostList posts={posts}/>
      </Container>
    </div>
  )
}

export default PostContainer;
