import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import QuestionList from './list';
import QuestionForm from './form';

class App extends Component {
  componentDidMount() {
    this.props.fetchQuestions();
  }

  addQuestion = (question) => {
    this.props.addQuestion(question);
  }

  render() {
    return (
      <Grid container spasing={24} justify="center">
        <Grid item xs={4}>
          <h2>Add Question</h2>
          <QuestionForm addQuestion={this.addQuestion} />
        </Grid>

        <Grid item xs={4}>
          <h2>Questions List</h2>
          <QuestionList questions={this.props.questions} />
        </Grid>
      </Grid>
    );
  }
}

export default App;
