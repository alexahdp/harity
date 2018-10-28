import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/icons/Error';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  success: {
    backgroundColor: green[600],
  },
});

const Alert = props => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={props.show}
    onClose={props.onClose}
    autoHideDuration={6000}
  >
    <SnackbarContent
      aria-describedby="client-snackbar"
      className={props.variant}
      message={
        <span id="client-snackbar" style={{ display: 'flex', alignItems: 'center' }}>
          <Icon style={{ marginRight: 20 }} />
          {props.message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  </Snackbar>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

const AlertWrapper = withStyles(styles)(Alert);
export default AlertWrapper;
