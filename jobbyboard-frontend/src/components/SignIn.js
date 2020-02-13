import React from 'react';
import { connect } from 'react-redux';
import { Typography, Paper, TextField, Button, makeStyles } from '@material-ui/core';

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

const SignIn = () => {
  const classes = useStyles();
  let email = useFormInput('');
  let password = useFormInput('');

  return(
    <>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          Sign In
        </Typography>
         <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
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
      </Paper>
    </>
  )
}

const mapStateToProps = (state) => {
  return {state: state};
}



export default connect(mapStateToProps)(SignIn);
