import React, { useState, useEffect } from 'react';
import { Card,
        CardContent,
        Typography,
        Grid,
        Button,
        ExpansionPanel,
        ExpansionPanelSummary,
        ExpansionPanelDetails,
        Avatar} from '@material-ui/core';
import { Link } from 'react-router-dom';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';

import defaultAvatar from '../images/default_avatar.png';

const Post = ({ classes, domain, history, session, post: { id, attributes: {user, title, formatted_start_date, formatted_exp_date, location, description, likers, active }}, formatDateTime}) => {

  const [isExpanded, setIsExpanded] = useState(false)
  const [liked, setLiked] = useState(null)

  useEffect(() => {
    if (session.isSignedIn) setLiked(() => likers.includes(session.id))
  }, [session])

  const handleExpansion = () => {
    setIsExpanded(!isExpanded)
  }

  const handleLike = (event) => {
    event.preventDefault();
    if (session.isSignedIn) {
      const likeData = { like: { user_id: session.id, post_id: id} }
      fetch(`${domain}/posts/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `${session.jwt}`
        },
        body: JSON.stringify(likeData)
      })
      .then(resp => resp.json())
      .then(json => setLiked(!liked))
    } else {
      history.push('/login')
    }
  }

  const handleUnlike = (event) => {
    event.preventDefault();
    if (session.isSignedIn) {
      const unlikeData = { like: { user_id: session.id, post_id: id} }
      fetch(`${domain}/posts/${id}/unlike`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `${session.jwt}`
        },
        body: JSON.stringify(unlikeData)
      })
      .then(resp => resp.json())
      .then(json => setLiked(!liked))
    } else {
      history.push('/login')
    }
  }

  return(
    <Grid item>
      <Card>
        <Grid style={{background: '#3f51b5', paddingTop: '.5em', color: 'white'}}>
          <Typography variant="h5" component="h2">
            {(session.isSignedIn && user.id !== session.id) ?
              <>
                {!liked ?
                  <Button onClick={handleLike} color="inherit"><FavoriteBorderOutlinedIcon/></Button>
                  :
                  <Button onClick={handleUnlike}><FavoriteIcon color="error"/></Button>
                }
                </>
              :
              <Button disabled><FavoriteBorderOutlinedIcon/></Button>
            }
          {title}

          { session.isSignedIn && user === session.id &&
            <>
            <Button component={ Link } to={`/posts/${id}`} color="primary">View</Button>
            </> }
          </Typography>
        </Grid>
        <ExpansionPanel style={{margin: "0", padding: '0'}}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id={"post_"+id}
            onClick={handleExpansion}
            style={{userSelect: "auto"}}
          >
            <CardContent  style={{margin: "0", padding: '0 0 8px'}}>
              <Typography color="textSecondary">
                {location}
              </Typography>
              <Typography variant="body2" component="p">
                { isExpanded ? description : description.slice(0,164) }
              </Typography>
            </CardContent>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container justify="center">
              <div>
                <div>
                  <Typography variant="body2" component="p">
                    Posted On: {formatDateTime(formatted_start_date)}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" component="p">
                    Expires On: {formatDateTime(formatted_exp_date)}
                  </Typography>
                </div>
              </div>
              <Grid container justify="center" style={{ marginTop: '1em'}}>
                <Typography variant="body2" component="p">
                  Email: {user.email}
                </Typography>
              </Grid>
              <Grid container justify="center" style={{ marginTop: '1em'}}>
                <Link to={"/users/" + user.id}>
                  <Card style={{ padding: '1em 2em'}}>
                    <Grid container alignItems="center" spacing={2}>
                      { user.avatar_url ?
                        <Grid item>
                          <Avatar className={classes.avatarSmall} alt={user.name} src={`${domain}` + user.avatar_url}/>
                        </Grid>
                        :
                        <Grid item>
                          <Avatar className={classes.avatarSmall} alt="default-avatar" src={defaultAvatar}/>
                        </Grid>
                      }
                      <Grid item>
                        <Typography variant="body2" component="p">
                          {user.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Link>
              </Grid>
              <Grid container justify="center" style={{ marginTop: '1em'}}>
                {(session.isSignedIn && session.id === user.id) &&
                  <div>
                    <Typography variant="body2" component="p">
                      { active ?
                        <>
                        <Link to={"/users/" + user.id + "/posts/" + id + "/edit"} style={{ textDecoration: 'none', paddingRight: '1em', borderRight: '1px solid' }}>Edit</Link>
                        <Link to={"/posts/" + id + "/deactivate"} style={{ textDecoration: 'none', padding: '0 1em', borderRight: '1px solid' }}>Deactivate</Link>
                        <Link to={"/posts/" + id + "/delete"} style={{ textDecoration: 'none', padding: '0 1em' }}>Delete</Link>
                        </>
                        :
                        <>
                        <Link to={"/posts/" + id + "/duplicate"} style={{ textDecoration: 'none', padding: '0 1em'}}>Duplicate</Link>
                        </>
                      }
                    </Typography>
                  </div>
                }
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  </Grid>
  )
}

export default Post;
