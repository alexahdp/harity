import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import linkStyles from './assets/styles.css';

const styles = {
  paperAnchorLeft: {
    top: 65,
  },
};

function Panel(props) {
  return (
    <Drawer
      anchor="left"
      open={props.show}
      variant="persistent"
      classes={{
        paperAnchorLeft: props.classes.paperAnchorLeft,
      }}
    >
      <List>
        <ListItem button>
          <Link to="/" className={linkStyles.panelLink}>Home</Link>
        </ListItem>
        <ListItem button>
          <Link to="/candidates" className={linkStyles.panelLink}>Candidates</Link>
        </ListItem>
        <ListItem button>
          <Link to="/questions" className={linkStyles.panelLink}>Questions</Link>
        </ListItem>
        <ListItem button>
          <Link to="/interviewPlanList" className={linkStyles.panelLink}>Interview Plans</Link>
        </ListItem>
      </List>
    </Drawer>
  );
}

Panel.propTypes = {
  show: PropTypes.bool,
  classes: PropTypes.shape({
    paperAnchorLeft: PropTypes.string.isRequired,
  }).isRequired,
};

Panel.defaultProps = {
  show: false,
};

export default withStyles(styles)(Panel);
