import React, { useState, useEffect } from 'react';
import PostList from './PostList';

const Dashboard = ({ posts, session, domain, fetchUserPosts }) => {
  let [userSession, setUserSession] = useState(session);

  useEffect(() => {
    fetchUserPosts(`${domain}/dashboard`, `${session.jwt}`)
  }, [userSession])

  return(
    <>
      { posts ? <PostList posts={posts} requesting={posts.requesting} /> : '' }
    </>
  )

}

export default Dashboard;
