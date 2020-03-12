import React, { useState, useEffect } from 'react';
import PostList from './PostList';

const UserPosts = ({location, history, match, domain, session, fetchUserData, users, requesting}) => {
  const user = users[match.params.id] || null

  useEffect(() => {
    fetchUserData(`${domain}/users/${match.params.id}`, `${session.jwt}`)
  }, []);

  const formatFetchedPosts = (userPosts) => {
    return userPosts.map((userPost) => {
      return { id: userPost.id, attributes: {...userPost} }
    })
  }

  return(
    <>
     <PostList posts={user ? formatFetchedPosts(user.attributes.active_posts) : []} requesting={requesting}/>
    </>
  )

}

export default UserPosts;
