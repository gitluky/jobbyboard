import React from 'react';
import PostList from './PostList';


const PostContainer = ({posts}) => {
  return (
    <div>
      <PostList posts={posts}/>
    </div>
  )
}

export default PostContainer;
