'use strict';

// const validator = require('validator');
const _ = require('lodash');
const crypto = require('crypto');
const error = require('../errors/errors');
/**
 * 校验前端输入
 * @param {Boolean} validateList 校验列表
 * @param {Boolean} baseDTO 校验对象
 * @return {void}  失败就报错
 */
exports.validate = function(validateList, baseDTO) {
  if (!validateList || validateList.length < 1) {
    // throw new Error('validate error: 输入错误');
    throw error.BadParamsError('validate error: 输入错误');
  }
  validateList.forEach(item => {
    if (item.optional && _.isNil(baseDTO[item.property])) {
      // let it go
    } else {
      item.validateMethodes.forEach(method => {
        if (!method(baseDTO[item.property])) {
          // throw new Error('validate error: 校验失败！property is ' + item.property);
          throw error.BadParamsError('validate error: 校验失败！property is ' + item.property);
        }
      });
    }
  });
};

/**
 * 获取随机id
 * @param {Boolean} strOrNumber 是否字符串
 * @return {Boolean | String}  id
 */
exports.getRandomId = function(strOrNumber) {
  if (strOrNumber) {
    return Date.now() + Math.random().toString().slice(2, 6);
  }
  return +(Date.now() + Math.random().toString().slice(2, 6));
};

/**
 * 处理前端传递对象
 * @param {Boolean} queryDTO 前端DTO
 * @return {Object}  mongo请求参数
 */
exports.handleQuery = function(queryDTO) {
  const sqlArgs = {
    pagination: {},
    where: {},
  };
  if (!queryDTO.offset) {
    queryDTO.offset = 0;
  }
  if (!queryDTO.size) {
    queryDTO.size = 10;
  }
  if (queryDTO.category) {
    exports.validate([
      { property: 'category', validateMethodes: [ _.isString ] },
    ], queryDTO);
    sqlArgs.where.category = +queryDTO.category;
  }
  if (queryDTO.tag) {
    exports.validate([
      { property: 'tag', validateMethodes: [ _.isArray ] },
    ], queryDTO);
    sqlArgs.where.tag = { $all: queryDTO.tag };
  }
  sqlArgs.pagination.offset = +queryDTO.offset;
  sqlArgs.pagination.size = +queryDTO.size;

  return sqlArgs;
};

/**
 * 获取处理后密码
 * @param {String} prePWD 手动密码
 * @return {String}  加密密码
 */
exports.getPwd = function(prePWD) {
  return crypto.createHmac('SHA1', 'xjx').update(prePWD).digest('hex');
};

