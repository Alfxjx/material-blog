/* eslint valid-jsdoc: "off" */

'use strict';

const { BaseError } = require('../app/errors/baseError');
const errors = require('../app/errors/errors');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_0619xjx';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/xjx_blog',
        options: {},
      },
    },
  };
  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };
  config.onerror = {
    all(err, ctx) {
      // json hander
      ctx.status = 200;
      ctx.response.set('Content-Type', 'application/json');
      if (err instanceof BaseError) {
        ctx.body = JSON.stringify({
          statusCode: err.statusCode,
          msg: err.msg,
        });
      } else if (err.name === 'MongoError') {
        ctx.body = JSON.stringify({
          statusCode: errors.STATUS_CODE.DB_ERROR,
          msg: err.errmsg,
        });
      } else {
        ctx.body = JSON.stringify({
          statusCode: err.code || errors.STATUS_CODE.UNEXPECT_ERROR,
          msg: err.errmsg || err.msg || err.name,
        });
      }
    },
    json(err, ctx) {
      // json hander
      ctx.status = 200;
      if (err instanceof BaseError) {
        ctx.body = {
          statusCode: err.statusCode,
          msg: err.msg,
        };
      } else if (err.name === 'MongoError') {
        ctx.body = {
          statusCode: errors.STATUS_CODE.DB_ERROR,
          msg: err.errmsg,
        };
      } else {
        ctx.body = {
          statusCode: err.code || errors.STATUS_CODE.UNEXPECT_ERROR,
          msg: err.errmsg || err.msg || err.name,
        };
      }
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
