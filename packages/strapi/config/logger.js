const { winston } = require('@strapi/logger');

function isEnvTruthy(k) {
  if (typeof k !== 'string') throw new Error('bad key');
  return !![true, 'true', 'y', 'Y', 'yes', '1', 1].includes(process.env[k]);
}

const logLevel = process.env.LOG_LEVEL ?? 'info';
const isDev = process.env.NODE_ENV !== 'production';
const isPrd = !isDev;
const logJson = process.env.LOG_JSON ? isEnvTruthy('LOG_JSON') : isPrd;

/**
 * @param {string} msg - Message in format "GET /assets/images/logo_login.png (6 ms) 200"
 * @example
 * var p = parseHttpMsg("GET /assets/images/logo_login.png (6 ms) 200")
 * console.log(p)
 * // {
 * //    req_method: "GET",
 * //    req_url: "/assets/images/logo_login.png",
 * //    res_time: 6,
 * //    res_code: 200
 * // }
 * @returns {object}
 */
function parseHttpMsg(msg) {
  const logObject = {
    req_method: '',
    req_url: '',
    res_time: 0,
    res_code: 0
  };
  const regex = /^(\w+) (\S+) \((\d+) ms\) (\d+)$/;
  const matches = msg.match(regex);

  if (!matches) {
    return logObject;
  }

  const [, req_method, req_url, res_time, res_code] = matches;

  logObject.req_method = req_method ?? '';
  logObject.req_url = req_url ?? '';
  logObject.res_time = Number(res_time) ?? 0;
  logObject.res_code = Number(res_code) ?? 0;

  return logObject;
}

const format = winston.format.printf((msg) => {
  msg.msg = msg.message;
  msg.level = msg.level
    .replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
    .toUpperCase();
  msg.timestamp = new Date() / 1;
  delete msg.message;

  if (msg.level === 'HTTP') {
    msg = { ...msg, ...parseHttpMsg(msg.msg) };
  }

  if (msg.stack) {
    msg.err_stack = msg.stack;
    delete msg.stack;
  }

  return JSON.stringify(msg);
});

const transports = logJson
  ? [
    new winston.transports.Console({
      level: logLevel,
      format
    })
  ]
  : [];

if (transports.length) {
  module.exports = { transports };
}
