'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
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
   *       "statusCode": 1,
   *       "msg": "添加博客成功"
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
   *       "statusCode": 1,
   *       "msg": "获取博客列表成功"
   *       "data": [
   *          {
   *              "tag": [
   *                 "java",
   *                 "test"
   *               ],
   *              "_id": "5c721a8325ec7509384d9deb",            // "博客id"
   *              "category": "java",
   *              "desc": "nothing",
   *              "image": "http://www.weidongwei.com/static/media/webPic.557c7012.jpg",
   *              "author": "xjx",
   *              "title": "test",
   *              "createdAt": "2019-02-24T04:16:03.781Z"
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
   *       "statusCode": 1,
   *       "msg": "获取博客列表成功"
   *       "data": [
   *          {
   *              "tag": [
   *                 "java",
   *                 "test"
   *               ],
   *              "_id": "5c721a8325ec7509384d9deb",
   *              "category": "java",
   *              "desc": "nothing",
   *              "image": "http://www.weidongwei.com/static/media/webPic.557c7012.jpg",
   *              "author": "xjx",
   *              "title": "test",
   *              "createdAt": "2019-02-24T04:16:03.781Z",
   *              "updatedAt": "2019-02-24T04:16:03.781Z",
   *              "content": "### this is a demo11111111111",            // "博客正文"
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
   *       "statusCode": 1,
   *       "msg": "编辑博客成功"
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
   *       "statusCode": 1,
   *       "msg": "获取分类文章数成功"
   *       "data": [
   *            {
                    "_id": "java2",             // "分类类型"
                    "count": 1                  // "对应文章数量"
                },
                {
                    "_id": "java",
                    "count": 1
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
   *       "statusCode": 1,
   *       "msg": "获取分类文章数成功"
   *       "data": [
   *            {
                    "_id": "test",              // "标签"
                    "count": 1                  // "对应文章数量"
                },
                {
                    "_id": "java",
                    "count": 1
                },
                {...}
   *        ]
   *     }
   *
   * @apiUse error
   */
  router.get('/blog-tags', controller.blog.getTags);

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
    *       "statusCode": "对应的错误码 见附录1"
    *       "msg": "错误信息"
    *     }
    */
  /**
    * @apiDefine pagination
    * @apiParam {Number} [offset] 分页 offset=20 size=10 就是第三页.
    * @apiParam {Number} [size] 每一页多少文章.
    */
};
