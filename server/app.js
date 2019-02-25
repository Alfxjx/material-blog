'use strict';

const LocalStrategy = require('passport-local').Strategy;
const _ = require('lodash');

module.exports = app => {
  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, async (req, username, password, done) => {
    // format user
    const user = await app.model.User.findOne({ username, pwd: password });
    if (_.isNil(user)) {
      app.passport.doVerify(req, null, done);
    } else {
      console.log(req.method, req.url, user);
      app.passport.doVerify(req, user, done);
    }
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {
    console.log('verify');
    console.log(user);
    return user;
  });
  app.passport.serializeUser(async (ctx, user) => {
    console.log('serializeUser');
    console.log(user);
    return { _id: user._id };
  });
  app.passport.deserializeUser(async (ctx, user) => {
    console.log('deserializeUser');
    console.log(user);
    const _user = await app.model.User.findOne({ _id: user._id });
    return _user;
  });
};
