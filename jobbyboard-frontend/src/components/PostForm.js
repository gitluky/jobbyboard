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

import useFormInput from '../hooks/useFormInput'

const PostForm = ({ classes, history, domain, session, match }) => {
  const title = useFormInput('');
  const description = useFormInput('');
  const city = useFormInput('');
  const state = useFormInput('');
  const duration = useFormInput('');
  const payment = useFormInput('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    fetch(`${domain}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${session.jwt}`
      },
      body: JSON.stringify({
        post: {
          title: title.value,
          description: description.value,
          city: city.value,
          state: state.value,
          start_datetime: selectedDate,
          expiration_datetime: `${addDays(selectedDate, duration.value)}`,
          payment: payment.value
        }
      })
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
  }

  return(
    <>
      <Grid container className={classes.grid}>
       <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
         <Grid container spacing={2} justify="center">
           <Typography variant="h5">
             Create A New Post
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
