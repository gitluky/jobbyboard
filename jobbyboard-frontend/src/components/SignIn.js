import React from 'react';
import { connect } from 'react-redux';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import { signInUser} from '../actions/sessionsActions';

import useFormInput from '../hooks/useFormInput';

const SignIn = ({signInUser, apiDomain, history, classes }) => {
  let email = useFormInput('');
  let password = useFormInput('');

  const handleSubmit = event => {
    event.preventDefault();
    let payload = {email: email.value, password: password.value};
    signInUser(apiDomain, payload, history);
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

const mapStateToProps = (state) => {
  return {apiDomain: state.api.domain};
}

export default connect(mapStateToProps, {signInUser})(SignIn);
