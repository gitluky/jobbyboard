import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const Review = ({review, formatDateTime}) => {
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
}

export default Review;
