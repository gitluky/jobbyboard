import React, { useEffect } from 'react';
import { Typography, Grid, TextField, Button } from '@material-ui/core';

import useFormInput from '../hooks/useFormInput';

const SignIn = ({signInUser, domain, history, classes, updateErrors}) => {
  let email = useFormInput('');
  let password = useFormInput('');

  const handleSubmit = event => {
    event.preventDefault();
    let payload = {email: email.value, password: password.value};
    signInUser(domain, payload, history);
  }

  return(
    <>
      <Grid item xs={12} >
        <form className={classes.form} noValidate onSubmit={handleSubmit} >
         <Typography variant="h5">
           Sign In
         </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            {...email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >Sign In</Button>
        </form>
      </Grid>
    </>
  )
}


export default SignIn;
