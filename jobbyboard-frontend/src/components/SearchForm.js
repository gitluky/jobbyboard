import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, MenuItem } from '@material-ui/core';

import useFormInput from '../hooks/useFormInput'

const SearchForm = ({ classes, fetchSearchResults, history, location, domain, match }) => {
  const q = useFormInput('');
  const searchLocation = useFormInput('');
  const distance = useFormInput(50);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (location.pathname === "/search" && location.search !== "") {
      fetchSearchResults(`${domain}${location.pathname}/${location.search}`)
    }
  },[])

  const handleOnSubmit = (event) => {
    event.preventDefault();
    history.push(`${url}`)
    fetchSearchResults(`${domain}${url}`)
  }

  useEffect(() => {
    const formatParams = (q, searchLocation, distance) => {
      return[`${q.value ? 'q=' + q.value : ''}`, `${searchLocation.value ? 'location=' + searchLocation.value : ''}`, `${distance.value ? 'distance=' + distance.value : ''}`].filter(Boolean).join('&')
    }
    setUrl(`/search?${formatParams(q,searchLocation,distance)}`)
  }, [q, searchLocation, distance]);

  return(
    <>
      <Grid container className={classes.grid}>
       <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
         <Grid container spacing={2} justify="center" >
           <Typography variant="h5">
             Search Posts
           </Typography>
         </Grid>
         <Grid container spacing={1} >
           <Grid item xs={12}>
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
         </Grid>
         <Grid container spacing={1} >
           <Grid item xs={8}>
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               name="location"
               label="Location"
               type="text"
               id="location"
               {...searchLocation}
               />
           </Grid>
           <Grid item xs={4} >
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
