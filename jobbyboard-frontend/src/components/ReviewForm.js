import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, MenuItem } from '@material-ui/core';
import Alerts from './Alerts';

import useFormInput from '../hooks/useFormInput'

const ReviewForm = ({ classes, history, domain, session, match, users, alerts, updateErrors, clearErrors }) => {
  const title = useFormInput('');
  const content = useFormInput('');
  const rating = useFormInput('');

  useEffect(() => {
    if (!!alerts.errors) {
      clearErrors();
    }
  }, [history])

  const handleOnSubmit = (event) => {
    event.preventDefault();
    fetch(`${domain}/users/${match.params.id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${session.jwt}`
      },
      body: JSON.stringify({
        review: {
          title: title.value,
          content: content.value,
          rating: rating.value,
          reviewee_id: match.params.id,
          reviewer_id: session.id
        }
      })
    })
    .then(resp => resp.json())
    .then(json =>{
      debugger;
      if (!!json.errors) {
        const errors = Object.keys(json.errors).map(field => json.errors[field].map(message => `${field.charAt(0).toUpperCase() + field.slice(1)} ${message}`)).flat()
        updateErrors(errors)
      } else {
        console.log(json)
      }
    })
    .catch(error => console.log(error));
  }

  return(
    <>
      <Grid container className={classes.grid}>
       <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
         <Grid container justify="center" direction="column" spacing={2} style={{ marginBottom: '1em'}}>
          { !!alerts && <Alerts alerts={alerts} />}
         </Grid>
         <Grid container spacing={2} justify="center">
           <Typography variant="h5">
             Write a review { users[match.params.id] ? `for ${users[match.params.id].attributes.name}` : '' }
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
             inputProps={{ maxLength: 120}}
             {...title}
             />
             <Typography variant="caption" display="block" align="right">
               {title.value.length}/120 characters
             </Typography>
           <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             multiline
             id="content"
             label="Content"
             name="content"
             rows="10"
             autoFocus
             inputProps={{ maxLength: 750}}
             {...content}
             />
           <Typography variant="caption" display="block" align="right">
             {content.value.length}/750 characters
           </Typography>
           </Grid>
          <Grid item xs={2} >
           <TextField
             required
             select
             fullWidth
             margin="normal"
             variant="outlined"
             label="Rating"
             id="rating"
             name="rating"
             {...rating}
             >
             <MenuItem value={1}>1</MenuItem>
             <MenuItem value={2}>2</MenuItem>
             <MenuItem value={3}>3</MenuItem>
             <MenuItem value={4}>4</MenuItem>
             <MenuItem value={5}>5</MenuItem>
           </TextField>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >Submit Review</Button>
          </Grid>
        </form>
      </Grid>
    </>
  )
}

export default ReviewForm;
