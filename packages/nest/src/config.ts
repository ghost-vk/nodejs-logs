import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

export const cfg = {
  LOG_JSON: process.env.LOG_JSON === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
};
