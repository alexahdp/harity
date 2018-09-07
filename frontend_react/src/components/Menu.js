import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
const classes = {};
const ITEM_HEIGHT = 48;

class App extends Component {
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

    const InterviewPlanListLink = withRouter(({ history }) => (
      <Button
        color="inherit"
        onClick={() => history.push('/interviewPlanList')}
      >
        Login
      </Button>
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
                <MenuItem
                  key="news1"
                  selected={true}
                >
                  <Link to="/aaa">aaa</Link>
                </MenuItem>

                <MenuItem
                  key="news2"
                  selected={false}
                >
                  <Link to="/bb">bbb</Link>
                </MenuItem>
              </Menu>

            </IconButton>

            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              News
            </Typography>

            <Button color="inherit"><Link to="/interviewPlanList">interviewPlanList</Link></Button>

            <InterviewPlanListLink />
          </Toolbar>
        </AppBar>
    );
  }
}

export default App;
