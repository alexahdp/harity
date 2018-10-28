import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';

import conf from './config/appconf';
import user from './routes/user';
import question from './routes/question';
import interviewPlan from './routes/interviewPlan';
import candidate from './routes/candidate';

const app = new Koa();
const router = new Router();

const authRouter = router.use(user.authBridge);
// app.use((ctx:any, next:any) => {
//   console.log('QUERY');
//   next();
// });

app.keys = [conf.session.secretKey];
app.use(session(conf.session, app));
app.use(logger());
app.use(BodyParser());
// app.use(cors());

router.post('/api/signup', user.signUp);
router.post('/api/signin', user.signIn);
router.get('/api/test', user.authBridge, user.test);

authRouter.get('/api/questions', question.list);
authRouter.post('/api/question', question.create);
authRouter.get('/api/question/:questionId', question.read);
authRouter.put('/api/question/:questionId', question.update);
authRouter.delete('/api/question/:questionId', question.remove);
authRouter.get('/api/questionTags', question.tagList);

authRouter.get('/api/interviewplan/:interviewPlanId', interviewPlan.get);
authRouter.post('/api/interviewplan', interviewPlan.create);
authRouter.put('/api/interviewplan/:interviewPlanId', interviewPlan.update);
authRouter.delete('/api/interviewplan/:interviewPlanId', interviewPlan.delete);
authRouter.get('/api/interviewplanList', interviewPlan.list);

authRouter.get('/api/candidate/:candidateId', candidate.get);
authRouter.post('/api/candidate', candidate.create);
authRouter.put('/api/candidate/:candidateId', candidate.update);
authRouter.delete('/api/candidate/:candidateId', candidate.delete);
authRouter.get('/api/candidates', candidate.list);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.log('FATAL ERROR');
  console.log(err);
});

app.listen(conf.port, () => {
  console.log(`Server started on port: ${conf.port}`);
});

process.on('unhandledRejection', err => {
  console.log('unhandledRejection!');
  console.log(err);
});

process.on('uncaughtException', err => {
  console.log('uncaughtException');
  console.log(err);
});
