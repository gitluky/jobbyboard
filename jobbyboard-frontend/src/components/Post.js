import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Post = ({post}) => {
  return(
    <Grid item>
      <Card>
    <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
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
          </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>


      </ExpansionPanel>
    </Card>
  </Grid>
  )
}

export default Post;
