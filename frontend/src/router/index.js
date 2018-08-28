import Vue from 'vue';
import Router from 'vue-router';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import Dashboard from '@/components/Dashboard';
import Questions from '@/components/questions';
import InterviewPlan from '@/components/InterviewPlan';
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
      component: InterviewPlan,
    },
    {
      path: '/interviewPlan/:id',
      name: 'EditInterviewPlan',
      component: InterviewPlan,
    },
    {
      path: '/interviewPlanList',
      name: 'InterviewPlanList',
      component: InterviewPlanList,
    },
  ],
});
