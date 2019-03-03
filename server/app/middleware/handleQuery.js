'use strict';


module.exports = () => {
  return async function logg(ctx, next) {
    if (ctx.request.queries) {
      const _params = ctx.request.queries;
      const _p = {};
      for (const key in _params) {
        if (/\[/.test(key)) {
          _p[key.split('[')[0]] = _params[key];
        } else if (!_p[key]) {
          _p[key] = _params[key][0];
        }
      }
      const realIp = ctx.helper.getRealIp(ctx.req.headers['x-forwarded-for']) || ctx.ip;

      ctx.logger.info('*******realIp***********');
      ctx.logger.info('realIp:' + realIp);

      ctx.logger.info('*******queryMy***********');
      ctx.logger.info(_p);
      ctx.logger.info('*******header***********');
      ctx.logger.info(ctx.headers);
      ctx.logger.info('*******body***********');
      ctx.logger.info(ctx.request.body);
      ctx.request.queryMy = _p;
    }
    await next();
  };
};
