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
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": 1,\n  \"msg\": \"获取分类文章数成功\"\n  \"data\": [\n       {\n                \"_id\": \"java2\",             // \"分类类型\"\n                \"count\": 1                  // \"对应文章数量\"\n            },\n            {\n                \"_id\": \"java\",\n                \"count\": 1\n            },\n            {...}\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": \"对应的错误码 见附录1\"\n  \"msg\": \"错误信息\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": 1,\n  \"msg\": \"获取分类文章数成功\"\n  \"data\": [\n       {\n                \"_id\": \"test\",              // \"标签\"\n                \"count\": 1                  // \"对应文章数量\"\n            },\n            {\n                \"_id\": \"java\",\n                \"count\": 1\n            },\n            {...}\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": \"对应的错误码 见附录1\"\n  \"msg\": \"错误信息\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": 1,\n  \"msg\": \"获取博客列表成功\"\n  \"data\": [\n     {\n         \"tag\": [\n            \"java\",\n            \"test\"\n          ],\n         \"_id\": \"5c721a8325ec7509384d9deb\",\n         \"category\": \"java\",\n         \"desc\": \"nothing\",\n         \"image\": \"http://www.weidongwei.com/static/media/webPic.557c7012.jpg\",\n         \"author\": \"xjx\",\n         \"title\": \"test\",\n         \"createdAt\": \"2019-02-24T04:16:03.781Z\",\n         \"updatedAt\": \"2019-02-24T04:16:03.781Z\",\n         \"content\": \"### this is a demo11111111111\",            // \"博客正文\"\n     },\n     {...}\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": \"对应的错误码 见附录1\"\n  \"msg\": \"错误信息\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": 1,\n  \"msg\": \"获取博客列表成功\"\n  \"data\": [\n     {\n         \"tag\": [\n            \"java\",\n            \"test\"\n          ],\n         \"_id\": \"5c721a8325ec7509384d9deb\",            // \"博客id\"\n         \"category\": \"java\",\n         \"desc\": \"nothing\",\n         \"image\": \"http://www.weidongwei.com/static/media/webPic.557c7012.jpg\",\n         \"author\": \"xjx\",\n         \"title\": \"test\",\n         \"createdAt\": \"2019-02-24T04:16:03.781Z\"\n     },\n     {...}\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": \"对应的错误码 见附录1\"\n  \"msg\": \"错误信息\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": 1,\n  \"msg\": \"添加博客成功\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": \"对应的错误码 见附录1\"\n  \"msg\": \"错误信息\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/blog",
    "title": "blog-编辑博客",
    "name": "putBlog",
    "group": "Blog",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": 1,\n  \"msg\": \"编辑博客成功\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/router.js",
    "groupTitle": "Blog",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"statusCode\": \"对应的错误码 见附录1\"\n  \"msg\": \"错误信息\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
