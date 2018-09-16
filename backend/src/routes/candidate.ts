import _ from 'lodash';
import Candidates from '../model/candidates';

export default {
  async get(ctx:any) {
    const candidate = await Candidates.findOne({email: ctx.params.candidateId}).exec();
    if (candidate === null) {
      ctx.status = 404;
      return;
    }

    ctx.body = candidate;
  },

  async update(ctx:any) {
    const candidate = await Candidates.findOne({email: ctx.params.candidateId}).exec();
    if (candidate === null) {
      ctx.status = 404;
      return;
    }

    Object.assign(candidate, _.pick(ctx.request.body, ['']));

    await candidate.save();
    ctx.body = _.pick(candidate.toObject(), []);
  },

  async delete(ctx:any) {

  },

  async create(ctx:any) {
    const canidate = new Candidate(_.pick(ctx.request.body), []);

    candidate.validate();

    await candidate.save();
    ctx.body = _.pick(candidate.toObject());
  },
};
