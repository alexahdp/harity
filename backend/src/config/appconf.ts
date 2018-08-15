export default {
  port: 3001,
  db: {
    url: 'mongodb://localhost:27017',
  },
  session: {
    secretKey: 'ald^d)2kas^2%KJ2ja!3sjsd(d&^%djaHD',
    key: 'session', /** (string) cookie key (default is koa:sess) */
    maxAge: 86400000 * 31 * 6,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  },

  questionTags: ['html', 'css', 'node', 'db', 'performance'],
};
