'use strict';

const validator = require('validator');
const error = require('./errors/errors');
const _ = require('lodash');
const { URL } = require('url');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  console.log(app.config.cors);
  console.log(app.config.coreMiddlewares);
  router.get('/', controller.home.index);
  /**
   * @api {post} /blog blog-写博客
   * @apiName postBlog
   * @apiGroup Blog
   *
   * @apiUse blogPropertyR
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       'statusCode': 1,
   *       'msg': '添加博客成功'
   *     }
   *
   * @apiUse error
   */
  router.post('/blog', controller.blog.addBlog);
  /**
   * @api {get} /blog blog-博客列表
   * @apiName getBlogList
   * @apiGroup Blog
   *
   * @apiUse pagination
   * @apiParam {String} [category] 博客分类.
   * @apiParam {Array} [tag] 博客标签 字符串数组.
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       'statusCode': 1,
   *       'msg': '获取博客列表成功'
   *       'data': [
   *          {
   *              'tag': [
   *                 'java',
   *                 'test'
   *               ],
   *              '_id': '5c721a8325ec7509384d9deb',            // '博客id'
   *              'category': 'java',
   *              'desc': 'nothing',
   *              'image': 'http://www.weidongwei.com/static/media/webPic.557c7012.jpg',
   *              'author': 'xjx',
   *              'title': 'test',
   *              'blogInfo': { viewCount：'浏览量'，likes: '喜欢数' },
   *              'createdAt': '2019-02-24T04:16:03.781Z'
   *          },
   *          {...}
   *        ]
   *     }
   *
   * @apiUse error
   */
  router.get('/blog', controller.blog.getBlogs);
  /**
   * @api {get} /blog/:id blog-博客详情
   * @apiName getBlog
   * @apiGroup Blog
   *
   * @apiParam {String} id 博客id.
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       'statusCode': 1,
   *       'msg': '获取博客列表成功'
   *       'data': [
   *          {
   *              'tag': [
   *                 'java',
   *                 'test'
   *               ],
   *              '_id': '5c721a8325ec7509384d9deb',
   *              'category': 'java',
   *              'desc': 'nothing',
   *              'image': 'http://www.weidongwei.com/static/media/webPic.557c7012.jpg',
   *              'author': 'xjx',
   *              'title': 'test',
   *              'createdAt': '2019-02-24T04:16:03.781Z',
   *              'updatedAt': '2019-02-24T04:16:03.781Z',
   *              'content': '### this is a demo11111111111',            // '博客正文'
   *          },
   *          {...}
   *        ]
   *     }
   *
   * @apiUse error
   */
  router.get('/blog/:id', controller.blog.getBlog);
  /**
   * @api {put} /blog blog-编辑博客
   * @apiName putBlog
   * @apiGroup Blog
   *
   * @apiUse blogProperty
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       'statusCode': 1,
   *       'msg': '编辑博客成功'
   *     }
   *
   * @apiUse error
   */
  router.put('/blog/:id', controller.blog.updateBlog);
  /**
   * @api {get} /blog-category blog-博客分类
   * @apiName blog-category
   * @apiGroup Blog
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       'statusCode': 1,
   *       'msg': '获取分类文章数成功'
   *       'data': [
   *            {
                    '_id': 'java2',             // '分类类型'
                    'count': 1                  // '对应文章数量'
                },
                {
                    '_id': 'java',
                    'count': 1
                },
                {...}
   *        ]
   *     }
   *
   * @apiUse error
   */
  router.get('/blog-category', controller.blog.getCategory);
  /**
   * @api {get} /blog-tags blog-博客标签
   * @apiName blog-tags
   * @apiGroup Blog
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       'statusCode': 1,
   *       'msg': '获取分类文章数成功'
   *       'data': [
   *            {
                    '_id': 'test',              // '标签'
                    'count': 1                  // '对应文章数量'
                },
                {
                    '_id': 'java',
                    'count': 1
                },
                {...}
   *        ]
   *     }
   *
   * @apiUse error
   */
  router.get('/blog-tags', controller.blog.getTags);
  router.get('/form', controller.image.form);
  // x-csrf-token 头
  /**
   * @api {post} /upload-image image-上传图片
   * @apiName uploadimage
   * @apiGroup Image
   * @apiDescription 注意.
   * 使用axios上传图片 使用new FormData()对象
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       'statusCode': 1,
   *       'msg': '获取分类文章数成功'
   *       'data': 'http://www.alfxjx.club/image/tupian1.jpg' // 图片链接
   *      }
   * @apiUse error
   */
  router.post('/upload-image', controller.image.upload);

  const handle = (strategy, cookieName) => ctx => {
    const surl = ctx.cookies.get(cookieName);
    if (_.isEmpty(surl) || !validator.isURL(surl)) {
      throw error.BadParamsError('回调地址不是正确url');
    }
    app.logger.info('redirect to authCallback');
    app.logger.info(strategy);
    const url = new URL(surl);
    if (ctx.user.username) {
      url.searchParams.set('username', ctx.user.username);
    }
    if (ctx.user.openId) {
      url.searchParams.set('openId', ctx.user.openId);
    }
    if (ctx.user.avatar) {
      url.searchParams.set('avatar', ctx.user.avatar);
    }
    if (ctx.user._id) {
      url.searchParams.set('_id', ctx.user._id);
    }
    ctx.redirect(url.href);
  };
  // 鉴权成功后的回调页面
  router.get('/authCallback', handle('username namd pwd strategy', 'sucLoginUrl'));
  // 鉴权失败后的回调页面
  router.get('/authCallbackFail', handle('username namd pwd strategy', 'failLoginUrl'));
  // router.get('/auth/github/callback', handle('github strategy', 'sucLoginUrl'));


  /**
   * @api {post} /auth/local login-用户名密码登陆
   * @apiName unpLogin
   * @apiGroup Login
   * @apiDescription 注意.
   * 这里不使用xhr请求， 而是用form表单请求
   * @apiParam {String} username 用户名.
   * @apiParam {String} password 密码.
   * @apiSuccessExample Success-Response:
   *  默认：跳转到首页
   *  注意：登陆的时候可以在query参数里放sucLoginUrl failLoginUrl
   *  两个参数， 如果有，成功登陆后会跳转到sucLoginUrl链接。
   *  失败会到failLoginUrl链接, 方便用户回到之前的位置。
   *
   * 登陆后跳转的页面， 页面的url上会有
   * username  用户名
   * _id    用户名id
   * avatar 用户头像
   * 的query参数， 自己取出来使用以及保存
   */
  const _login = app.middleware.login();
  router.post('/login/local', _login, app.passport.authenticate('local', {
    successRedirect: 'http://www.alfxjx.club/api-blog/authCallback',
    failureRedirect: 'http://www.alfxjx.club/api-blog/authCallbackFail',
  }));
  /**
   * @api {post} /registry/local login-用户注册
   * @apiName unpRegistry
   * @apiGroup Login
   * @apiDescription 注意.
   * 使用xhr
   * @apiParam {String} username 用户名.
   * @apiParam {String} password 密码.
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       'statusCode': 1,
   *       'msg': '注册成功'
   *       'data': {username: 'wdw', avatar: 'http://ww..232.jpg', _id: '231d121w9s891w9719'}
   *      }
   * @apiUse error
   */
  router.post('/registry/local', app.controller.user.registry);
  /**
   * @api {get} /auth/github login-github登陆
   * @apiName githubLogin
   * @apiGroup Login
   * @apiDescription 注意.
   * 直接让用户点击这个链接即可
   * @apiSuccessExample Success-Response:
   *  默认：跳转到首页
   *  注意：登陆的时候可以在query参数里放sucLoginUrl failLoginUrl
   *  两个参数， 如果有，成功登陆后会跳转到sucLoginUrl链接。
   *  失败会到failLoginUrl链接, 方便用户回到之前的位置。
   *
   * 登陆后跳转的页面， 页面的url上会有
   * username  用户名
   * _id    用户名id
   * avatar 用户头像
   * 的query参数， 自己取出来使用以及保存
   */
  router.get('/auth/github', _login, app.passport.authenticate('github', {
    session: false,
  }));
  router.get('/auth/github/callback',
    app.passport.authenticate('github', {
      successRedirect: 'http://www.alfxjx.club/api-blog/authCallback',
      failureRedirect: 'http://www.alfxjx.club/api-blog/authCallbackFail',
    }));
  /**
   * @apiDefine blogProperty
   * @apiParam {String} [category] 博客分类.
   * @apiParam {Array} [tag] 博客标签 字符串数组.
   * @apiParam {String} [desc] 博客描述.
   * @apiParam {String} [image] 博客图片.
   * @apiParam {String} [author] 博客作者.
   * @apiParam {String} [title] 博客标题.
   * @apiParam {String} [content] 博客正文.
   */
  /**
   * @apiDefine blogPropertyR
   * @apiParam {String} category 博客分类.
   * @apiParam {Array} tag 博客标签 字符串数组.
   * @apiParam {String} desc 博客描述.
   * @apiParam {String} image 博客图片.
   * @apiParam {String} author 博客作者.
   * @apiParam {String} title 博客标题.
   * @apiParam {String} content 博客正文.
   */

  /**
    * @apiDefine error
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       'statusCode': '对应的错误码 见附录1'
    *       'msg': '错误信息'
    *     }
    */
  /**
    * @apiDefine pagination
    * @apiParam {Number} [offset] 分页 offset=20 size=10 就是第三页.
    * @apiParam {Number} [size] 每一页多少文章.
    */
};
