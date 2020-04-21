import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
        <div key={review.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Rating: {review.rating}
              </Typography>
              <Typography variant="h6">
                 {review.title}
              </Typography>
              <Typography variant="body2" component="p">
                {review.content}
              </Typography>
              <Typography variant="body2" component="p">
                Written by: <a href={"/users/" + review.reviewer.id}>{review.reviewer.name}</a>
              </Typography>
              <Typography variant="body2" component="p">
                Written on: {formatDateTime(review.created_at)}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )
    })
  }

  return(
    <div>
      {reviews ? listReviews(reviews) : displayNoReviews()}
    </div>
  )
}


export default Reviews;
