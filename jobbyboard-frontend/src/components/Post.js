import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Post = ({post}) => {
  return(
    <Grid item>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {post.attributes.title}
          </Typography>
          <Typography color="textSecondary">
            {post.attributes.formatted_created_at} - {post.attributes.location}
          </Typography>
          <Typography variant="body2" component="p">
            {post.attributes.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Post;
