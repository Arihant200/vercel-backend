// api/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { bootstrapServer } from '../src/bootstrap';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrapServer();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}
