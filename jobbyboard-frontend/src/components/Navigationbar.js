import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchForm from './SearchForm';

import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton, MenuItem, Menu, ClickAwayListener, Paper, Popper, MenuList } from '@material-ui/core';
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

const Navigationbar = ({ user }) =>  {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
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
                    <MenuItem onClick={handleClose} component={NavLink} to="/dashboard" style={{ textDecoration: 'none', color: 'default' }} activeClassName="active" >Dashboard</MenuItem>
                    <MenuItem onClick={handleClose} component={NavLink} to="/users/:id" style={{ textDecoration: 'none', color: 'default' }} activeClassName="active" >My Profile</MenuItem>
                    <MenuItem onClick={handleClose} component={NavLink} to="/users/:id/activity" style={{ textDecoration: 'none', color: 'default' }} activeClassName="active" >Activity</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Popper>

          <Typography variant="h5" className={classes.title}>
            Jobbyboard
          </Typography>
          <Button component={ Link } to="/search" style={{ textDecoration: 'none', color: 'inherit'}} >Search</Button>
          <Button component={ Link } to="/sign_in" style={{ textDecoration: 'none', color: 'inherit'}} >Sign In</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigationbar;
