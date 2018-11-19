import mongoose from 'mongoose';
import conf from '../config/appconf';

mongoose.connect(conf.db.url, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Connect database error');
  console.log(err);
});
db.once('open', () => {
  console.log('Connect databse success');
});

export default db;
