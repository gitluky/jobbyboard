import React from 'react';

const Post = ({post}) => {
  return(
    <div>
      <li>{post.attributes.title}</li>
      <li>{post.attributes.description}</li>
      <li>{post.attributes.start_datetime}</li>
      <li>{post.attributes.end_datetime}</li>
      <li>{post.attributes.expiration_datetime}</li>
      <li>{post.attributes.location}</li>
    </div>
  )
}

export default Post;
