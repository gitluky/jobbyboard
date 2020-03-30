import React, { useState } from 'react';
import { Card,
        CardContent,
        Typography,
        Grid,
        Button,
        ExpansionPanel,
        ExpansionPanelSummary,
        ExpansionPanelDetails } from '@material-ui/core';
import { Link } from 'react-router-dom';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Post = ({ session, post: { id, attributes: {user, title, formatted_created_at, location, description}}}) => {

  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpansion = () => {
    setIsExpanded(!isExpanded)
  }

  return(
    <Grid item>
      <Card>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id={"post_"+id}
            onClick={handleExpansion}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {title}
                <Button component={ Link } to={`/posts/${id}`} color="primary">View</Button>
                { !!session && user === session.id && <Button component={ Link } to={`/posts/${id}/edit`} color="primary">Edit</Button> }
              </Typography>
              <Typography color="textSecondary">
                {formatted_created_at} - {location}
              </Typography>
              <Typography variant="body2" component="p">
                { isExpanded ? description : description.slice(0,164) }
              </Typography>
            </CardContent>
          </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container justify="center" spacing={4}>
            <Grid item>
              <Button component={ Link } to={`/posts/${id}/chat`} variant="contained" color="secondary">Chat</Button>
            </Grid>
            <Grid item>
              <Button component={ Link } to={`/posts/${id}/apply`} variant="contained" color="primary">Apply</Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>


      </ExpansionPanel>
    </Card>
  </Grid>
  )
}

export default Post;
