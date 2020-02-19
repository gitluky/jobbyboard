import React from 'react';
import { connect } from 'react-redux';
import { TextField, Button, makeStyles, Grid, Typography } from '@material-ui/core';

import useFormInput from '../hooks/useFormInput'

const SearchPosts = ({ classes }) => {
  let keywords = useFormInput('');
  let location = useFormInput('');

  return(
    <>
      <Grid container className={classes.grid}>
       <form className={classes.form} noValidate>
         <Grid container spacing={2} >
           <Typography variant="h5">
             Search Posts
           </Typography>
         </Grid>
         <Grid container spacing={2} >
         <Grid item xs={8}>
           <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="keywords"
             label="Keywords"
             name="keywords"
             autoComplete="keywords"
             autoFocus
             {...keywords}
             />
           </Grid>
           <Grid item xs={4}>
           <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             name="location"
             label="Location"
             type="text"
             id="location"
             autoComplete="current-password"
             {...location}
             />
           </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >Search Posts</Button>
          </Grid>
        </form>
      </Grid>
    </>
  )
}

export default connect()(SearchPosts);
