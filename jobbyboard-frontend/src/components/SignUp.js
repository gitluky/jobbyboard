import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { DirectUpload } from 'activestorage';

import useFormInput from '../hooks/useFormInput'

const SignUp = ({ classes, history, domain, signInUser, session }) => {
  const name = useFormInput('');
  const email = useFormInput('');
  const password = useFormInput('');
  const city = useFormInput('');
  const state = useFormInput('');
  const [file, setFile] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    let jwt
    let userId
    const userData = { user: { name: name.value, email: email.value, password: password.value, city: city.value, state: state.value } }
    fetch(`${domain}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    .then(resp => {
      jwt = resp.headers.get('Authorization');
      return resp.json()
    })
    .then((json) => {
      userId = json.id;
      if (!!file) {
        attachAvatar(userId, jwt);
      } else {
        signInUser(domain, { email: email.value, password: password.value }, history)
      }      
    })
  }

  const attachAvatar = (userId, jwt) => {
    const upload = new DirectUpload(file, `${domain}/rails/active_storage/direct_uploads`);
    upload.create((error, blob) => {
      if (error) {
        console.log(error)
      } else {
        fetch(`${domain}/users/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${jwt}`
          },
          body: JSON.stringify({user: { avatar: blob.signed_id}})
        })
        .then(resp => resp.json())
        .then(json => signInUser(domain, { email: email.value, password: password.value }, history))
      }
    })
  }

  const handleFileSelect = (event) => {
    setFile(event.target.files[0])
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
             {...password}
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
            name="file"
            type="file"
            onChange={handleFileSelect}
            direct-upload="true"
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
          >Submit</Button>
        </Grid>
        </form>
      </Grid>
    </>
  )
}

export default SignUp;
