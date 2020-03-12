import React from 'react';
import { Avatar } from '@material-ui/core';

const UserCard = ({ classes, users, match, domain }) => {
  return(
     <div>
      {users[match.params.id] ? <Avatar className={classes.avatarLarge} alt={users[match.params.id].name} src={`${domain}` + users[match.params.id].attributes.avatar_url}/> : ''}
      {users[match.params.id] ?
        <div>
        <div>{users[match.params.id].attributes.name}</div>
        <div>{users[match.params.id].attributes.city}, {users[match.params.id].attributes.state}</div>
        </div>
      : ''}
     </div>
  )
}

export default UserCard;
