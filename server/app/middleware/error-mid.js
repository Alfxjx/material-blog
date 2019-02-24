'use strict';

const { BaseError } = require('../errors/baseError');

module.exports = () => {
  return async function gzip(ctx, next) {
    try {
      await next();
    } catch (e) {
      if (e instanceof BaseError) {
        ctx.status(200);
        ctx.body = {
          statusCode: e.statusCode,
          msg: e.msg,
        };
      }
    }
  };
};
