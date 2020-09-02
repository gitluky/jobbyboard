import 'date-fns';
import addDays from 'date-fns/addDays';
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem, InputAdornment } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import useFormInput from '../hooks/useFormInput';
import XToUserProfileButton from './XToUserProfileButton';

const PostForm = ({ classes, alerts, history, action, domain, session, match, posts, updateErrors, updateNotifications }) => {

  const getCurrentPost = () => !!posts ? posts.filter((post) => post.id.toString() === match.params.id)[0] : '';
  const currentPost = getCurrentPost();
  const method = action === 'edit' ? 'PATCH' : 'POST';

  const postId = useFormInput(() => match.params.id || '')
  const title = useFormInput(() => currentPost ? currentPost.attributes.title : '')
  const description = useFormInput(() => currentPost ? currentPost.attributes.description : '')
  const city = useFormInput(() => currentPost ? currentPost.attributes.location.split(',')[0] : '')
  const state = useFormInput(() => currentPost ? currentPost.attributes.location.split(',')[1] : '')
  const duration = useFormInput(() => currentPost ? currentPost.attributes.duration : undefined)
  const payment = useFormInput(() => currentPost ? currentPost.attributes.payment : '')
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const postData = {
      post: {
        title: title.value,
        description: description.value,
        city: city.value,
        state: state.value,
        start_datetime: `${selectedDate}`,
        expiration_datetime: `${addDays(selectedDate, duration.value)}`,
        payment: payment.value
      }
    }
    if (method === 'PATCH') {
      postData.post.id = postId.value
    }
    const url = method === 'POST' ? `${domain}/posts` : `${domain}/posts/${match.params.id}`
    fetch(`${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${session.jwt}`
      },
      body: JSON.stringify(postData)
    })
    .then(resp => resp.json())
    .then(json => {
      if (!!json.errors) {
        const errors = Object.keys(json.errors).map(field => json.errors[field].map(message => `${field.charAt(0).toUpperCase() + field.slice(1)} ${message}`)).flat()
        updateErrors(errors)
      } else {
        history.push(`/users/${session.id}`)
        updateNotifications(json.notifications)
      }
    })
    .catch(() => updateErrors(['An error occured. Please try again later.']));
  }

  return(
    <>
      <Grid container className={classes.grid}>
       <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
         <XToUserProfileButton id={session.id} history={history} />
         <Grid container spacing={2} justify="center">
           <Typography variant="h5">
             { method === 'POST' ? 'Create A New Post' : 'Update Post' }
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
             id="description"
             label="Description"
             name="description"
             rows="10"
             autoFocus
             inputProps={{ maxLength: 750}}
             {...description}
             />
           <Typography variant="caption" display="block" align="right">
             {description.value.length}/750 characters
           </Typography>
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
           <MuiPickersUtilsProvider utils={DateFnsUtils}>
           <Grid item xs={5} >
             <KeyboardDatePicker
              required
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              disablePast
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={5} >
            <KeyboardTimePicker
              required
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
               'aria-label': 'change time',
             }}
           />
          </Grid>
        </MuiPickersUtilsProvider>
          <Grid item xs={2} >
           <TextField
             required
             select
             fullWidth
             margin="normal"
             variant="outlined"
             label="Duration"
             id="duration"
             name="duration"
             {...duration}
             >
             <MenuItem value={1}>1 day</MenuItem>
             <MenuItem value={3}>3 days</MenuItem>
             <MenuItem value={5}>5 days</MenuItem>
             <MenuItem value={7}>1 week</MenuItem>
             <MenuItem value={14}>2 weeks</MenuItem>
           </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              inputProps={{ min: "0.00", step: "0.01" }}
              name="payment"
              label="Payment"
              id="payment"
              min="0.00"
              placeholder="0.00"
              {...payment}
              />
          </Grid>
          <div>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >{ method === 'POST' ? 'Create Post' : 'Update Post' }</Button>
          </Grid>
        </form>
      </Grid>
    </>
  )
}

export default PostForm;
