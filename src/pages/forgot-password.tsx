import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    captcha: '',
    newPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 处理密码重置逻辑
    console.log('重置信息:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e5e5e5]">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
          <h1 className="text-2xl text-center mb-8">密码忘记</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 邮箱输入框 */}
            <div>
              <input
                type="email"
                placeholder="邮箱"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
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
              <button
                type="button"
                className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary/5"
                onClick={() => {/* TODO: 获取验证码 */}}
              >
                获取验证码
              </button>
            </div>

            {/* 新密码输入框 */}
            <div>
              <input
                type="password"
                placeholder="新密码"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              />
            </div>

            {/* 确定按钮 */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              确定
            </button>

            {/* 返回登录链接 */}
            <div className="text-center">
              <Link href="/login" className="text-sm text-gray-500 hover:text-primary">
                用已有账号登入
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 