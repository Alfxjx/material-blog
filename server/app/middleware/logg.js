'use strict';

const { BaseError } = require('../errors/baseError');

module.exports = () => {
  return async function logg(ctx, next) {
    ctx.app.logger.info(ctx.request.method, ctx.request.url, ' is coming')
    await next()
  };
};
