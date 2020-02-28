import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, MenuItem } from '@material-ui/core';

import useFormInput from '../hooks/useFormInput'

const PostForm = ({ classes, history, domain, session }) => {
  let title = useFormInput('');
  let description = useFormInput('');
  let city = useFormInput('');
  let state = useFormInput('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const postData = { post: { title: title.value, description: description.value, city: city.value, state: state.value } }
    fetch(`${domain}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${session.jwt}`
      },
      body: JSON.stringify(postData)
    })
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
      history.push('/')
    })
  }

  return(
    <>
      <Grid container className={classes.grid}>
       <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
         <Grid container spacing={2} >
           <Typography variant="h5">
             New Post
           </Typography>
         </Grid>
         <Grid container spacing={1} >
         <Grid item xs={12}>
           <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="title"
             label="Title"
             name="title"
             autoFocus
             {...title}
             />
           <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             multiline
             rows="4"
             id="description"
             label="Description"
             name="description"
             rows="10"
             autoFocus
             {...description}
             />
           </Grid>
           <Grid item xs={6}>
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               name="city"
               label="City"
               type="text"
               id="city"
               autoComplete="city"
               {...city}
               />
           </Grid>
           <Grid item xs={6}>
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               name="state"
               label="State"
               type="text"
               id="state"
               autoComplete="state"
               {...state}
               />
           </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >Create Post</Button>
          </Grid>
        </form>
      </Grid>
    </>
  )
}

export default PostForm;
