import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ac from './actions';

const candidateScheme = Yup.object().shape({
  firstName: Yup.string()
    .required('Required')
    .trim()
    .min(2, 'Too short')
    .max(100, 'Too long'),

  middleName: Yup.string()
    .min(2, 'Too short')
    .trim()
    .max(100, 'Too long'),

  lastName: Yup.string()
    .required('Required')
    .trim()
    .min(2, 'Too short')
    .max(100, 'Too long'),

  sex: Yup.string()
    .oneOf([null, 'male', 'frmale']),

  contacts: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .lowercase(),

    phone: Yup.string()
      // .phone('Invalid email')
      .matches(/^\+?[\d\s]+$/, 'Incorrect phone number')
      .lowercase(),

    skype: Yup.string()
      .lowercase('lowercase'),
  }),
});

function Candidate(props) {
  return (
    <Grid container justify="center">
      <Formik
        enableReinitialize={true}
          initialValues={props.candidate.toJS()}
          validationSchema={candidateScheme}
          onSubmit={values => {
            props.save({
              _id: props.candidate.get('_id'),
              ...values,
            });
          }}
          render={({
            values,
            errors,
            touched,
            // handleBlur,
            handleChange,
            handleSubmit,
            // isSubmitting,
          }) => (
            <Fragment>

              <Grid item md={4}>
                <Grid item md={8}>
                  <h4>Name</h4>
                </Grid>
                <Grid item md={8}>
                  <TextField
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    label="First Name"
                    margin="normal"
                    fullWidth={true}
                  />
                  {errors.firstName && touched.firstName && <div>{errors.firstName}</div>}
                </Grid>
                <Grid item md={8}>
                  <TextField
                    name="middleName"
                    value={values.middleName}
                    onChange={handleChange}
                    label="Middle Name"
                    margin="normal"
                    fullWidth={true}
                  />
                  {errors.middleName && touched.middleName && <div>{errors.middleName}</div>}
                </Grid>
                <Grid item md={8}>
                  <TextField
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    label="Last Name"
                    margin="normal"
                    fullWidth={true}
                  />
                  {errors.lastName && touched.lastName && <div>{errors.lastName}</div>}
                </Grid>
              </Grid>

              <Grid item md={4}>
                <Grid item md={8}>
                  <h4>Contacts</h4>
                </Grid>

                <Grid item md={8}>
                  <TextField
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    label="Email"
                    margin="normal"
                    fullWidth={true}
                  />
                  {errors.email && touched.email && <div>{errors.email}</div>}
                </Grid>
                <Grid item md={8}>
                  <TextField
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    label="Phone"
                    margin="normal"
                    fullWidth={true}
                  />
                  {errors.phone && touched.phone && <div>{errors.phone}</div>}
                </Grid>
                <Grid item md={8}>
                  <TextField
                    name="skype"
                    value={values.skype}
                    onChange={handleChange}
                    label="Skype"
                    margin="normal"
                    fullWidth={true}
                  />
                  {errors.skype && touched.skype && <div>{errors.skype}</div>}
                </Grid>
              </Grid>

              <Grid item md={8}>
                <TextField
                  name="birthYear"
                  value={values.birthYear}
                  onChange={handleChange}
                  label="Birth Year"
                  margin="normal"
                />
                {errors.birthYear && touched.birthYear && <div>{errors.birthYear}</div>}
              </Grid>

              <Grid item md={8}>
                <TextField
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  label="Description"
                  margin="normal"
                  multiline
                  rows={4}
                  rowsMax={8}
                />
                {errors.description && touched.description && <div>{errors.description}</div>}
              </Grid>

              <Grid item md={8}>
                <FormControl>
                  <InputLabel htmlFor="level-select">Level</InputLabel>
                  <Select
                    name="level"
                    onChange={handleChange}
                    value={values.level}
                    inputProps={{
                      name: 'level',
                      id: 'level-select',
                    }}
                  >
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="junior">Junior</MenuItem>
                    <MenuItem value="middle">Middle</MenuItem>
                    <MenuItem value="senior">Seior</MenuItem>
                  </Select>
                  {errors.level && touched.level && <div>{errors.level}</div>}
                </FormControl>
              </Grid>

              <Grid item md={8} justify="flex-end" style={{ display: 'flex' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Grid>
            </Fragment>
          )}
      />
    </Grid>
  );
}

Candidate.propTypes = {
  candidate: PropTypes.instanceOf(Immutable.Map).isRequired,
  save: PropTypes.func.isRequired,
};

const ContainerCandidate = compose(
  connect(
    state => ({
      candidate: state.getIn(['candidates', 'currentCandidate']),
    }),
    {
      save: ac.save,
      setProperty: ac.setProperty,
      fetchList: ac.fetchList,
      getCandidate: ac.fetch,
    },
  ),
  lifecycle({
    componentWillMount() {
      if (
        this.props.match.params.candidateId
        && this.props.match.params.candidateId !== this.props.candidate.get('_id')
      ) {
        this.props.getCandidate(this.props.match.params.candidateId);
      }
    },
  }),
)(Candidate);

export { Candidate };
export default ContainerCandidate;
