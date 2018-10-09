import React, { PureComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Panel from '../Panel';

class App extends PureComponent {
  state = {
    showPanel: false,
  };

  handleClick = () => {
    this.setState({
      showPanel: !this.state.showPanel,
    });
  };

  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon onClick={this.handleClick} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Panel show={this.state.showPanel}/>
      </React.Fragment>
    );
  }
}

export default App;
