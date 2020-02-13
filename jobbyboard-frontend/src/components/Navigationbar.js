import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchJobby from './SearchJobby';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'black'
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
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>

          <Paper className={classes.paper}>
          </Paper>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="black"
              aria-label="menu"
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              >
              <MenuIcon />
            </IconButton>

            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}><NavLink to="/users/:id/dashboard" exact style={{ textDecoration: 'none', color: 'black' }} activeClassName="active" >Dashboard</NavLink></MenuItem>
                        <MenuItem onClick={handleClose}><NavLink to="/users/:id" exact style={{ textDecoration: 'none', color: 'black' }} activeClassName="active" >My Profile</NavLink></MenuItem>
                        <MenuItem onClick={handleClose}><NavLink to="/users/:id/activity" exact style={{ textDecoration: 'none', color: 'black' }} activeClassName="active" >Activty</NavLink></MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>



          <Typography variant="h6" className={classes.title}>
            Jobbyboard
          </Typography>
          <Button color="black"><Link to="/sign_in" exact style={{ textDecoration: 'none', color: 'black' }} activeClassName="active" >Sign In</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigationbar;
