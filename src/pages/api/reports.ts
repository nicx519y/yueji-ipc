import type { NextApiRequest, NextApiResponse } from 'next';
import reports from '@/data/reports.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.status(200).json(reports);
} 