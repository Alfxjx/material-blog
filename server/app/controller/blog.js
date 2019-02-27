'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');
const _ = require('lodash');
const error = require('../errors/errors');
const { COUNT_TYPE } = require('../lib/constant');

class BlogController extends Controller {
  /**
   * 添加博客
   */
  async addBlog() {
    const { ctx } = this;
    console.log(ctx.user);
    if (!ctx.user || !ctx.isAuthenticated() || (ctx.user.username !== 'Alfxjx' && ctx.user.username !== 'ape-casear')) {
      throw error.AuthError('无权限');
    }
    const _blog = new ctx.model.Blog();
    const _blogDTO = {
      category: ctx.request.body.category,
      tag: ctx.request.body.tag,
      desc: ctx.request.body.desc,
      image: ctx.request.body.image,
      author: ctx.request.body.author,
      title: ctx.request.body.title,
      content: ctx.request.body.content,
    };
    ctx.helper.validate([
      { property: 'category', validateMethodes: [ _.isString ] },
      { property: 'tag', validateMethodes: [ _.isArray ] },
      { property: 'desc', validateMethodes: [ v => !_.isEmpty(v) ] },
      { property: 'image', validateMethodes: [ validator.isURL ] },
      { property: 'author', validateMethodes: [ v => !_.isEmpty(v) ] },
      { property: 'title', validateMethodes: [ v => !_.isEmpty(v) ] },
      { property: 'content', validateMethodes: [ v => !_.isEmpty(v) ] },
    ], _blogDTO);
    _.assign(_blog, _blogDTO);
    _blog.id = ctx.helper.getRandomId();
    await _blog.save();
    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: '添加博客成功',
    };
  }
  /**
   * 获取博客列表
   */
  async getBlogs() {
    const { ctx } = this;
    const _res = ctx.helper.handleQuery(ctx.request.query);
    const realIp = ctx.req.headers['x-forwarded-for'] || ctx.ip;
    const count = await ctx.model.Count.findOne({
      ip: realIp,
      type: COUNT_TYPE.HOME,
    });
    if (_.isNil(count)) {
      await Promise.all(
        [
          ctx.model.Count.create({
            ip: realIp,
            type: COUNT_TYPE.HOME,
          }),
        ]
      );
    }
    const row = await ctx.model.Blog.find({
      ..._res.where,
    }, 'category tag desc image author createdAt title blogInfo').skip(_res.pagination.offset).limit(_res.pagination.size);
    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: '获取博客列表成功',
      data: row,
    };
  }
  /**
   * 获取指定博客
   */
  async getBlog() {
    const { ctx } = this;
    const realIp = ctx.req.headers['x-forwarded-for'] || ctx.ip;
    ctx.helper.validate([
      { property: 'id', validateMethodes: [ _.isString ] },
    ], ctx.params);
    const row = await ctx.model.Blog.findOne({
      _id: ctx.params.id,
    });
    if (_.isNil(row)) {
      throw error.NotFoundError('没有此博客');
    }
    // 加入浏览轨迹
    if (ctx.user) {
      if (!ctx.user.viewTrack.find(view => {
        return view.blogId === ctx.params.id;
      })) {
        ctx.user.viewTrack.push({
          blogId: ctx.params.id,
          createdAt: new Date(),
        });
        await ctx.user.save();
      }
    }
    const count = await ctx.model.Count.findOne({
      ip: realIp,
      type: COUNT_TYPE.BLOG_VIEW,
      blogId: ctx.params.id,
    });
    // 没有就增加浏览量
    if (_.isNil(count)) {
      row.blogInfo.viewCount += 1;
      await Promise.all(
        [
          ctx.model.Count.create({
            ip: realIp,
            type: COUNT_TYPE.BLOG_VIEW,
            blogId: ctx.params.id,
          }),
          row.save(),
        ]
      );
    }
    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: '获取博客成功',
      data: row,
    };
  }
  /**
   * 编辑博客
   */
  async updateBlog() {
    const { ctx } = this;
    ctx.helper.validate([
      { property: 'id', validateMethodes: [ _.isString ] },
    ], ctx.params);
    ctx.helper.validate([
      { property: 'category', validateMethodes: [ _.isString ], optional: true },
      { property: 'tag', validateMethodes: [ _.isArray ], optional: true },
      { property: 'desc', validateMethodes: [ v => !_.isEmpty(v) ], optional: true },
      { property: 'title', validateMethodes: [ v => !_.isEmpty(v) ], optional: true },
      { property: 'content', validateMethodes: [ v => !_.isEmpty(v) ], optional: true },
    ], ctx.request.body);

    await ctx.model.Blog.update({
      _id: ctx.params.id,
    }, ctx.request.body);
    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: '编辑博客成功',
    };
  }
  /**
   * 获取分类博客
   */
  async getCategory() {
    const { ctx } = this;

    const _rows = await ctx.model.Blog.aggregate([
      {
        $group: { _id: '$category', count: { $sum: 1 } },
      },
    ]);
    // const _rows = await ctx.model.Blog.group({ _id: '$category' });
    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: '获取分类文章数成功',
      data: _rows,
    };
  }
  /**
   * 获取标签博客
   */
  async getTags() {
    const { ctx } = this;

    const _rows = await ctx.model.Blog.aggregate([
      {
        $unwind: '$tag',
      },
      {
        $group: { _id: '$tag', count: { $sum: 1 } },
      },
    ]);
    // const _rows = await ctx.model.Blog.group({ _id: '$category' });
    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: '获取标签文章数成功',
      data: _rows,
    };
  }
  /**
   * 博客获得喜欢
   */
  async likeBlog() {
    const { ctx } = this;
    ctx.helper.validate([
      { property: 'id', validateMethodes: [ _.isString ] },
    ], ctx.params);
    // const _rows = await ctx.model.Blog.group({ _id: '$category' });
    const row = await ctx.model.Blog.findOne({
      _id: ctx.params.id,
    });
    if (_.isNil(row)) {
      throw error.NotFoundError('没有此博客');
    }
    const realIp = ctx.req.headers['x-forwarded-for'] || ctx.ip;
    const count = await ctx.model.Count.findOne({
      ip: realIp,
      type: COUNT_TYPE.BLOG_LIKE,
      blogId: ctx.params.id,
    });
    if (_.isNil(count)) {
      await ctx.model.Count.create({
        ip: realIp,
        type: COUNT_TYPE.BLOG_LIKE,
        blogId: ctx.params.id,
      });
      if (ctx.user) {
        ctx.user.likesTrack.push({
          blogId: ctx.params.id,
          createdAt: new Date(),
        });
        await ctx.user.save();
      }
      row.blogInfo.likes += 1;
      await row.save();
      ctx.body = {
        statusCode: error.STATUS_CODE.SUC,
        msg: '喜欢博客成功',
      };
    } else {
      ctx.body = {
        statusCode: error.STATUS_CODE.SUC,
        msg: '已经喜欢过了',
      };
    }
  }
}

module.exports = BlogController;
