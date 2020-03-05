import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, MenuItem } from '@material-ui/core';

import useFormInput from '../hooks/useFormInput'

const SignUp = ({ classes, history, domain }) => {
  let name = useFormInput('');
  let email = useFormInput('');
  let password = useFormInput('');
  let city = useFormInput('');
  let state = useFormInput('');
  let avatar = useFormInput('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const userData = { user: { name: name.value, email: email.value, password: password.value, city: city.value, state: state.value } }
    fetch(`${domain}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData)
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
             Create Account
           </Typography>
         </Grid>
         <Grid container spacing={1} >
           <Grid item xs={12}>
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="name"
               label="Name"
               name="name"
               autoFocus
               {...name}
             />
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="email"
               label="Email"
               name="email"
               autoFocus
             {...email}
             />
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="password"
               label="Password"
               type="password"
               name="password"
               autoFocus
             {...email}
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
         </Grid>
         <Grid container justify="center" direction="column" spacing={2}>
          <Grid item xs={12} align="center" >
           <label htmlFor="avatar-upload-file">
           <Typography variant="h6">
             Upload Profile Image
           </Typography>
           <Typography variant="subtitle2" >
             Recommended Size: 300px x 300px
           </Typography>
           </label>
          </Grid>
          <Grid item xs={12} align="center">
           <input
            accept="image/*"
            className={classes.input}
            id="avatar-upload-file"
            multiple
            name="avatar"
            type="file"
            {...avatar}
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
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

export default SignUp;
