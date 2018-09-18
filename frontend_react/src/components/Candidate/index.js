import React, { Fragment } from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import actions from './actions';

const candidateScheme = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),

    firstName: Yup.string()
      .required('Required')
      .min(2, 'Too short')
      .max(100, 'Too long'),

    lastName: Yup.string()
      .required('Required')
      .min(2, 'Too short')
      .max(100, 'Too long'),
});

const App = props => (
  <Grid container justify="center">
    {console.log('WTF')}
    <Formik
      enableReinitialize={true}
        initialValues={props.candidate.toJS()}
        validationSchema={candidateScheme}
        onSubmit={(values) => {
          props.save({
            _id: props.candidate.get('_id'),
            ...values
          });
        }}
        render={({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        })=> (
          <Fragment>
            <Grid item md={8}>
              <Grid container spacing={16}>
                <Grid item md={6}>
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
                <Grid item md={6}>
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
            </Grid>

            <Grid item md={8}>
              <TextField
                name="email"
                value={values.email}
                onChange={handleChange}
                label="Email"
                margin="normal"
              />
              {errors.email && touched.email && <div>{errors.email}</div>}
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
              />
              {errors.description && touched.description && <div>{errors.description}</div>}
            </Grid>

            <Grid item md={8}>
              <Select
                name="level"
                onChange={handleChange}
                value={values.level}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="junior">Junior</MenuItem>
                <MenuItem value="middle">Middle</MenuItem>
                <MenuItem value="senior">Seior</MenuItem>
              </Select>
              {errors.level && touched.level && <div>{errors.level}</div>}
            </Grid>

            <Grid item md={8}>
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

const ContainerApp = compose(
  connect(
    state => ({
      candidate: state.getIn(['candidates', 'currentCandidate']),
    }),
    {
      save: actions.save,
      setProperty: actions.setProperty,
      fetchList: actions.fetchList,
      getCandidate: actions.fetch,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (
        this.props.match.params.candidateId &&
        this.props.match.params.candidateId !== this.props.candidate.get('_id')
      ) {
        this.props.getCandidate(this.props.match.params.candidateId);
      }
    }
  })
)(App);

export { App }
export default ContainerApp;
