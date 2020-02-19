import React from 'react';
import { Route } from 'react-router-dom';
import Post from './Post';

const PostList = ({posts}) => {
  return(
    <div>
      <Route exact path="/" render={(...routerProps) => posts.initialPosts ? posts.initialPosts.map(post => <Post post={post}/>) : <div>'Getting Posts'</div>} />
    </div>
  )

}

export default PostList;
