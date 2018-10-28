import _ from 'lodash';
import Candidate from '../model/candidate';

// атрибуты, которые приходят с клиента для сохранения в БД
const attrs = [
  'email',
  'sex',
  'firstName',
  'lastName',
  'description',
  'skills',
];

// атрибуты, которые уходят на клиент из БД
const publicAttrs = [
  '_id',
  'sex',
  'contacts',
  'firstName',
  'lastName',
  'description',
  'createdAt',
  'skills',
  'level',
];

export default {
  async get(ctx) {
    const candidate = await Candidate.findOne({ _id: ctx.params.candidateId }).exec();
    if (candidate === null) {
      ctx.status = 404;
      return;
    }

    ctx.body = candidate;
  },

  async update(ctx) {
    const candidate = await Candidate.findOne({ _id: ctx.params.candidateId }).exec();
    if (candidate === null) {
      ctx.status = 404;
      return;
    }

    Object.assign(candidate, _.pick(ctx.request.body, ['']));

    await candidate.save();
    ctx.body = _.pick(candidate.toObject(), []);
  },

  async delete(ctx) {
    const candidate = await Candidate.findOne({ _id: ctx.params.candidateId }).exec();
    await candidate.remove();
    ctx.status = 200;
  },

  async create(ctx) {
    const candidate = new Candidate(_.pick(ctx.request.body, attrs));

    try {
      await candidate.validate();
    } catch(err) {
      if (err.name === 'ValidationError') {
        ctx.status = 422;
        return ctx.body = {
          message: 'Validation error',
          error: err.message,
        };
      } else {
        throw err;
      }
    }

    await candidate.save();
    ctx.body = _.pick(candidate.toObject(), publicAttrs);
  },

  async list(ctx) {
    const candidates = await Candidate.find().limit(100).exec();

    ctx.body = candidates.map(candidate => _.pick(candidate.toObject(), publicAttrs));
  },

  // async uploadCV(ctx) {
  // },
};
