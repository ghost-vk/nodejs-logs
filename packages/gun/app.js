const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '.env') });

const axios = require('axios');
const { pino } = require('./logger');

const strapiUrl = process.env.STRAPI_URL;
const nestUrl = process.env.NEST_URL;

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
    pino.info('[strapi] GET /api/posts: request completed');
  } catch (err) {
    pino.error('[strapi] GET /api/posts: request error:', err);
  }
}

// After first creation of Post {uid:'sunglight'}
// throws error: violation unique constraint
async function createStrapiPost() {
  try {
    await axios.post(`${strapiUrl}/api/posts`, {
      data: { uid: 'sunlight', title: 'Sunlight Exposure' },
    });
    pino.info('[strapi] POST /api/posts: request completed');
  } catch (err) {
    pino.error(`[strapi] POST /api/posts: request error: ${err.message}`);
  }
}

// Triggers Strapi error on each requests 😈
async function triggerStrapiError() {
  try {
    await axios.get(`${strapiUrl}/api/posts/err`);
  } catch (err) {
    pino.error(`[strapi] GET /api/posts/err: request error: ${err.message}`);
  }
}

// Should always be successfull
async function requestNestHello() {
  try {
    await axios.get(`${nestUrl}/`);
    pino.info('[nest] GET /: completed');
  } catch (err) {
    pino.error(`[nest] GET /: request error: ${err.message}`);
  }
}

// Should always returns 400
async function requestNestError() {
  try {
    await axios.get(`${nestUrl}/error`);
  } catch (err) {
    pino.error(`[nest] GET /error: request error: ${err.message}`);
  }
}

// Triggers Nest error on each requests 😈
async function triggerNestError() {
  try {
    await axios.post(`${nestUrl}/triggerError`);
  } catch (err) {
    pino.error(`[nest] POST /triggerError request error: ${err.message}`);
  }
}

(function () {
  if (isEnvTrue('STRAPI_FIRE')) {
    setInterval(getStrapiPosts, 1500);
    setInterval(createStrapiPost, 1500);
    setInterval(triggerStrapiError, 1500);
  }

  if (isEnvTrue('NEST_FIRE')) {
    setInterval(requestNestHello, 1500);
    setInterval(triggerNestError, 1500);
    setInterval(requestNestError, 1500);
  }
})();
