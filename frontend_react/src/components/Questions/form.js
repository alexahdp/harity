import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      labels: [],
    };

    this.setText = this.setText.bind(this);
    this.setLabels = this.setLabels.bind(this);
  }

  handleAdd = () => {
    this.props.addQuestion({
      text: this.state.text,
      labels: this.state.labels,
    });
  }

  setText(e) {
    this.setState({ text: e.target.value });
  }

  setLabels(e) {
    this.setState({ labels: e.target.value.split(',') });
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            label="labels"
            onChange={this.setLabels}
          />
        </div>
        <div>
          <TextField
            label="question"
            margin="normal"
            multiline={true}
            rows={3}
            onChange={this.setText}
          />
        </div>
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleAdd}
          >Add</Button>
        </div>
      </div>
    );
  }
}

export default App;
