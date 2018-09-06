import React from 'react';
import { BrowserRouter as Router, Route } from  'react-router-dom';

import App from './components/App';
import Dashboard from './components/Dashboard';
import InterviewPlanList from './containers/interviewPlanList';
import Questions from './containers/questions';
import Menu from './components/Menu';
import InterviewPlan from './components/InterviewPlan';

export default () => (
  <Router>
    <div>
      <Menu />

      <Route path="/" exact component={App} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/questions" component={Questions} />
      <Route path="/interviewPlanList" component={InterviewPlanList} />
      <Route path="/interviewPlan" component={InterviewPlan} />
    </div>
  </Router>
);
