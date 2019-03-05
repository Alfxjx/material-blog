define({
  "name": "xjx_server_api",
  "version": "0.1.0",
  "description": "xjx_server_api",
  "title": "API",
  "url": "http://www.alfxjx.club/api-blog",
  "sampleUrl": "http://www.alfxjx.club/api-blog",
  "footer": {
    "title": "附录",
    "content": "<h3>附录1</h3>\n<p>返回码</p>\n<pre><code>const STATUS_CODE = {\n  SUC: 1,                             // 成功\n  UNEXPECT_ERROR: 1001,               // 未知错误\n  VALIDATE_ERROR: 3001,               // 验证错误\n  AUTH_ERROR: 3002,                   // 权限错误\n  BAD_PARAMS_ERROR: 3003,             // 参数错误\n  NET_ERROR: 3004,                    // 网络错误\n  DB_ERROR: 3004,                     // 数据库错误\n  FORBIDEN_ERROR: 3006,               // 非法的操作\n  NOT_FOUND_ERROR: 3007,              // 没有找到\n};\n</code></pre>\n"
  },
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2019-02-28T10:34:13.815Z",
    "url": "http://apidocjs.com",
    "version": "0.17.6"
  }
});
