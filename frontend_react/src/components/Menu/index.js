import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const classes = {};
const ITEM_HEIGHT = 48;

class App extends PureComponent {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const menuItems = {
      '/': {
        title: 'Main',
      },
      '/interviewPlanList': {
        title: 'InterviewPlan List',
      },
      '/dashboard': {
        title: 'Dashboard',
      },
      '/questions': {
        title: 'Questions',
      },
      '/candidates': {
        title: 'Candidates',
      },
    };

    const MyMenu = withRouter(({ history }) => (
        <Menu
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {Object.keys(menuItems).map(link => (
            <MenuItem
              key={link}
              selected={history.location.pathname === link}
            >
              <Link to={link}>{menuItems[link].title}</Link>
            </MenuItem>
          ))}
        </Menu>
    ));

    const CurrentLocation = withRouter(({ history }) => (
      <Typography
        variant="title"
        color="inherit"
        className={classes.flex}
      >
        {
          menuItems[history.location.pathname]
            ? menuItems[history.location.pathname].title
            : ''
        }
      </Typography>
    ));

    return (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon onClick={this.handleClick} />
              <MyMenu />
            </IconButton>

            <CurrentLocation />

          </Toolbar>
        </AppBar>
    );
  }
}

export default App;
