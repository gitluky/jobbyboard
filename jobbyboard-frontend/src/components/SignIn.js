import React from 'react';
import { Paper, Grid, TextField, Button, Card, makeStyles } from '@material-ui/core';

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
  return(
    <>
      <Paper className={classes.paper}>
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

export default SignIn;
