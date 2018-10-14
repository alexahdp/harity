import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SmartSelect from 'react-select';
import actions from './actions';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginRight: 40,
    minWidth: 250,
  },
};

function Filter(props) {
  return (
    <div style={styles.root}>
      <FormControl style={styles.formControl}>
        <SmartSelect
          isMulti={true}
          isSearchable={true}
          placeholder="Skills"
          value={props.skills}
          options={props.skillsOptions}
          onChange={props.setFilterSkills}
        />
      </FormControl>

      <FormControl style={styles.formControl}>
        <SmartSelect
          placeholder="Sex"
          value={props.sex}
          options={props.sexOptions}
          onChange={props.setFilterSex}
        />
      </FormControl>

      <FormControl style={styles.formControl}>
        <SmartSelect
          placeholder="Level"
          value={props.level}
          options={props.levelOptions}
          onChange={props.setFilterLevel}
        />
      </FormControl>

      <FormControl>
        <Button
          variant="outlined"
          onClick={props.resetFilters}
        >
          Reset Filters
        </Button>
      </FormControl>
    </div>
  );
}

const selectItemPropType = PropTypes.shape({
  value: PropTypes.PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

const selectOptionsPropType = PropTypes.arrayOf(selectItemPropType).isRequired;

Filter.propTypes = {
  setFilterSkills: PropTypes.func.isRequired,
  skills: selectOptionsPropType,
  skillsOptions: selectOptionsPropType,

  setFilterLevel: PropTypes.func.isRequired,
  level: selectItemPropType,
  levelOptions: selectOptionsPropType,

  setFilterSex: PropTypes.func.isRequired,
  sex: selectItemPropType,
  sexOptions: selectOptionsPropType,

  resetFilters: PropTypes.func.isRequired,
};

const FilterContainer = compose(
  connect(
    state => ({
      level: state.getIn(['candidates', 'filters', 'level']).toJS(),
      levelOptions: state.getIn(['candidates', 'filterOptions', 'level']).toJS(),

      skills: state.getIn(['candidates', 'filters', 'skills']).toJS(),
      skillsOptions: state.getIn(['candidates', 'filterOptions', 'skills']).toJS(),

      sex: state.getIn(['candidates', 'filters', 'sex']).toJS(),
      sexOptions: state.getIn(['candidates', 'filterOptions', 'sex']).toJS(),
    }),
    {
      setFilter: actions.setFilter,
      resetFilters: actions.resetFilters,
    },
  ),
  withHandlers({
    setFilterLevel: props => value => props.setFilter('level', Immutable.Map(value)),
    setFilterSkills: props => values => props.setFilter('skills', Immutable.fromJS(values)),
    setFilterSex: props => value => props.setFilter('sex', Immutable.Map(value)),
  }),
)(Filter);
export { Filter };
export default FilterContainer;
