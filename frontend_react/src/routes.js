import React from 'react';
import { BrowserRouter as Router, Route } from  'react-router-dom';

import Dashboard from './components/Dashboard';
import InterviewPlanList from './components/InterviewPlanList';
import Questions from './components/Questions';
import Menu from './components/Menu';
import InterviewPlan from './components/InterviewPlan';

export default () => (
  <Router>
    <div>
      <Menu />

      <Route path="/" exact component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/questions" component={Questions} />
      <Route path="/interviewPlanList" component={InterviewPlanList} />
      <Route path="/interviewPlan" exact component={InterviewPlan} />
      <Route path="/interviewPlan/:interviewPlanId" component={InterviewPlan} />
    </div>
  </Router>
);
