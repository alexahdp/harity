import React from 'react';
import { BrowserRouter as Router, Route } from  'react-router-dom';

import Dashboard from './components/Dashboard';
import InterviewPlanList from './components/InterviewPlanList';
import Questions from './components/Questions';
import Menu from './components/Menu';
import InterviewPlan from './components/InterviewPlan';
import Candidate from './components/Candidate';
import CandidateList from './components/Candidate/List';

export default () => (
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
