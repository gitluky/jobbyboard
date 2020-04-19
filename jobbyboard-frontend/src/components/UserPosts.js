import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';


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


const UserPosts = ({classes, location, history, match, domain, session, fetchUserData, users, requesting, formatDateTime}) => {
  const user = users[match.params.id] || null;

  const [value, setValue] = useState(0);

  useEffect(() => {
    fetchUserData(`${domain}/users/${match.params.id}`, `${session.jwt}`, history);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{ style: { backgroundColor: 'white'}}}>
          <Tab label="Active Posts" />
          <Tab label="Past Posts" />
          <Tab label="Liked" />
          <Tab label="Reviews" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PostList posts={user ? user.attributes.active_posts : []} classes={classes} user={user} history={history} domain={domain} session={session} requesting={requesting} formatDateTime={formatDateTime}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PostList posts={user ? user.attributes.inactive_posts : []} classes={classes} user={user} history={history} domain={domain} session={session} requesting={requesting} formatDateTime={formatDateTime}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PostList posts={user ? user.attributes.liked_posts : []} classes={classes} user={user} history={history} domain={domain} session={session} requesting={requesting} formatDateTime={formatDateTime}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Reviews
      </TabPanel>
    </div>
  )

}

export default UserPosts;
