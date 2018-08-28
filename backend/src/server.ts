require('source-map-support').install();

import Koa from 'koa';
import cors from '@koa/cors';
import Router = require('koa-router');
import BodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import logger from 'koa-logger';
import session from 'koa-session';

import conf from './config/appconf.ts';
import user from './routes/user.ts';
import question from './routes/question.ts';
import interviewPlan from './routes/interviewPlan.ts';


mongoose.connect(conf.db.url);
const db = mongoose.connection;
db.on('error', (err:any) => {
  console.log('Connect database error');
  console.log(err);
});
db.once('open', () => {
  console.log('Connect databse success');
});


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


app
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', (err:any, ctx:any) => {
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
