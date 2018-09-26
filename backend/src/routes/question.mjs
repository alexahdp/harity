import Question from '../model/question';

export default {
  async create(ctx) {
    const question = new Question({
      text: ctx.request.body.text,
      labels: ctx.request.body.labels,
      complexity: ctx.request.body.complexity,
    });

    question.validate();

    await question.save();
    ctx.body = question;
  },

  async read(ctx) {
    const question = await Question.findOne({ _id: ctx.params.questionId }).exec();
    if (question === null) {
      ctx.status = 404;
      ctx.body = { success: false };
      return;
    }

    ctx.body = question;
  },

  async update(ctx) {
    const question = await Question.findOne({ _id: ctx.params.questionId }).exec();
    if (question === null) {
      ctx.status = 404;
      ctx.body = { success: false };
      return;
    }

    // TODO maybe it is possible to do it in some better way
    question.text = ctx.request.body.text;
    question.labels = ctx.request.body.labels;
    question.complexity = ctx.request.body.complexity;

    await question.save();
    ctx.body = question;
  },

  async remove(ctx) {
    const question = await Question.findOne({ _id: ctx.params.questionId }).exec();
    if (question === null) {
      ctx.status = 404;
      ctx.body = { success: false };
      return;
    }

    await question.remove();
    ctx.body = { success: true };
  },

  async list(ctx) {
    const questions = await Question.find().exec();
    ctx.body = questions;
  },

  async tagList(ctx) {
    ctx.body = Question.getTagList();
  },
};
