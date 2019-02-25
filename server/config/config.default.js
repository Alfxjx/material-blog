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
  config.middleware = [ 'logg' ];
  config.logg = {};
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
  /*  config.passportGithub = {
    key: '627654f8bb49e03c2b9b',
    secret: '18a9f0f042087638271385d4e58c23c8da4c4529',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  }; */
  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    domainWhiteList: [ '.github.com', '.alfxjx.club' ],
  };
  /*   config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }; */
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
      } else if (err.name === 'AuthenticationError') {
        ctx.body = ctx.body = JSON.stringify({
          statusCode: errors.STATUS_CODE.AUTH_ERROR,
          msg: err.message || err.name,
        });
      } else {
        ctx.body = ctx.body = JSON.stringify({
          statusCode: err.code || errors.STATUS_CODE.UNEXPECT_ERROR,
          msg: err.errmsg || err.msg || err.message || err.name,
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
      } else if (err.name === 'AuthenticationError') {
        ctx.body = {
          statusCode: errors.STATUS_CODE.AUTH_ERROR,
          msg: err.message || err.name,
        };
      } else {
        ctx.logger.info(err);
        ctx.body = {
          statusCode: err.code || errors.STATUS_CODE.UNEXPECT_ERROR,
          msg: err.errmsg || err.msg || err.message || err.name,
        };
      }
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
