import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import actions from './actions';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginRight: 40,
  },
};

function Filter(props) {
  return (
    <div style={styles.root}>
      <FormControl style={styles.formControl}>
        <InputLabel htmlFor="select-multiple-chip">Skills</InputLabel>
        <Select
          input={<Input id="select-multiple-chip" />}
          type="text"
          multiple
          value={props.skills.toJS()}
          onChange={props.setFilterSkills}
        >
          {props.availableSkills.map(option => (
            <MenuItem
              value={option}
              key={option}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl style={styles.formControl}>
        <InputLabel htmlFor="select-sex">Sex</InputLabel>
        <Select
          type="text"
          value={props.sex}
          input={<Input id="select-sex" />}
          onChange={props.setFilterSex}
        >
          <MenuItem key={'none'} value={null}>None</MenuItem>
          <MenuItem key={'male'} value={'male'}>Male</MenuItem>
          <MenuItem key={'female'} value={'female'}>Female</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <Button
          variant="outlined"
        >
          Apply
        </Button>
      </FormControl>
    </div>
  );
}

Filter.propTypes = {
  availableSkills: PropTypes.instanceOf(Immutable.Map).isRequired,
  skills: PropTypes.instanceOf(Immutable.List).isRequired,
  setFilterSkills: PropTypes.func.isRequired,
  setFilterSex: PropTypes.func.isRequired,
  sex: PropTypes.string.isRequired,
};

const FilterContainer = compose(
  connect(
    state => ({
      availableSkills: state.getIn(['candidates', 'availableSkills']),
      skills: state.getIn(['candidates', 'filters', 'skills']),
      sex: state.getIn(['candidates', 'filters', 'sex']),
    }),
    {
      setFilter: actions.setFilter,
    },
  ),
  withHandlers({
    setFilterSkills: props => e => {
      props.setFilter('skills', Immutable.List(e.target.value));
    },
    setFilterSex: props => e => {
      props.setFilter('sex', e.target.value);
    },
  }),
)(Filter);
export { Filter };
export default FilterContainer;
