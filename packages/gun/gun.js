const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '.env') });

const axios = require('axios');
const { pino } = require('./logger');

const strapiUrl = process.env.STRAPI_URL;

function isEnvTrue(k) {
  if (typeof k !== 'string') {
    pino.error('bad env key type');
    process.exit(1);
  }
  return process.env[k] === 'true';
}

// Should always be successfull
async function getStrapiPosts() {
  try {
    await axios.get(`${strapiUrl}/api/posts`);
    pino.info('getStrapiPosts: completed');
  } catch (err) {
    pino.error('strapi request error:', err);
  }
}

// After first creation of Post {uid:'sunglight'}
// throws error: violation unique constraint
async function createStrapiPost() {
  try {
    await axios.post(`${strapiUrl}/api/posts`, {
      data: { uid: 'sunlight', title: 'Sunlight Exposure' },
    });
  } catch (err) {
    pino.error(`strapi request error: ${err.message}`);
  }
}

// Triggers Strapi error on each requests 😈
async function triggerStrapiError() {
  try {
    await axios.get(`${strapiUrl}/api/posts/err`);
  } catch (err) {
    pino.error(`strapi request error: ${err.message}`);
  }
}

(function() {
  if (isEnvTrue('STRAPI_FIRE')) {
    setInterval(getStrapiPosts, 500);
    setInterval(createStrapiPost, 1500);
    setInterval(triggerStrapiError, 1500);
  }
})();
