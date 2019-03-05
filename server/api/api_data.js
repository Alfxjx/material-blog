define({ "api": [
  {
    "type": "get",
    "url": "/blog-category",
    "title": "blog-博客分类",
    "name": "blog_category",
    "group": "Blog",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': 1,\n  'msg': '获取分类文章数成功'\n  'data': [\n       {\n                '_id': 'java2',             // '分类类型'\n                'count': 1                  // '对应文章数量'\n            },\n            {\n                '_id': 'java',\n                'count': 1\n            },\n            {...}\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
    "sampleRequest": [
      {
        "url": "http://www.alfxjx.club/api-blog/blog-category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': '对应的错误码 见附录1'\n  'msg': '错误信息'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/blog-tags",
    "title": "blog-博客标签",
    "name": "blog_tags",
    "group": "Blog",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': 1,\n  'msg': '获取分类文章数成功'\n  'data': [\n       {\n                '_id': 'test',              // '标签'\n                'count': 1                  // '对应文章数量'\n            },\n            {\n                '_id': 'java',\n                'count': 1\n            },\n            {...}\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
    "sampleRequest": [
      {
        "url": "http://www.alfxjx.club/api-blog/blog-tags"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': '对应的错误码 见附录1'\n  'msg': '错误信息'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/blog/:id",
    "title": "blog-博客详情",
    "name": "getBlog",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>博客id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': 1,\n  'msg': '获取博客列表成功'\n  'data': [\n     {\n         'tag': [\n            'java',\n            'test'\n          ],\n         '_id': '5c721a8325ec7509384d9deb',\n         'category': 'java',\n         'desc': 'nothing',\n         'image': 'http://www.weidongwei.com/static/media/webPic.557c7012.jpg',\n         'author': 'xjx',\n         'title': 'test',\n         'createdAt': '2019-02-24T04:16:03.781Z',\n         'updatedAt': '2019-02-24T04:16:03.781Z',\n         'content': '### this is a demo11111111111',            // '博客正文'\n     },\n     {...}\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
    "sampleRequest": [
      {
        "url": "http://www.alfxjx.club/api-blog/blog/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': '对应的错误码 见附录1'\n  'msg': '错误信息'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/blog",
    "title": "blog-博客列表",
    "name": "getBlogList",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>博客分类.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "tag",
            "description": "<p>博客标签 字符串数组.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "offset",
            "description": "<p>分页 offset=20 size=10 就是第三页.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "size",
            "description": "<p>每一页多少文章.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': 1,\n  'msg': '获取博客列表成功'\n  'data': [\n     {\n         'tag': [\n            'java',\n            'test'\n          ],\n         '_id': '5c721a8325ec7509384d9deb',            // '博客id'\n         'category': 'java',\n         'desc': 'nothing',\n         'image': 'http://www.weidongwei.com/static/media/webPic.557c7012.jpg',\n         'author': 'xjx',\n         'title': 'test',\n         'blogInfo': { viewCount：'浏览量'，likes: '喜欢数' },\n         'createdAt': '2019-02-24T04:16:03.781Z'\n     },\n     {...}\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
    "sampleRequest": [
      {
        "url": "http://www.alfxjx.club/api-blog/blog"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': '对应的错误码 见附录1'\n  'msg': '错误信息'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/blog",
    "title": "blog-写博客",
    "name": "postBlog",
    "group": "Blog",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': 1,\n  'msg': '添加博客成功'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
    "sampleRequest": [
      {
        "url": "http://www.alfxjx.club/api-blog/blog"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>博客分类.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "tag",
            "description": "<p>博客标签 字符串数组.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>博客描述.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>博客图片.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>博客作者.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>博客标题.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>博客正文.</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': '对应的错误码 见附录1'\n  'msg': '错误信息'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/blog/:id",
    "title": "blog-编辑博客",
    "name": "putBlog",
    "group": "Blog",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': 1,\n  'msg': '编辑博客成功'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
    "sampleRequest": [
      {
        "url": "http://www.alfxjx.club/api-blog/blog/:id"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>博客分类.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "tag",
            "description": "<p>博客标签 字符串数组.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>博客描述.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "image",
            "description": "<p>博客图片.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "author",
            "description": "<p>博客作者.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>博客标题.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "content",
            "description": "<p>博客正文.</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': '对应的错误码 见附录1'\n  'msg': '错误信息'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/upload-image",
    "title": "image-上传图片",
    "name": "uploadimage",
    "group": "Image",
    "description": "<p>注意. 使用axios上传图片 使用new FormData()对象</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': 1,\n  'msg': '获取分类文章数成功'\n  'data': 'http://www.alfxjx.club/image/tupian1.jpg' // 图片链接\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Image",
    "sampleRequest": [
      {
        "url": "http://www.alfxjx.club/api-blog/upload-image"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': '对应的错误码 见附录1'\n  'msg': '错误信息'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/auth/github",
    "title": "login-github登陆",
    "name": "githubLogin",
    "group": "Login",
    "description": "<p>注意. 直接让用户点击这个链接即可</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " 默认：跳转到首页\n 注意：登陆的时候可以在query参数里放sucLoginUrl failLoginUrl\n 两个参数， 如果有，成功登陆后会跳转到sucLoginUrl链接。\n 失败会到failLoginUrl链接, 方便用户回到之前的位置。\n\n登陆后跳转的页面， 页面的url上会有\nusername  用户名\n_id    用户名id\navatar 用户头像\n的query参数， 自己取出来使用以及保存",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Login",
    "sampleRequest": [
      {
        "url": "http://www.alfxjx.club/api-blog/auth/github"
      }
    ]
  },
  {
    "type": "post",
    "url": "/auth/local",
    "title": "login-用户名密码登陆",
    "name": "unpLogin",
    "group": "Login",
    "description": "<p>注意. 改用xhr请求</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': 1,\n  'msg': '登录成功'\n  'data': {username: 'wdw', avatar: 'http://ww..232.jpg', _id: '231d121w9s891w9719'}\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Login",
    "sampleRequest": [
      {
        "url": "http://www.alfxjx.club/api-blog/auth/local"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': '对应的错误码 见附录1'\n  'msg': '错误信息'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/registry/local",
    "title": "login-用户注册",
    "name": "unpRegistry",
    "group": "Login",
    "description": "<p>注意. 使用xhr</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': 1,\n  'msg': '注册成功'\n  'data': {username: 'wdw', avatar: 'http://ww..232.jpg', _id: '231d121w9s891w9719'}\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Login",
    "sampleRequest": [
      {
        "url": "http://www.alfxjx.club/api-blog/registry/local"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  'statusCode': '对应的错误码 见附录1'\n  'msg': '错误信息'\n}",
          "type": "json"
        }
      ]
    }
  }
] });
