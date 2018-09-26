import _ from 'lodash';
import Candidate from '../model/candidate.ts';

const attrs = ['email', 'firstName', 'lastName', 'description'];
const publicAttrs = ['_id', 'email', 'firstName', 'lastName', 'description', 'createdAt'];

export default {
  async get(ctx:any) {
    const candidate = await Candidate.findOne({_id: ctx.params.candidateId}).exec();
    if (candidate === null) {
      ctx.status = 404;
      return;
    }

    ctx.body = candidate;
  },

  async update(ctx:any) {
    const candidate = await Candidate.findOne({_id: ctx.params.candidateId}).exec();
    if (candidate === null) {
      ctx.status = 404;
      return;
    }

    Object.assign(candidate, _.pick(ctx.request.body, ['']));

    await candidate.save();
    ctx.body = _.pick(candidate.toObject(), []);
  },

  async delete(ctx:any) {
    const candidate = await Candidate.findOne({_id: ctx.params.candidateId}).exec();
    await candidate.remove();
    ctx.status = 200;
  },

  async create(ctx:any) {
    const candidate = new Candidate(_.pick(ctx.request.body, attrs));

    candidate.validate();

    await candidate.save();
    ctx.body = _.pick(candidate.toObject(), publicAttrs);
  },

  async list(ctx:any) {
    const candidates = await Candidate.find().limit(100).exec();

    ctx.body = candidates.map((candidate:any) => _.pick(candidate.toObject(), publicAttrs));
  }
};
