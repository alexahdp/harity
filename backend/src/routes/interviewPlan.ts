import InterviewPlan from '../model/interviewPlan.ts';

export default {
  async create(ctx:any) {
    const interviewPlan = new InterviewPlan({
      userId: ctx.user._id,
      title: ctx.request.body.title,
      questions: ctx.request.body.questions,
    });

    await interviewPlan.save();
    ctx.body = interviewPlan;
  },

  async get(ctx:any) {
    const interviewPlan = await InterviewPlan.findOne({_id: ctx.params.interviewPlanId}).exec();
    if (interviewPlan === null) {
      ctx.status = 404;
      return;
    }

    ctx.body = interviewPlan;
  },

  async update(ctx:any) {
    const interviewPlan = await InterviewPlan.findOne({_id: ctx.params.interviewPlanId}).exec();
    if (interviewPlan === null) {
      ctx.status = 404;
      return;
    }

    interviewPlan.title = ctx.request.body.title;
    interviewPlan.questions = ctx.request.body.questions;
    interviewPlan.markModified('questions');
    await interviewPlan.save();
    ctx.body = interviewPlan;
  },

  async delete(ctx:any) {
    await InterviewPlan.remove({userId: ctx.user._id, _id: ctx.params.interviewPlanId}).exec();
    ctx.body = {success: true};
  },

  async list(ctx:any) {
    const interviewPlans = await InterviewPlan.find({userId: ctx.user._id}).exec();
    ctx.body = interviewPlans;
  }
};
