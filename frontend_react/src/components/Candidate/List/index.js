import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import actions from '../actions';
import styles from './assets/styles.css';

const App = props => (
  <Grid container spasing={32} justify="space-evenly">
    <Grid item xs={6}>
      <List>
        {props.candidates.map(candidate => (
          <ListItem key={candidate.get('_id')}>
            <ListItemText>
              {candidate.get('firstName') + " " + candidate.get('lastName')}
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton>
                  <EditIcon onClick={() => props.gotoCandidate(candidate.get('_id'))} />
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={() => props.removeCandidate(candidate.get('_id'))}/>
                </IconButton>
              </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Button
        onClick={props.addCandidate}
        variant="fab"
        color="secondary"
        classes={{root: styles.addCandidateButton}}
      >
        <AddIcon />
      </Button>
    </Grid>
  </Grid>
);

const ContainerApp = compose(
  connect(
    state => ({
      candidates: state.getIn(['candidates', 'list']),
    }),
    {
      fetchCandidates: actions.fetchList,
      removeCandidate: actions.remove,
      resetCurrentCandidate: actions.resetCurrent,
    }
  ),
  withHandlers({
    gotoCandidate: props => candidateId => {
      props.history.push(`/candidate/${candidateId}`);
    },
    addCandidate: props => () => {
      props.resetCurrentCandidate();
      props.history.push('/candidate');
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchCandidates();
    }
  })
)(App);

export { App };
export default ContainerApp;
