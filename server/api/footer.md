### 附录1

返回码
```
const STATUS_CODE = {
  SUC: 1,                             // 成功
  UNEXPECT_ERROR: 1001,               // 未知错误
  VALIDATE_ERROR: 3001,               // 验证错误
  AUTH_ERROR: 3002,                   // 权限错误
  BAD_PARAMS_ERROR: 3003,             // 参数错误
  NET_ERROR: 3004,                    // 网络错误
  DB_ERROR: 3004,                     // 数据库错误
  FORBIDEN_ERROR: 3005,               // 不允许的操作
  NOT_FOUND_ERROR: 3006,              // 没有找到
  NOT_LOGIN_ERROR: 3007,              // 没有登录
};
```