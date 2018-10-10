import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
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
import FilterPanel from './filter';
import ac from '../actions';
import styles from './assets/styles.css';


function CandidateList(props) {
  return (
    <Grid container spasing={32} justify="space-evenly">
      <Grid item xs={6}>
        <Button
          onClick={props.toggleFilterPanel}
          variant="outlined"
        >
          Filters
        </Button>
        { props.isShownFilterPanel && <FilterPanel /> }
        { (props.candidates.size === 0)
          ? (<h3>Список пуст</h3>)
          : <List>
            {props.candidates.map(candidate => (
              <ListItem key={candidate.get('_id')}>
                <ListItemText>
                  {`${candidate.get('firstName')} ${candidate.get('lastName')}`}
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
        }

        <Button
          onClick={props.addCandidate}
          variant="fab"
          color="secondary"
          classes={{ root: styles.addCandidateButton }}
        >
          <AddIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

CandidateList.propTypes = {
  addCandidate: PropTypes.func.isRequired,
  candidates: PropTypes.instanceOf(Immutable.List).isRequired,
  fetchCandidates: PropTypes.func.isRequired,
  isShownFilterPanel: PropTypes.bool.isRequired,
  gotoCandidate: PropTypes.func.isRequired,
  removeCandidate: PropTypes.func.isRequired,
  resetCurrentCandidate: PropTypes.func.isRequired,
  toggleFilterPanel: PropTypes.func.isRequired,
};

const ContainerCandidateList = compose(
  connect(
    state => ({
      candidates: state.getIn(['candidates', 'list']),
      isShownFilterPanel: state.getIn(['candidates', 'isShownFilterPanel']),
    }),
    {
      fetchCandidates: ac.fetchList,
      hideFilterPanel: ac.hideFilterPanel,
      removeCandidate: ac.remove,
      resetCurrentCandidate: ac.resetCurrent,
      showFilterPanel: ac.showFilterPanel,
    },
  ),
  withHandlers({
    gotoCandidate: props => candidateId => {
      props.history.push(`/candidate/${candidateId}`);
    },
    addCandidate: props => () => {
      props.resetCurrentCandidate();
      props.history.push('/candidate');
    },
    toggleFilterPanel: props => () => {
      if (props.isShownFilterPanel) {
        props.hideFilterPanel();
      } else {
        props.showFilterPanel();
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchCandidates();
    },
  }),
)(CandidateList);

export { CandidateList };
export default ContainerCandidateList;
