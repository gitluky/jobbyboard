import React from 'react';
import { Avatar } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import defaultAvatar from '../images/default_avatar.png'

const UserCard = ({ classes, users, match, domain }) => {
  return(
     <>
       <Grid container justify="center" direction="column">
         {users[match.params.id] ?
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
       </Grid>
     </>
  )
}

export default UserCard;
