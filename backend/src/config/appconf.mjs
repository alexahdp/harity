export default {
  port: 3001,
  db: {
    url: 'mongodb://localhost:27017/admin',
  },
  session: {
    secretKey: 'ald^d)2kas^2%KJ2ja!3sjsd(d&^%djaHD',
    key: 'session',
    maxAge: 86400000 * 31 * 6,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: true,
  },

  questionTags: ['html', 'css', 'node', 'db', 'performance'],
};
