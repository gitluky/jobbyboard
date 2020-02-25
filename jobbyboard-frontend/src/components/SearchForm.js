import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, makeStyles, Grid, Typography, MenuItem, FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';

import useFormInput from '../hooks/useFormInput'

const SearchForm = ({ classes, fetchSearchResults, history, domain }) => {
  let q = useFormInput('');
  let location = useFormInput('');
  let distance = useFormInput('');
  let [url, setUrl] = useState('')

  const handleOnSubmit = (event) => {
    event.preventDefault();
    history.push(url);
    fetchSearchResults(`${domain}/${url}`);
  }

  useEffect(() => {
    setUrl(`/search?q=${q.value}&location=${location.value}&distance=${distance.value}`)
  }, [q, location, distance]);

  return(
    <>
      <Grid container className={classes.grid}>
       <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
         <Grid container spacing={2} >
           <Typography variant="h5">
             Search Posts
           </Typography>
         </Grid>
         <Grid container spacing={1} >
         <Grid item xs={7}>
           <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="q"
             label="Search"
             name="q"
             autoComplete="q"
             autoFocus
             {...q}
             />
           </Grid>
           <Grid item xs={3}>
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
           <Grid item xs={2} >
             <TextField
               select
               fullWidth
               margin="normal"
               variant="outlined"
               label="Distance"
               id="distance"
               name="distance"
               {...distance}
               >
               <MenuItem value={1}>1mi </MenuItem>
               <MenuItem value={5}>5mi</MenuItem>
               <MenuItem value={10}>10mi</MenuItem>
               <MenuItem value={25}>25mi</MenuItem>
               <MenuItem value={50}>50mi</MenuItem>
             </TextField>
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

export default SearchForm;
