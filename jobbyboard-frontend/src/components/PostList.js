import React from 'react';
import Post from './Post';

import { Grid,  Typography } from '@material-ui/core';

const PostList = ({classes, user, history, domain, posts, requesting, session, formatDateTime, updateNotifications}) => {
  const postMessage = () => {
    return(
      <Grid container justify="center" alignItems="center">
        <Typography variant="h6">
           { requesting === true ? 'Finding Posts...' : 'No Posts Found.'}
        </Typography>
      </Grid>
    )
  }

  const displayPostCount = () => {
    if (!!posts) {
      if (posts[0] && posts[0].attributes.distance) {
        return <>{posts.length} posts within {posts[0].attributes.distance} miles of {posts[0].attributes.search_location}.</>
    } else {
       return <>{posts.length} posts listed.</>
     }
    }
  }

  return(
    <div>
      <Grid container spacing={2} direction="column">
        <Grid container justify="center" style={{ border: '1px solid #3f51b5', borderRadius: '5px'}}>
          <Typography variant="h6">
            {displayPostCount()}
          </Typography>
        </Grid>
        { posts ? posts.map(post => <Post key={post.id} classes={classes} user={user} post={post} session={session} history={history} domain={domain} formatDateTime={formatDateTime} updateNotifications={updateNotifications} />) : postMessage()}
      </Grid>
    </div>
  )
}



export default PostList;
