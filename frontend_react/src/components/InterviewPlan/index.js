import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ac from './actions';
import QuestionsPull from './components/questionsPull';
import Questions from './components/questions';

class App extends PureComponent {
  constructor() {
    super();

    this.save = this.save.bind(this);
  }

  propTypes = {
    match: PropTypes.any.isRequired,
    getInterviewPlan: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired,
    interviewPlan: PropTypes.instanceOf(Immutable.Map).isRequired,
    save: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (
      this.props.match.params.interviewPlanId !== this.props.interviewPlan.get('_id')
      && this.props.match.params.interviewPlanId
    ) {
      this.props.getInterviewPlan(this.props.match.params.interviewPlanId);
    }
  }

  /* eslint-disable */
  componentWillReceiveProps(props) {
  /* eslint-enable */
    if (
      props.match.params.interviewPlanId !== props.interviewPlan.get('_id')
      && props.match.params.interviewPlanId
    ) {
      props.getInterviewPlan(props.match.params.interviewPlanId);
    }
  }

  save() {
    // ЭТО дичь, но как делать правильно пока не знаю
    this.props.save(this.props.history);
  }

  render() {
    return (
      <React.Fragment>
        <Grid container spasing={0} justify="space-evenly">
          <Grid item xs={8}>
            <TextField
              value={this.props.interviewPlan.get('title')}
              onChange={e => this.props.setTitle(e.target.value)}
              fullWidth={true}
              label="Title"
              margin="normal"
            />
          </Grid>
        </Grid>

        <Grid container spasing={0} justify="space-evenly">
          <QuestionsPull />
          <Questions />
        </Grid>

        <Grid container spasing={0} justify="space-evenly">
          <Grid item xs={8}>
            <Button
              onClick={this.save}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const ContainerApp = connect(
  state => ({
    interviewPlan: state.getIn(['interviewPlan', 'interviewPlan']),
  }),
  {
    setTitle: ac.setTitle,
    save: ac.save,
    getInterviewPlan: ac.getInterviewPlan,
  },
)(App);

export { App };
export default ContainerApp;
