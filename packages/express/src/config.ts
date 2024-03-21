import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

export const cfg = {
  LOG_JSON: process.env.LOG_JSON === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
  LOG_HTTP: process.env.LOG_HTTP ? process.env.LOG_HTTP === 'true' : true,
  LOG_QUIET_REQ: process.env.LOG_QUIET_REQ
    ? process.env.LOG_QUIET_REQ === 'true'
    : false,
};
