import Question from '../model/question.ts';

export default {
  async create(ctx:any) {
    const question = new Question({
      text: ctx.request.body.text,
      labels: ctx.request.body.labels,
      complexity: ctx.request.body.complexity,
    });

    question.validate();

    await question.save();
    ctx.body = question;
  },

  async read(ctx:any) {
    const question = await Question.findOne({_id: ctx.params.questionId}).exec();
    if (question === null) {
      ctx.status = 404;
      return ctx.body = {success: false};
    }

    ctx.body = question;
  },

  async update(ctx:any) {
    const question = await Question.findOne({_id: ctx.params.questionId}).exec();
    if (question === null) {
      ctx.status = 404;
      return ctx.body = {success: false};
    }

    // TODO maybe it is possible to do it in some better way
    question.text = ctx.request.body.text;
    question.labels = ctx.request.body.labels;
    question.complexity = ctx.request.body.complexity;

    await question.save();
    ctx.body = question;
  },

  async remove(ctx:any) {
    const question = await Question.findOne({_id: ctx.params.questionId}).exec();
    if (question === null) {
      ctx.status = 404;
      return ctx.body = {success: false};
    }

    await question.remove();
    ctx.body = {success: true};
  },

  async list(ctx:any) {
    const questions = await Question.find().exec();
    ctx.body = questions;
  },

  async tagList(ctx:any) {
    ctx.body = Question.getTagList();
  },
};
