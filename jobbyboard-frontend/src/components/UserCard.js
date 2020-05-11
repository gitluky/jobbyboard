import React from 'react';
import { Avatar } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import defaultAvatar from '../images/default_avatar.png'
import { Link } from 'react-router-dom';

const UserCard = ({ classes, users, match, domain, session }) => {

  const getReviewers = (users) => {
    return users[match.params.id].attributes.reviews.map((review) => review.reviewer.id)
  }

  const reviewers = users[match.params.id] ? getReviewers(users) : []

  return(
     <>
       <Grid container justify="center" direction="column">
         {(users[match.params.id] && !!users[match.params.id].attributes.avatar_url) ?
           <Grid container justify="center">
             <Avatar className={classes.avatarLarge} alt={users[match.params.id].name} src={`${domain}` + users[match.params.id].attributes.avatar_url}/>
           </Grid>
           :
           <Grid container justify="center">
            <Avatar className={classes.avatarLarge} alt="default-avatar" src={defaultAvatar}/>
          </Grid>
          }
         {users[match.params.id] ?
           <div style={{ marginTop: '1em'}}>
             <Grid container justify="center">
               <Typography variant="h5">
                 {users[match.params.id].attributes.name}
               </Typography>
             </Grid>
             <Grid container justify="center">
               <div>{users[match.params.id].attributes.city}, {users[match.params.id].attributes.state}</div>
             </Grid>
           </div>
           : ''}
         <Grid container justify="center" style={{ marginTop: '1em'}}>
           <div>
             {users[match.params.id] &&
               <div>
                 <Grid container justify="center">
                   <Typography variant="overline">
                     Avg User Rating:
                   </Typography>
                 </Grid>
                 <Grid container justify="center">
                   <Typography variant="h5">
                     {users[match.params.id].attributes.rating}
                   </Typography>
                 </Grid>
               </div>
             }
           </div>
         </Grid>
         <Grid container justify="center" style={{ marginTop: '1em'}}>
           {(session.isSignedIn && !reviewers.includes(session.id) && session.id.toString() !== match.params.id) &&
              <>
                <Link to={`/users/${match.params.id}/review`}>Write Review</Link>
              </>
           }
         </Grid>
       </Grid>
     </>
  )
}

export default UserCard;
