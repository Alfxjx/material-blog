'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');
const error = require('../errors/errors');

class UserController extends Controller {
  // 注册
  async registry() {
    const { ctx } = this;
    const _params = ctx.request.body;
    ctx.helper.validate([
      { property: 'username', validateMethodes: [ _.isString, v => v.length > 6 && v.length < 20 ] },
      { property: 'password', validateMethodes: [ _.isString, v => /[0-9a-zA-Z_]{6,20}/.test(v) ] },
    ], ctx.request.body);
    let user = await ctx.model.User.findOne({ username: _params.username });
    if (_.isNil(user)) {
      user = new ctx.model.User();
      user.username = _params.username;
      user.pwd = _params.password;
      await user.save();
      ctx.body = {
        statusCode: error.STATUS_CODE.SUC,
        msg: '注册成功',
        data: {
          username: user.username,
          avatar: user.avatar,
          _id: user._id,
        },
      };
    } else {
      ctx.body = {
        statusCode: error.STATUS_CODE.FORBIDEN_ERROR,
        msg: '用户名已存在',
      };
    }
  }
}

module.exports = UserController;
