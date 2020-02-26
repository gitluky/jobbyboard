import React from 'react';
import Post from './Post';

import { Grid,  Typography } from '@material-ui/core';

const PostList = ({posts, requesting}) => {

  const postMessage = () => {
    return(
      <Grid container justify="center" alignItems="center">
        <Typography variant="h6">
           { requesting === true ? 'Finding Posts...' : 'No Posts Found.'}
        </Typography>
      </Grid>
    )
  }

  return(
    <div>
      <Grid container spacing={2} direction="column">
        { posts ? posts.map(post => <Post key={post.id} post={post}/>) : postMessage()}
      </Grid>
    </div>
  )
}



export default PostList;
