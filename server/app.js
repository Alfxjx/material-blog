'use strict';

const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const _ = require('lodash');

module.exports = app => {
  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, async (req, username, password, done) => {
    // format user
    const user = await app.model.User.findOne({ username, pwd: password });
    app.logger.info('doing LocalStrategy and user is nil:' + _.isNil(user));
    if (_.isNil(user)) {
      app.passport.doVerify(req, null, done);
    } else {
      console.log(req.method, req.url, user);
      app.passport.doVerify(req, user, done);
    }
  }));

  app.passport.use(new GitHubStrategy({
    passReqToCallback: true,
    clientID: '627654f8bb49e03c2b9b',
    clientSecret: '18a9f0f042087638271385d4e58c23c8da4c4529',
    // callbackURL: "http://localhost:7001/auth/github/callback"
    callbackURL: 'http://www.alfxjx.club/api-blog/auth/github/callback',
  },
  async (req, accessToken, refreshToken, profile, done) => {
    app.logger.info('doing GithubStrategy');
    app.logger.info(accessToken, refreshToken);
    app.logger.info(profile);
    let user = await app.model.User.findOne({ openId: profile.id });
    if (_.isNil(user)) {
      user = new app.model.User();
      user.openId = profile.id;
      user.avatar = profile.photos[0].value;
      user.username = profile.username;
      user.tpUserName = profile.username;
      user.accessToken = accessToken;
      await user.save();
    } else {
      user.avatar = profile.photos[0].value;
      user.tpUserName = profile.username;
      user.username = profile.username;
      user.accessToken = accessToken;
      await user.save();
    }
    app.passport.doVerify(req, user, done);
  }
  ));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {
    console.log('verify');
    console.log(user);
    return user;
  });
  app.passport.serializeUser(async (ctx, user) => {
    console.log('serializeUser');
    console.log(user);
    return { _id: user._id, openId: user.openId };
  });
  app.passport.deserializeUser(async (ctx, user) => {
    console.log('deserializeUser');
    console.log(user);
    const condition = {};
    if (user._id) {
      condition._id = user._id;
    } else if (user.openId) {
      condition.openId = user.openId;
    }
    const _user = await app.model.User.findOne(condition);
    return _user;
  });
};
