import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/index';
import InterviewPlanList from './components/InterviewPlanList';
import Questions from './components/Questions';
import Menu from './components/Menu/index';
import InterviewPlan from './components/InterviewPlan';
import Candidate from './components/Candidate';
import CandidateList from './components/Candidate/List';

const App = () => (
  <Router>
    <div>
      <Menu />

      <Route
        exact
        path="/"
        render={props => <Dashboard {...props} title="Dashboard" />}
      />
      <Route
        path="/dashboard"
        render={props => <Dashboard {...props} title="Dashboard" />}
      />
      <Route
        path="/candidate"
        exact
        component={Candidate}
      />
      <Route
        path="/candidate/:candidateId"
        component={Candidate}
      />
      <Route
        path="/candidates"
        component={CandidateList}
      />

      <Route path="/questions" component={Questions} />
      <Route path="/interviewPlanList" component={InterviewPlanList} />
      <Route path="/interviewPlan" exact component={InterviewPlan} />
      <Route path="/interviewPlan/:interviewPlanId" component={InterviewPlan} />
    </div>
  </Router>
);

export default App;
