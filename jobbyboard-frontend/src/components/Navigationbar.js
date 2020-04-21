import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton, MenuItem, ClickAwayListener, Paper, Popper, MenuList } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'inherit'
  },
}));

const Navigationbar = (props) =>  {
  const { domain, session, signOut, history, match, fetchUserData, fetchInitialPosts } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };



  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleSignOut = (event) => {
    event.preventDefault();
    signOut(domain, session, history);
  }

  const handleMyProfile = (event) => {
    event.preventDefault();
    history.push(`/users/${session.id}`)
    fetchUserData(`${domain}/users/${session.id}`, `${session.jwt}`, history)
  }

  const handleClickJobbyboard = (event) => {
    event.preventDefault();
    history.push('/')
    fetchInitialPosts(domain);
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: 'primary', boxShadow: 'none'}}>
        <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              >
              <MenuIcon />
            </IconButton>

            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {session.id ?
                      <div>
                        <MenuItem onClick={handleMyProfile} style={{ textDecoration: 'none', color: 'default' }}>My Profile</MenuItem>
                        <MenuItem onClick={handleSignOut} style={{ textDecoration: 'none', color: 'inherit'}} >Sign Out</MenuItem>
                      </div>
                     :
                     <div>
                       <MenuItem component={ Link } to="/sign_in" style={{ textDecoration: 'none', color: 'inherit'}} >Sign In</MenuItem>
                       <MenuItem component={ Link } to="/sign_up" style={{ textDecoration: 'none', color: 'inherit'}} >Sign Up</MenuItem>
                     </div>
                    }
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Popper>

          <Typography variant="h5" className={classes.title}>
            <Button><a href="/" style={{ textDecoration: 'none', color: 'white'}} ><Typography variant="h4" component="h4">Jobbyboard</Typography></a></Button>
          </Typography>
          <Button component={ Link } to="/search" style={{ textDecoration: 'none', color: 'inherit'}} >Search</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigationbar;
