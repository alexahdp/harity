import Vue from 'vue';
import Router from 'vue-router';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import Dashboard from '@/components/Dashboard';
import Questions from '@/components/questions';
import InterviewPlanEdit from '@/components/InterviewPlanEdit';
import InterviewPlanPreview from '@/components/InterviewPlanPreview';

import InterviewPlanList from '@/components/InterviewPlanList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/signin',
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/questions',
      name: 'Questions',
      component: Questions,
    },
    {
      path: '/interviewPlan',
      name: 'InterviewPlan',
      component: InterviewPlanEdit,
    },
    {
      path: '/interviewPlan/:id',
      name: 'EditInterviewPlan',
      component: InterviewPlanEdit,
    },
    {
      path: '/interviewPlanPreview/:id',
      name: 'PreviewInterviewPlan',
      component: InterviewPlanPreview,
    },
    {
      path: '/interviewPlanList',
      name: 'InterviewPlanList',
      component: InterviewPlanList,
    },
  ],
});
