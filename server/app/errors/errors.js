'use strict';

const { BaseError } = require('./baseError');

const STATUS_CODE = {
  SUC: 1,
  UNEXPECT_ERROR: 1001,
  VALIDATE_ERROR: 3001,
  AUTH_ERROR: 3002,
  BAD_PARAMS_ERROR: 3003,
  NET_ERROR: 3004,
  DB_ERROR: 3004,
  FORBIDEN_ERROR: 3005,
  NOT_FOUND_ERROR: 3006,
  NOT_LOGIN_ERROR: 3007,
};
exports.ValidateError = msg => new BaseError(STATUS_CODE.VALIDATE_ERROR, msg || '校验失败');
exports.AuthError = msg => new BaseError(STATUS_CODE.AUTH_ERROR, msg || '登录鉴权失败');
exports.BadParamsError = msg => new BaseError(STATUS_CODE.BAD_PARAMS_ERROR, msg || '参数错误');
exports.NetError = msg => new BaseError(STATUS_CODE.NET_ERROR, msg || '网络错误');
exports.DbError = msg => new BaseError(STATUS_CODE.DB_ERROR, msg || '数据库操作错误');
exports.FBError = msg => new BaseError(STATUS_CODE.FORBIDEN_ERROR, msg || '不允许的操作');
exports.NotFoundError = msg => new BaseError(STATUS_CODE.NOT_FOUND_ERROR, msg || '没有找到');
exports.NotLoginError = msg => new BaseError(STATUS_CODE.NOT_LOGIN_ERROR, msg || '没有登录');

exports.STATUS_CODE = STATUS_CODE;

