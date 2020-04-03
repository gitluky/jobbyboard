import React from 'react';
import Post from './Post';

import { Grid,  Typography } from '@material-ui/core';

const PostList = ({classes, user, history, domain, posts, requesting, session}) => {
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
        <Typography variant="h6">
           Number of Posts: { posts ? posts.length : '' }
        </Typography>
        { posts ? posts.map(post => <Post key={post.id} classes={classes} user={user} post={post} session={session} history={history} domain={domain} />) : postMessage()}
      </Grid>
    </div>
  )
}



export default PostList;
