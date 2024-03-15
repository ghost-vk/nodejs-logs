'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async err(ctx) {
    try {
      // Will throw error
      JSON.parse('{');
    } catch (error) {
      strapi.log.error('internal log msg:', error);
      ctx.response.status = 500;
      ctx.response.body = { msg: 'internal error', error: error };
    }
  }
}));
