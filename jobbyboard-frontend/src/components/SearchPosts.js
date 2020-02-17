import React from 'react';
import { connect } from 'react-redux';
import { Paper, TextField, Button, makeStyles, Grid, Typography } from '@material-ui/core';

import useFormInput from '../hooks/useFormInput'

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8),
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3,0),
  },
}));

const SearchPosts = () => {
  const classes = useStyles();
  let keywords = useFormInput('');
  let location = useFormInput('');

  return(
    <>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          SearchPosts Posts
        </Typography>
         <form className={classes.form} noValidate>
           <Grid container spacing={2}>
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
           </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >SearchPosts</Button>
        </form>
      </Paper>
    </>
  )
}

export default connect()(SearchPosts);
