import React from 'react';
import PostList from './PostList';
import { Container, Grid } from '@material-ui/core';


const PostContainer = ({posts}) => {
  return (
    <div>
      <Container>
        <PostList posts={posts}/>
      </Container>
    </div>
  )
}

export default PostContainer;
