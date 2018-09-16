import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import actions from './actions';

const App = props => (
  <Grid container>
    <Grid item xs={12}>
      <TextField
        value={props.candidate.get('firstName')}
        onChange={e => props.setProperty('firstName', e.target.value)}
        label="First Name"
        margin="normal"
      />
      <TextField
        value={props.candidate.get('lastName')}
        onChange={e => props.setProperty('lastName', e.target.value)}
        label="Last Name"
        margin="normal"
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        value={props.candidate.get('email')}
        onChange={e => props.setProperty('email', e.target.value)}
        label="Email"
        margin="normal"
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        value={props.candidate.get('birthYear')}
        onChange={e => props.setProperty('birthYear', e.target.value)}
        label="Birth Year"
        margin="normal"
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        value={props.candidate.get('description')}
        onChange={e => props.setProperty('description', e.target.value)}
        label="Description"
        margin="normal"
      />
    </Grid>
    <Grid item xs={12}>
      <Select
        onChange={e => props.setProperty('level', e.target.value)}
        value={props.candidate.get('level')}
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="junior">Junior</MenuItem>
        <MenuItem value="middle">Middle</MenuItem>
        <MenuItem value="senior">Seior</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={12}>
      <Button
        variant="contained"
        color="primary"
        onClick={props.save}
      >
        Save
      </Button>
    </Grid>
  </Grid>
);

const ContainerApp = connect(
  state => ({
    candidate: state.getIn(['candidates', 'currentCandidate']),
  }),
  {
    save: actions.save,
    setProperty: actions.setProperty,
  }
)(App);

export { App }
export default ContainerApp;
