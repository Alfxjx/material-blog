'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');
const error = require('../errors/errors');
const { COUNT_TYPE } = require('../lib/constant');

class CommentController extends Controller {
  // 获取评论
  async getComments() {
    const { ctx } = this;
    ctx.helper.validate([
      { property: 'id', validateMethodes: [ _.isString ] },
    ], ctx.params);
    const _comments = await ctx.model.Comment.find({ blogId: ctx.params.id })
      .sort({ createdAt: 1 });
    const _ids = _comments.map(comment => {
      return comment.userId;
    });
    const _users = await ctx.model.User.find({
      _id: { $in: _ids },
    }, '_id avatar');
    let tmp;
    const _coms = _comments.reduce((res, comment) => {
      tmp = comment.toJSON();
      delete tmp.blogId;
      if (tmp.parentId === '') {
        res.push({ ...tmp, children: [] });
      } else {
        res.find(parent => {
          return parent._id === tmp.parentId;
        }).children.push(tmp);
      }
      const _user = _users.find(user => {
        return user.toJSON()._id === tmp.userId;
      });
      tmp.avatar = _user.avatar;
      delete tmp.parentId;
      return res;
    }, []);

    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: '获取评论成功',
      data: _coms,
    };
  }
  // 添加评论
  async postComment() {
    const { ctx } = this;
    ctx.helper.validate([
      { property: 'blogId', validateMethodes: [ _.isString ] },
      { property: 'parentId', validateMethodes: [ _.isString ] },
      { property: 'content', validateMethodes: [ _.isString ] },
    ], ctx.request.body);
    const [ _b, _c ] = await Promise.all([
      ctx.model.Blog.findOne({ _id: ctx.request.body.blogId }),
      ctx.model.Comment.findOne({ _id: ctx.request.body.parentId }),
    ]);
    if (_.isNil(_b) || _.isNil(_c)) {
      throw error.NotFoundError('指定博客或者评论不存在');
    }
    await ctx.model.Comment.create({
      userId: ctx.user._id,
      blogId: ctx.request.body.blogId,
      parentId: ctx.request.body.parentId,
      content: ctx.helper.htmlEncodeByRegExp(ctx.request.body.content),
    });

    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: '添加评论成功',
    };
  }
  // 点赞 评论
  async likeComment() {
    const { ctx } = this;
    const realIp = ctx.helper.getRealIp(ctx.req.headers['x-forwarded-for']) || ctx.ip;
    ctx.helper.validate([
      { property: 'id', validateMethodes: [ _.isString ] },
    ], ctx.params);
    const row = await ctx.model.Comment.findOne({
      _id: ctx.params.id,
    });
    if (_.isNil(row)) {
      throw error.NotFoundError('没有此评论');
    }
    const count = await ctx.model.Count.findOne({
      ip: realIp,
      type: COUNT_TYPE.COMMENT_LIKE,
      commentId: ctx.params.id,
    });
    // 没有就增加
    if (_.isNil(count)) {
      row.likes += 1;
      await Promise.all(
        [
          ctx.model.Count.create({
            ip: realIp,
            type: COUNT_TYPE.COMMENT_LIKE,
            commentId: ctx.params.id,
          }),
          row.save(),
        ]
      );
    }
    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: '喜欢评论成功',
    };
  }
}

module.exports = CommentController;
