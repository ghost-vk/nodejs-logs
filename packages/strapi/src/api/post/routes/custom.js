'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/posts/err',
      handler: 'post.err',
      config: { auth: false }
    }
  ]
};
