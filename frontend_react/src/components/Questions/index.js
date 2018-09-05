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
      <Grid container spasing={32} justify="space-evenly">
        <Grid item xs={3}>
          <h2>Add Question</h2>
          <QuestionForm
            editQuestion={this.props.editQuestion}
            addQuestion={this.addQuestion}
            updateQuestion={this.updateQuestion}
          />
        </Grid>

        <Grid item xs={4}>
          <h2>Questions List</h2>
          <QuestionList
            questions={this.props.questions}
            editHandle={this.props.setEditQuestion}
            removeHandle={this.props.removeQuestion}
          />
        </Grid>
      </Grid>
    );
  }
}

export default App;
