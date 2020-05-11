import React from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

const XToUserProfileButton = ({id, history}) => {

  const handleFormExit = (e) => {
    e.preventDefault();
    history.push(`/users/${id}`);
  }

  return(
    <>
     <Grid container spacing={2} justify="flex-end">
      <Button onClick={handleFormExit}>
        <Typography variant="h5">
         x
        </Typography>
     </Button>
    </Grid>
   </>
  )
}

export default XToUserProfileButton;
