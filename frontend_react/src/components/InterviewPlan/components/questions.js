import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Checkbox from '@material-ui/core/Checkbox';
import actions from '../actions';
import styles from '../assets/index.css';

const App = props => (
  <Grid item xs={4}>
    <h2>Target questions list</h2>

    <List>
      {props.interviewPlan.get('questions')
        .map(question => (
          <ListItem
            key={question.get('_id')}
            divider={true}
            classes={{root: styles.targetListItem}}
            disableGutters={true}
            dense={true}
          >
            <IconButton
              aria-label="Cart"
              onClick={() => props.moveDownQuestion(question.get('_id'))}
            >
              <ExpandMoreIcon />
            </IconButton>

            <IconButton
              aria-label="Cart"
              onClick={() => props.moveUpQuestion(question.get('_id'))}
            >
              <ExpandLessIcon />
            </IconButton>

            <ListItemText>
              <p>{question.get('text')}</p>
            </ListItemText>

            <Checkbox
              checked
              onChange={() => props.removeQuestion(question.get('_id'))}
            />
          </ListItem>
        ))
      }
    </List>
  </Grid>
);

const ConteinerApp = connect(
  state => ({
    interviewPlan: state.getIn(['interviewPlan', 'interviewPlan']),
  }),
  {
    moveUpQuestion: actions.moveUpQuestion,
    moveDownQuestion: actions.moveDownQuestion,
    removeQuestion: actions.removeQuestion,
  }
)(App);

export { App };
export default ConteinerApp;
