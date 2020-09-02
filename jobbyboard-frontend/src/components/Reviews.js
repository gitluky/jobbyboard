import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import Review from './Review'

const Reviews = ({reviews, formatDateTime }) => {

  const displayNoReviews = () => {
    return(
      <Grid container justify="center" alignItems="center">
        <Typography variant="h6">
           No reviews for this user yet.
        </Typography>
      </Grid>
    )
  }

  const listReviews = (reviews) => {
    return reviews.map((review) => {
      return(
        <>
        <Review review={review} formatDateTime={formatDateTime} />
        </>
      )
    })
  }

  return(
    <div>
      {reviews.length > 0 ? listReviews(reviews) : displayNoReviews()}
    </div>
  )
}


export default Reviews;
