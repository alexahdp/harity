import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SmartSelect from 'react-select';
import ac from './actions';
import Alert from '../Alert';
import styles from './assets/styles.css';

const candidateScheme = Yup.object().shape({
  firstName: Yup.string()
    .required('Required')
    .trim()
    .min(2, 'Too short')
    .max(100, 'Too long'),

  lastName: Yup.string()
    .required('Required')
    .trim()
    .min(2, 'Too short')
    .max(100, 'Too long'),

  contacts: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .lowercase(),

    phone: Yup.string()
      // .phone('Invalid email')
      .lowercase()
      .matches(/^\+?[\d\s]+$/, {
        message: 'Incorrect phone number',
        excludeEmptyString: true,
      }),

    skype: Yup.string()
      .lowercase('lowercase'),
  }),
});

function Candidate(props) {
  const candidate = props.candidate.toJS();
  candidate.sex = props.sexMap.get(candidate.sex).toJS();
  candidate.level = props.levelMap.get(candidate.level).toJS();
  candidate.skills = candidate.skills.map(v => ({ value: v, label: v}));

  return (
    <Grid container justify="center">
      {props.errorAlertVisible && <Alert
        show={true}
        onClose={props.hideErrorAlert}
        message="Ошибка при сохранении!"
        variant="error"
      />}

      <Formik
        enableReinitialize={true}
          initialValues={candidate}
          validationSchema={candidateScheme}
          onSubmit={values => {
            props.save({
              _id: props.candidate.get('_id'),
              firstName: values.firstName,
              lastName: values.lastName,
              description: values.description,
              sex: values.sex.value,
              level: values.level.value,
              skills: values.skills.map(v => v.value),
            });
          }}
          render={({
            values,
            errors,
            touched,
            // handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            // isSubmitting,
          }) => (
            <Fragment>
              <Grid item md={4}>
                <Grid item md={8}>
                  <h4>Name</h4>
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
                    name="birthYear"
                    value={values.birthYear}
                    onChange={handleChange}
                    label="Birth Year"
                    margin="normal"
                    fullWidth={true}
                  />
                  {errors.birthYear && touched.birthYear && <div>{errors.birthYear}</div>}
                </Grid>

                <Grid item md={8}>
                  <div className={styles.caption}>Sex</div>
                  <SmartSelect
                    name="sex"
                    value={values.sex}
                    options={props.sexOptions}
                    onChange={value => setFieldValue('sex', value)}
                  />
                </Grid>

                <Grid item md={8}>
                  <div className={styles.caption}>Level</div>
                  <FormControl className={styles.formControl}>
                    <SmartSelect
                      name="level"
                      value={values.level}
                      options={props.levelOptions}
                      onChange={value => setFieldValue('level', value)}
                    />
                    {errors.level && touched.level && <div>{errors.level}</div>}
                  </FormControl>
                </Grid>

                <Grid item md={8}>
                  <div className={styles.caption}>Skills</div>
                  <FormControl className={styles.formControl}>
                    <SmartSelect
                      name="skills"
                      isMulti={true}
                      isSearchable={true}
                      value={values.skills}
                      options={props.skillsOptions}
                      onChange={value => setFieldValue('skills', value)}
                    />
                    {errors.skills && touched.skills && <div>{errors.skills}</div>}
                  </FormControl>
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

                <Grid item md={8}>
                  <TextField
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    label="Description"
                    margin="normal"
                    variant="outlined"
                    multiline
                    fullWidth={true}
                    rows={4}
                    rowsMax={8}
                  />
                  {errors.description && touched.description && <div>{errors.description}</div>}
                </Grid>
              </Grid>

              <Grid
                container
                justify="flex-end"
                style={{ display: 'flex' }}
              >
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
  errorAlertVisible: PropTypes.bool.isRequired,
  hideErrorAlert: PropTypes.func.isRequired,
  levelOptions: PropTypes.instanceOf(Immutable.List).isRequired,
  save: PropTypes.func.isRequired,
  sexOptions: PropTypes.instanceOf(Immutable.List).isRequired,
  skillsOptions: PropTypes.instanceOf(Immutable.List).isRequired,
};

const ContainerCandidate = compose(
  connect(
    state => ({
      candidate: state.getIn(['candidate', 'currentCandidate']),
      levelOptions: state.getIn(['candidates', 'filterOptions', 'level']).toJS(),
      levelMap: state.getIn(['candidates', 'filterOptions', 'levelMap']),
      skillsOptions: state.getIn(['candidates', 'filterOptions', 'skills']).toJS(),
      sexOptions: state.getIn(['candidates', 'filterOptions', 'sex']).toJS(),
      sexMap: state.getIn(['candidates', 'filterOptions', 'sexMap']),
      errorAlertVisible: state.getIn(['candidates', 'errorAlertVisible']),
    }),
    {
      save: ac.save,
      setProperty: ac.setProperty,
      fetchList: ac.fetchList,
      getCandidate: ac.fetch,
      hideErrorAlert: ac.hideErrorAlert,
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
