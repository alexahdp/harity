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

router.get('/api/questions', question.list);
router.post('/api/question', question.create);
router.get('/api/question/:questionId', question.read);
router.put('/api/question/:questionId', question.update);
router.delete('/api/question/:questionId', question.remove);

router.get('/api/questionTags', question.tagList);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', (err:any, ctx:any) => {
  console.error('FATAL ERROR');
  console.error(err);
});

app.listen(conf.port, () => {
  console.log(`Server started on port: ${conf.port}`);
});

process.on('unhandledRejection', err => {
  console.log('unhandledRejection!');
  console.log(err);
});
