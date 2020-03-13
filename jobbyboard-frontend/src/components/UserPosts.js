import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  indicator: {
    indicator: {
      color: 'white'
    }
  }
}))



const UserPosts = ({location, history, match, domain, session, fetchUserData, users, requesting}) => {
  const classes = useStyles();
  const user = users[match.params.id] || null;

  const [value, setValue] = useState(0);

  useEffect(() => {
    fetchUserData(`${domain}/users/${match.params.id}`, `${session.jwt}`);
  }, []);

  const formatFetchedPosts = (userPosts) => {
    return userPosts.map((userPost) => {
      return { id: userPost.id, attributes: {...userPost} };
    })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{ style: { backgroundColor: 'white'}}}>
          <Tab label="Active Posts" />
          <Tab label="Past Posts" />
          <Tab label="Reviews" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PostList posts={user ? formatFetchedPosts(user.attributes.active_posts) : []} requesting={requesting}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PostList posts={user ? formatFetchedPosts(user.attributes.inactive_posts) : []} requesting={requesting}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  )

}

export default UserPosts;
