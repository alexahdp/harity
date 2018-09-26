import User from '../model/user';

export default {

  test(ctx) {
    ctx.response.status = 200;
    ctx.body = { msg: 'Success' };
  },

  async authBridge(ctx, next) {
    if (ctx.session.userId) {
      const user = await User.findOne({ _id: ctx.session.userId }).exec();
      if (user !== null) {
        ctx.user = user;
        await next();
        return;
      }
    }

    ctx.status = 403;
    ctx.body = 'Access denied';
  },

  async signIn(ctx) {
    const user = await User.findOne({ email: ctx.request.body.email }).exec();
    if (user === null) {
      ctx.status = 404;
      ctx.body = { success: false };
      return;
    }

    ctx.session.userId = user._id.toString();
    ctx.body = { success: true };
  },

  async signUp(ctx) {
    if (!ctx.request.body) {
      ctx.status = 403;
      ctx.body = { success: false };
      return;
    }

    const user = new User({
      email: ctx.request.body.email,
      password: ctx.request.body.password,
    });

    await user.save();

    ctx.body = { success: true };
  },
};
