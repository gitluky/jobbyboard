import React from 'react';
import PostList from './PostList';
import UserPosts from './UserPosts';
import { Container } from '@material-ui/core';
import { Route } from 'react-router-dom';

const PostContainer = ({ classes, history, users, posts,  domain, session, fetchSearchResults, fetchUserData }) => {

  const formatDateTime = (datetime) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const newDateTime = new Date(`${datetime} UTC`)
    const month = months[newDateTime.getMonth()]
    const date = newDateTime.getDate()
    const year = newDateTime.getFullYear()
    const hour = () => {
      const val = newDateTime.getHours();
      switch(val) {
          case 0:
            return '12'
          case (val > 12):
            return val - 12;
          default:
            return val
        }
    }
    const ampm = newDateTime.getHours() > 12 ? 'PM' : 'AM'
    const minute = newDateTime.getMinutes()
    return `${month} ${date}, ${year} ${hour()}:${minute > 9 ? minute : '0'+minute} ${ampm}`
  }

  return (
      <Container maxWidth="lg" className={classes.postContainer}>
        <Route exact path="/" render={routerProps => <PostList {...routerProps} classes={classes} posts={posts.initialPosts} requesting={posts.requesting} domain={domain} session={session} formatDateTime={formatDateTime} /> } />
        <Route path="/search" render={routerProps => <PostList {...routerProps} classes={classes} posts={posts.searchResults} requesting={posts.requesting} fetchSearchResults={fetchSearchResults} formatDateTime={formatDateTime} session={session} /> }/>
        <Route path="/users/:id" render={routerProps => <UserPosts {...routerProps} classes={classes} domain={domain} session={session} users={users} requesting={posts.requesting} fetchUserData={fetchUserData} formatDateTime={formatDateTime} /> }/>
      </Container>
  )
}

export default PostContainer;
