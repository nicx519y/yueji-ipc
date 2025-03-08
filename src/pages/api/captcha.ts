import type { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas } from 'canvas';

// 存储验证码和其过期时间
const captchaStore = new Map<string, { code: string, expires: number }>();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const canvas = createCanvas(128, 40);
  const ctx = canvas.getContext('2d');

  // 生成随机验证码
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const captchaId = Math.random().toString(36).substring(2);

  // 存储验证码，5分钟过期
  captchaStore.set(captchaId, {
    code,
    expires: Date.now() + 5 * 60 * 1000
  });

  // 设置背景
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, 128, 40);

  // 绘制文字
  ctx.font = '24px Arial';
  ctx.fillStyle = '#4b5563';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // 添加干扰线
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * 128, Math.random() * 40);
    ctx.lineTo(Math.random() * 128, Math.random() * 40);
    ctx.stroke();
  }

  // 绘制验证码文字
  for (let i = 0; i < code.length; i++) {
    ctx.fillText(
      code[i],
      20 + i * 20,
      20,
      20
    );
  }

  // 返回图片和验证码ID
  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Captcha-ID', captchaId);
  res.send(buffer);
} 