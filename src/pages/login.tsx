import { useState } from 'react';
import Link from 'next/link';
import CaptchaImage from '@/components/CaptchaImage';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 处理登录逻辑
    console.log('登录信息:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e5e5e5]">

      {/* 登录表单 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
          <h1 className="text-2xl text-center mb-8">会员登录</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 账号输入框 */}
            <div>
              <input
                type="text"
                placeholder="账号/手机/邮箱"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            {/* 密码输入框 */}
            <div>
              <input
                type="password"
                placeholder="密码"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {/* 验证码 */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="验证码"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.captcha}
                onChange={(e) => setFormData({...formData, captcha: e.target.value})}
              />
              <CaptchaImage onRefresh={() => setFormData({...formData, captcha: ''})} />
            </div>

            {/* 忘记密码链接 */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-primary">
                忘记密码？
              </Link>
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              登录
            </button>

            {/* 注册链接 */}
            <div className="text-right">
              <Link href="/register" className="text-sm text-gray-500 hover:text-primary">
                注册账号
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 